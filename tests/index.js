
import $fs from 'fs';
import $path from 'path';
import $assert from 'assert';

import _ from 'lodash';

import convert from '../src/convert';
import readTestData from './reader';


// code formatting options to make
// sure that the final result matches 
// the expected results
const FORMAT_OPTIONS = {
  format: {
    indent: {
      style: '  '
    }
  }
};


// read all tests in the current directoru
const dir = $path.resolve( __dirname );
const files = $fs.readdirSync( dir );
_.each( files, ( file ) =>  {

  // only test .yml test files
  if (!/\.yml$/i.test(file)) return;

  // parse the test contents
  const path = $path.resolve(`${ dir }/${ file }`);
  const data = readTestData( path );
  
  // run each test 
  describe( data.suite, () => {
    
    _.each( data.tests, ( test, desc ) => {

      // setup tht etst
      it( desc, () => {
        const input = test.input;
        const output = test.output;
        const generated = convert( input, FORMAT_OPTIONS);
        $assert.equal( generated, output );
      });

    });

  });

});
