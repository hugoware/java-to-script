
import transformAST, { hasModifier } from '../transform';

export default function MethodDeclaration( node ) {
  const isStatic = hasModifier(node, 'static');
  const isPrivate = hasModifier(node, 'public');

  return {
    type: "MethodDefinition",
    key: transformAST( node.name ),
    computed: false,
    value: {
      type: 'FunctionExpression',
      id: null,
      generator: false,
      expression: false,
      params: transformAST( node.parameters ),
      body: {
        type: "BlockStatement",
        body: transformAST( node.body.statements )
      }
    },
    kind: "method",
    static: isStatic
  };

}