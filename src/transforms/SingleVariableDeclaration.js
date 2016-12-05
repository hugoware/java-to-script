
import transformAST from '../transform';

export default function SingleVariableDeclaration( node ) {
  return transformAST( node.name );
}