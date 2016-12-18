
import transformAST from '../transform';

export default function DoStatement( node ) {
  return {
    type: 'DoWhileStatement',
    test: transformAST( node.expression ),
    body: transformAST( node.body )
  };
}