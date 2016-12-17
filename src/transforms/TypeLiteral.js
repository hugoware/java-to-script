
import transformAST from '../transform';

export default function TypeLiteral( node ) {
  return transformAST( node.type )
}