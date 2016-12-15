
import transformAST from '../transform';

export default function InstanceofExpression( node ) {
  return {
    type: 'BinaryExpression',
    operator: 'instanceof',
    left: transformAST( node.leftOperand ),
    right: transformAST( node.rightOperand )
  };
}