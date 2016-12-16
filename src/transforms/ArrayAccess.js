
import transformAST from '../transform';

export default function ArrayAccess( node ) {
  return {
    type: 'MemberExpression',
    computed: true,
    object: transformAST( node.array ),
    property: transformAST( node.index )
  };
}