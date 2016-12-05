
import transformAST from '../transform';

export default function ParenthesizedExpression( node ) {
  return transformAST( node.expression );
}