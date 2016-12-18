import _ from 'lodash';
import * as op from './';

export function qualifyIdentifier( name, qualifier ) {

  // remove identifier info
  const identifier = _.clone( name );
  _.each( name, ( value, prop ) => { 
    delete name[ prop ];
  });

  // update object
  _.assign( name, {
    type: 'MemberExpression',
    computed: false,
    object: qualifier || { type: 'ThisExpression' },
    property: identifier
  });
}


export function methodContainsArgument( method, arg ) {

  // make sure there's a function 
  const matches = op.findOfType( method, 'FunctionExpression') || [ ];
  const def = matches[ 0 ];
  if ( !def ) return;

  // check if this was defined
  return _.find( def.params, { name: arg });

}