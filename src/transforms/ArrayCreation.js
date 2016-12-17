
import _ from 'lodash';
import transformAST from '../transform';
import ArrayInitializer from './ArrayInitializer';


export default function ArrayCreation( node ) {
  const dimensions = getDimensions( node.type );
  const isSimple = dimensions <= 1;
  return isSimple ? simpleArray( node ) : complexArray( node, dimensions );
}


function simpleArray( node ) {
  const elements = node.initializer ? transformAST( node.initializer.expressions ) : [ ];
  return {
    type: 'ArrayExpression',
    elements: elements
  };
}


// multi dimension arrays aren't supported - use a special type
function complexArray( node ) {

  // generate a special type for arrays
  const dimensions = getDimensions( node.type );
  const args = [{
    type: 'Literal',
    value: dimensions,
    raw: dimensions.toString()
  }];

  if ( node.initializer ) {
    args.push(transformAST( node.initializer ));
  }

  return {
    type: 'ExpressionStatement',
    expression: {
      type: 'NewExpression',
      callee: {
        type: 'Identifier',
        name: 'ComplexArray'
      },
      'arguments': args
    }
  };
}


// determine the dimensions of the array
function getDimensions( node ) {
  let depth = 0;
  while ( node.componentType ) {
    depth++;
    node = node.componentType;
  }
  return depth;
}