
import _ from 'lodash';
import $fs from 'fs';
import $path from 'path';
import $parser from 'java-parser';


// resolves an AST file
export function fetch( path, allowCache ) {

  // verify first
  path = $path.resolve( path );
  if ( !$fs.existsSync( path ))
    throw new Error(`FileNotFound: ${path}`);
 
  // check for a pre-parsed file
  const directory = $path.dirname( path );
  const file = $path.basename( path );
  const cached = directory + '/.' + file + '.ast'; 
  
  // since parsing can be slow, allow caching if enabled
  if ( allowCache ) {
    const isCached = $fs.existsSync( cached );
    const isExpired = isCached && cacheIsExpired( path, cached );

    if ( isExpired )
      console.log(`${ file } has been modified -- The cached AST will not be used`);

    // check it it exists and if it's not expired
    if ( isCached && !isExpired ) {
      console.log(`Using the cached AST for ${ file }`);
      const contents = $fs.readFileSync(cached);
      try { 
        const ast = JSON.parse(contents);
        return ast;      
      }
      // for a failure, just let the code read it fresh
      catch (e) { }
    }
  }

  // read and parse the contents fresh
  console.log(`Generating AST for ${ file }`);
  const contents = $fs.readFileSync(path).toString();
  const ast = $parser.parse(contents);

  // save the cached version
  if ( allowCache ) {
    const output = JSON.stringify( ast, null, 2 )
    $fs.writeFileSync( cached, output );
  }

  return ast;
}


// check if a cached version of a file is invalid
function cacheIsExpired( file, cached ) {
  return lastModified( file ) > lastModified( cached );
}


// check the modified time
function lastModified( path ) {
  var stats = $fs.statSync( path );
  return new Date( stats.mtime );
}