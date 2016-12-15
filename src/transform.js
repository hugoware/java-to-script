
import _ from 'lodash';
import transforms from './transforms';


// converts a Java AST to a JavaScript friendly format
export default function transformAST( node ) {
  if (_.isNull( node ) || _.isUndefined( node )) return null;
  if (_.isString(node)) return node;
  if (_.isArray(node)) return _.compact(_.map(node, transformAST));
  const transform = transforms[ node.node ];
  return applyTransformation( transform, node );
}


// applies a detected transformation 
function applyTransformation( action, node ) {
  return action ? action( node ) : node;
}


// quick check for a specific modifier
export function hasModifier( node, find ) {
  return _.filter( node.modifiers, { node: 'Modifier', keyword: find }).length > 0;
}

export function generateBlock( body ) {
  return {
    type: 'BlockStatement',
    body: body
  };
}

export function generateThrow( message ) {
  return {
    type: "ThrowStatement",
    argument: {
      type: "Literal",
      value: message,
      raw: `'${ escape( message ) }'`
    }
  }
}

export function generateSequenceExpression( items ) {
  return {
    type: 'SequenceExpression',
    expressions: transformAST( items )
  };
}