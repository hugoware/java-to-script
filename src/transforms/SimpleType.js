
import transformAST from '../transform';

export default function SimpleType( node ) {
  return transformAST( node.name );
}