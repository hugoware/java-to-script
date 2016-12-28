import _ from 'lodash';
import * as op from './';
import transformAST, { generateFunction, generateAssignmentExpression, hasModifier } from '../transform';

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


export function generateStaticAssignment( type, name, value ) {
  return {
    type: 'ExpressionStatement',
    expression: {
      type: 'AssignmentExpression',
      operator: '=',
      left: {
        type: 'MemberExpression',
        computed: false,
        object: type.id,
        property: transformAST( name )
      },
      right: transformAST( value )
    }
  };
}


// assigns 'instance' fields to a special declaration
export function extractFields( ast ) {

  // generate a list of fields
  const init = [ ];
  op.removeOfType( ast, 'FieldDeclaration', ( field ) => {
    const fragment = field.fragments[ 0 ];
    if ( !fragment ) return;

    const isStatic = hasModifier( field, 'static' );
    
    // statics are assigned to the type
    if ( isStatic ) {
      const top = op.findParentOfType( ast, field, 'ClassDeclaration' );
      const assignment = generateStaticAssignment( top, fragment.name, fragment.initializer );
      ast.body.push( assignment );

    }
    else {
      const assignment = generateAssignmentExpression( fragment.name, fragment.initializer );
      qualifyIdentifier( assignment.expression.left );
      init.push( assignment );
    }

  });

  // save them to a special method
  if ( init.length > 0 ) {
    const method = generateFunction( 'ctor___init', null, init );
    ast.body.push( method );
  }
}


// tries to populate `this` where missing
export function qualifyInstanceMembers( ast ) {

  // attempt to property scope properties
  const fields = op.findOfType( ast, 'FieldDeclaration' );
  const methods = op.findOfType( ast, 'MethodDefinition');
  const fieldNames = _.map( fields, ( field ) => {
    return field.fragments[ 0 ].name.identifier;
  });

  // start processing each method to improve scoping
  _.each( methods, ( method ) => {

    // don't bother with statics
    if ( method.static ) return;

    // qualify properties that aren't arguments
    const identifiers = op.findOfType( method, 'Identifier' );

    // check for names that need to be qualified
    _.each( identifiers, function( identity ) {
      const parent = op.findParent( method, identity );
      if ( parent === method ) return;

      // is this an argument that was passed in
      if ( _.indexOf( fieldNames, identity.name ) > -1 && !methodContainsArgument( method, identity.name )) {
        qualifyIdentifier( identity );
        // console.log( parent.type, identity.name );
        // parent.object = { type: 'ThisExpression' };
        // qualifyIdentifier( parent );
      }

    });

  });

}