
import transformAST from '../transform';

export default function Assignment( node ) {
  return {
    type: 'AssignmentExpression',
    operator: node.operator,
    left: transformAST( node.leftHandSide ),
    right: transformAST( node.rightHandSide )
  }
}