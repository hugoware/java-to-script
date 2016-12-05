
import _ from 'lodash';
import transformAST from '../transform';

export default function Block( node ) {
  return {
    type: 'BlockStatement',
    body: transformAST( node.statements )
  };
}