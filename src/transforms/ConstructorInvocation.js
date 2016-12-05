
// no concept available in javascript
export default function ConstructorInvocation( node ) {
  return {
    type: 'ExpressionStatement',
    expression: {
      type: 'CallExpression',
      callee: {
        type: 'MemberExpression',
        computed: false,
        object: {
            type: 'MemberExpression',
            computed: false,
            object: {
                type: 'ThisExpression'
            },
            property: {
                type: 'Identifier',
                name: 'constructor'
            }
        },
        property: {
            type: 'Identifier',
            name: 'call'
        }
      },
      'arguments': [
        { type: 'ThisExpression' },
        {
            type: 'Identifier',
            name: 'arguments'
        }
      ]
    }
  }
}