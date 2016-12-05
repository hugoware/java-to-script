
import $fs from 'fs';
import $path from 'path';
import _ from 'lodash';

// detect and import transformation files
const files = $fs.readdirSync(__dirname);
_.each( files, ( file ) => {
  
  // skip this file
  if (file === 'index.js') return;

  // make sure it's js file
  if ( $path.extname( file ) !== '.js' ) return;

  // require others
  const key = $path.basename( file, '.js' );
  try {
    exports[ key ] = require(`./${ file }`).default;
  }
  catch( e ) {
    throw `TransformParseError: Failed to include ${ file }`;
  }
});
