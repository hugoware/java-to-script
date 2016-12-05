
import transformAST from '../transform';

export default function InfixExpression( node ) {
  return {
    type: 'BinaryExpression',
    operator: transformAST( node.operator ),
    left: transformAST( node.leftOperand ),
    right: transformAST( node.rightOperand )
  };
}