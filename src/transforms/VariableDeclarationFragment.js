
import transformAST from '../transform';

export default function VariableDeclarationFragment( node ) {
  return {
    type: 'VariableDeclarator',
    id: transformAST( node.name ),
    init: transformAST( node.initializer )
  };
};