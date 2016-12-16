
import transformAST from '../transform';

export default function ConditionalExpression( node ) {
  return {
    type: 'ConditionalExpression',
    test: transformAST( node.expression ),
    consequent: transformAST( node.thenExpression ),
    alternate: transformAST( node.elseExpression )
  };
}