
import transformAST from '../transform';

export default function SuperContructorInvocation( node ) {
  return {
    type: 'ExpressionStatement',
    expression: {
      type: 'CallExpression',
      callee: {
        type: 'Super'
      },
      'arguments': transformAST( node.arguments )
    }
  };
}