
import transformAST from '../transform';

export default function PostfixExpression( node ) {
  return {
    type: 'UpdateExpression',
    operator: transformAST( node.operator ),
    argument: transformAST( node.operand )
  };
}