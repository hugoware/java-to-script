
import $fs from 'fs';
import $path from 'path';
import _ from 'lodash';

// detect and import transformation files
const files = $fs.readdirSync(__dirname);
_.each( files, ( file ) =>  {
  
  // skip this file
  if (file === 'index.js') return;

  // require others
  const key = $path.basename(file, '.js');
  exports[key] = require(`./${file}`).default;
});
