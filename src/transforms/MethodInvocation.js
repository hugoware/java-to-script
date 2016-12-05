
import transformAST from '../transform';

export default function MethodInvocation( node ) {
  return {
    type: 'CallExpression',
    callee: {
      type: 'MemberExpression',
      computed: false,
      object: transformAST( node.expression || { type: 'ThisExpression' } ),
      property: transformAST( node.name ),
    },
    'arguments': transformAST( node.arguments )
  };

}