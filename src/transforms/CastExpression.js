
import transformAST from '../transform';

// casting not available in JavaScript
export default function CastExpression( node ) {
  return transformAST( node.expression );
}