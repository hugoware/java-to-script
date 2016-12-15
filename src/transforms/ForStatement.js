
import _ from 'lodash';
import transformAST, { asSequenceExpression } from '../transform';


export default function ForStatement( node ) {

  const updates = _.isArray( node.updaters ) && node.updaters.length > 1
    ? asSequenceExpression( node.updaters )
    : transformAST( node.updaters );

  return {
    type: 'ForStatement',
    init: transformAST( node.initializers[0] ),
    test: transformAST( node.expression ),
    update: transformAST( node.updaters[0] ),
    body: transformAST( node.body )
  };

}

function getInitializers( initializers ) {
  return {
    type: 'VariableDeclaration',
    declarations: _.map( initializers[0].fragments, transformAST ),
    kind: 'var'
  };
}