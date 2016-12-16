
import transformAST, { hasModifier, generateBlock, generateThrow } from '../transform';

const asConstructor = {
  type: 'Identifier',
  name: 'constructor'
}

export default function MethodDeclaration( node ) {
  const isStatic = hasModifier( node, 'static' );
  const isPrivate = hasModifier( node, 'private' );
  const isNative = hasModifier( node, 'native' );
  const isConstructor = !!node['constructor'];

  if ( isPrivate ) {
    node.name.identifier = '_' + node.name.identifier;
  }

  // native functions don't have a body
  let body;
  if ( isNative ) {
    body = generateBlock([
      generateThrow( 'not implemented' )
    ]);
  }
  // transform the body normally
  else {
    body = transformAST( node.body )
  }

  // generate the method
  return {
    type: 'MethodDefinition',
    key: isConstructor ? asConstructor : transformAST( node.name ),
    computed: false,
    value: {
      type: 'FunctionExpression',
      id: null,
      generator: false,
      expression: false,
      params: transformAST( node.parameters ),
      body: body
    },
    kind: 'method',
    static: isStatic
  };

}