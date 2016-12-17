import _ from 'lodash';
import transformAST from '../transform';

export default function SwitchStatement( node ) {
  const cases = gatherCases( node.statements );

  return {
    type: 'SwitchStatement',
    discriminant: transformAST( node.expression ),
    cases: cases
  };
}


function gatherCases( statements ) {
  let cases = [ ];

  // gather up each case
  let current;
  _.each( statements, ( statement ) => {

    // starts a new case
    if ( shouldStartNewCase( statement )) { 
      current = startNewCase( statement );
      cases.push( current );
    }
    // append to the current
    else if ( current ) {
      const result = transformAST( statement );
      current.consequent.push( result );
    }

  });

  return cases;
}

function shouldStartNewCase( node ) {
  return node.node === 'SwitchCase';
}


function startNewCase( node ) {
  return {
    type: 'SwitchCase', 
    test: transformAST( node.expression ),
    consequent: [ ]
  };
}