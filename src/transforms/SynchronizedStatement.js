
import transformAST from '../transform';

// there's no equivilent since JavaScript is single threaded
// but to mark this area a unique, wrap it with a function call
// that explicitly calls out the synchronized statement from Java
export default function SynchronizedStatement( node ) {
  return {
    type: 'ExpressionStatement',
    expression: {
      type: 'CallExpression',
      callee: {
        type: 'MemberExpression',
        computed: false,
        object: {
          type: 'FunctionExpression',
          id: {
            type: 'Identifier',
            name: 'synchronized'
          },
          params: [],
          body: {
            type: 'BlockStatement',
            body: transformAST( node.body.statements )
          },
          generator: false,
          expression: false
        },
        property: {
          type: 'Identifier',
          name: 'apply'
        }
      },
      'arguments': [ transformAST( node.expression ) ]
    }
  };
}