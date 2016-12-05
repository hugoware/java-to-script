
import transformAST, { hasModifier } from '../transform';

const asConstructor = {
  type: 'Identifier',
  name: 'constructor'
}

export default function MethodDeclaration( node ) {
  const isStatic = hasModifier(node, 'static');
  const isPrivate = hasModifier(node, 'public');
  const isConstructor = !!node['constructor']

  return {
    type: 'MethodDefinition',
    key: transformAST( isConstructor ? asConstructor : node.name ),
    computed: false,
    value: {
      type: 'FunctionExpression',
      id: null,
      generator: false,
      expression: false,
      params: transformAST( node.parameters ),
      body: {
        type: 'BlockStatement',
        body: transformAST( node.body.statements )
      }
    },
    kind: 'method',
    static: isStatic
  };

}