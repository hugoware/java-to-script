
import transformAST from '../transform';

export default function ReturnStatement( node ) {

  return {
    type: 'ReturnStatement',
    argument: transformAST( node.expression )
  }

}