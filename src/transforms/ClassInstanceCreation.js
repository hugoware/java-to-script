
import transformAST from '../transform';

export default function ClassInstanceCreation( node ) {
  return {
    type: 'NewExpression',
    callee: transformAST( node.type ),
    'arguments': transformAST( node.arguments )
  };
}