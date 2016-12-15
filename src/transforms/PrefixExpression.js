
import transformAST from '../transform';

export default function PrefixExpression( node ) {
  return {
    type: 'UnaryExpression',
    operator: transformAST( node.operator ),
    argument: transformAST( node.operand ),
    prefix: true
  };
}