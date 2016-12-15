
import transformAST from '../transform';

export default function SuperMethodInvocation( node ) {
  return {
    type: 'CallExpression',
    callee: {
        type: 'MemberExpression',
        computed: false,
        object: { type: 'Super' },
        property: transformAST( node.name )
    },
    'arguments': transformAST( node.arguments )
  };
}