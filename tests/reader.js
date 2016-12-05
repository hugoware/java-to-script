
import $fs from 'fs';
import _ from 'lodash';


// reads a test suite file
export default function readTestData( path ) {
  let current = null;
  const data = {
    path: path,
    tests: { }
  };

  // get the data
  const contents = $fs.readFileSync( path );
  const lines = contents.toString().split(/\n/g);

  // start reading each line
  _.each( lines, ( line, index ) => {

    // commented out
    if (/\#/.test( line )) return;

    // the title of the test suite
    if (/suite ?\:/.test( line )) {
      data.suite = _.trim(line.replace(/suite ?\:/, ''));
    }
    
    // test name
    else if (/^[^ ]+/.test( line )) {

      // finalize the previous test
      if ( current ) finalizeCurrent( current );

      // update the new test
      const name = _.trim( line.replace(/\:$/, ''));
      data.tests[ name ] = current = { name: name };
    }

    // saving to input
    else if (/^  input ?\:/.test( line ))
      current.input = [ ]; 

    // saving to output
    else if (/^  output ?\:/.test( line ))
      current.output = [ ];
    
    // appending to the test
    else if ( current ) {

      // remove the indentation
      line = line.substr(4);

      // append to the correct output
      if ( current.output )
        current.output.push( line );
      else if ( current.input ) 
        current.input.push( line );

    }

  });

  // finalize the last test
  finalizeCurrent( current );

  // return the parsed data
  return data;
}



// finalizes the current test data
function finalizeCurrent( current, tests ) {
  
  // maybe extra lines
  if ( !current ) return;

  // couldn't parse a test to use
  if ( current && !( _.isArray( current.input ) && _.isArray( current.output ))) {
    console.warn(`TestParseError: ${ current.name } in ${ tests.path } could not be parsed!`);
  }

  // concat the test lines
  current.input = _.trim( current.input.join('\n'));
  current.output = _.trim( current.output.join('\n'));
}