
import transformAST from '../transform';

export default function CompilationUnit( node ) {
  return {
    type: 'Program',
    body: transformAST( node.types )
  };
}