
import transformAST from '../transform';

export default function IfStatement( node ) {
  return {
    type: 'IfStatement',
    test: transformAST( node.expression ),
    consequent: transformAST( node.thenStatement ),
    alternate: transformAST( node.elseStatement )
  }
}