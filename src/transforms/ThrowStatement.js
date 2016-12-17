
import transformAST from '../transform';

export default function ThrowStatement( node ) {
  return {
    type: 'ThrowStatement',
    argument: transformAST( node.expression )
  };
}