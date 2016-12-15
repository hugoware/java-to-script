
import transformAST, { hasModifier, generateBlock, generateThrow } from '../transform';

const asConstructor = {
  type: 'Identifier',
  name: 'constructor'
}

export default function MethodDeclaration( node ) {
  const isStatic = hasModifier(node, 'static');
  const isPrivate = hasModifier(node, 'public');
  const isNative = hasModifier(node, 'native');
  const isConstructor = !!node['constructor'];

  // native functions don't have a body
  if ( isNative ) {
    node.body = generateBlock([
      generateThrow( 'not implemented' )
    ]);
  };

  // generate the method
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
      body: transformAST( node.body )
    },
    kind: 'method',
    static: isStatic
  };

}