
import transformAST from '../transform';

export default function ExpressionStatement( node ) {
  return {
    type: 'ExpressionStatement',
    expression: transformAST( node.expression ),
    prefix: false
  };
}