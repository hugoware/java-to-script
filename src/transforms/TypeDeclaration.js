
import transformAST from '../transform';

export default function TypeDeclaration( node ) {
  return {
    type: 'ClassDeclaration',
    id: {
      type: 'Identifier',
      name: node.name.identifier
    },
    superClass: node.superclassType,
    body: {
      type: 'ClassBody',
      body: transformAST( node.bodyDeclarations )
    }
  };
}