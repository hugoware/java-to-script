
import transformAST, { generateThisExpression } from '../transform';

export default function MethodInvocation( node ) {
  return {
    type: 'CallExpression',
    callee: {
      type: 'MemberExpression',
      computed: false,
      object: transformAST( node.expression ) || generateThisExpression(),
      property: transformAST( node.name ),
    },
    'arguments': transformAST( node.arguments )
  };
}