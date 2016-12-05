
import transformAST from '../transform';

export default function VariableDeclarationStatement( node ) {
  return {
    type: 'VariableDeclaration',
    declarations: transformAST( node.fragments ),
    kind: 'var'
  };
};