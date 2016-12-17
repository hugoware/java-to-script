
import transformAST from '../transform';

export default function WhileStatement( node ) {
  return {
    type: 'WhileStatement',
    test: transformAST( node.expression ),
    body: transformAST( node.body )
  };
}