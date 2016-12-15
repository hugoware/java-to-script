
import transformAST from '../transform';

export default function VariableDeclarationExpression( node ) {
  return  {
    type: 'VariableDeclaration',
    declarations: transformAST( node.fragments ),
    kind: 'var'
  };
}