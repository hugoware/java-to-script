
import transformAST, { attachComment } from '../transform';

export default function SingleVariableDeclaration( node ) {
  if ( node.varargs ) {
    return {
      type: 'RestElement', 
      argument: transformAST( node.name )
    };
  }
  else {
    return transformAST( node.name );
  }
}