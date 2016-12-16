
import transformAST, { hasModifier } from '../transform';

// in the absence of fields - just set a getter for the value
export default function FieldDeclaration( node ) {
  const fragment = node.fragments[ 0 ];
  const name = transformAST( fragment.name )
  const result = transformAST( fragment.initializer )

  return {
    type: 'MethodDefinition',
    key: name,
    computed: false,
    value: {
      type: 'FunctionExpression',
      id: null,
      params: [],
      body: {
        type: 'BlockStatement',
        body: [{
          type: 'ReturnStatement',
          argument: result
        }]
      },
      generator: false,
      expression: false
    },
    kind: 'get',
    static: hasModifier( node, 'static' )
  };

}