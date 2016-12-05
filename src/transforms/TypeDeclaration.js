
import transformAST from '../transform';

export default function TypeDeclaration( node ) {
  return {
    type: 'ClassDeclaration',
    id: transformAST( node.name ),
    superClass: transformAST( node.superclassType ),
    body: {
      type: 'ClassBody',
      body: transformAST( node.bodyDeclarations )
    }
  };
}