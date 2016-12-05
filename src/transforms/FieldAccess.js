
import transformAST from '../transform';

export default function FieldAccess( node ) {
  return {
    type: 'MemberExpression',
    computed: false,
    object: {
      type: 'ThisExpression'
    },
    property: transformAST( node.name )
  };
}