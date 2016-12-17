
import transformAST from '../transform';

export default function EnhancedForStatement( node ) {
  return {
    type: 'ForInStatement',
    left: transformAST( node.parameter ),
    right: transformAST( node.expression ),
    body: transformAST( node.body ),
    each: false
  };
}