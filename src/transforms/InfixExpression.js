
import transformAST from '../transform';

export default function InfixExpression( node ) {

  let operator = node.operator;
  if ( operator === '==' ) operator = '===';
  if ( operator === '!=' ) operator = '!==';

  return {
    type: 'BinaryExpression',
    operator: transformAST( operator ),
    left: transformAST( node.leftOperand ),
    right: transformAST( node.rightOperand )
  };
}