
import _ from 'lodash';
import $fs from 'fs';
import $path from 'path';
import $parser from 'java-parser';


// resolves an AST file
export function fetch( path, allowCache ) {

  // verify first
  path = $path.resolve(path);
  if (!$fs.existsSync(path)) throw new Error(`FileNotFound: ${path}`);
 
  // check for a pre-parsed file
  const directory = $path.dirname(path);
  const file = $path.basename(path);
  
  // since parsing can be slow, allow caching if enabled
  if ( allowCache ) {
    const cached = directory + '/.' + file + '.ast'; 
    const isCached = $fs.existsSync( cached );
    // const isExpired = checkTimes

    // check it it exists and if it's not expired
    if ( isCached ) {
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
  const contents = $fs.readFileSync(path).toString();
  const ast = $parser.parse(contents);

  // save the cached version
  $fs.writeFileSync(cached, JSON.stringify(ast, null, 2));

  return ast;
}
