
import transformAST from '../transform';

export default function ArrayInitializer( node ) {
  return {
    type: 'ArrayExpression',
    elements: transformAST( node.expressions )
  };
}