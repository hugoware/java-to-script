
import { generateThisExpression } from '../transform';

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
            object: generateThisExpression(),
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
        generateThisExpression(),
        {
            type: 'Identifier',
            name: 'arguments'
        }
      ]
    }
  }
}