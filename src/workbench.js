
import _ from 'lodash';
import { fetch } from './ast-generator';
import transformAST, { generateAssignmentExpression, generateMethod } from './transform';
import $codegen from 'escodegen';

// transforming data 
import * as op from './operations';
import * as js from './operations/javascript';
import * as java from './operations/java';

const path = './java/Test.java';
// const path = '/Users/hugo/Desktop/boolean/scriptographer/src/java/com/scriptographer/ai/Curve.java';
const ast = fetch( path, true );
// console.log( JSON.stringify( ast, null, 2 ));
const transformed = transformAST( ast );
// console.log( JSON.stringify( transformed, null, 2 ));



// attempt to property scope properties
const fields = op.findOfType( transformed, 'FieldDeclaration' );
const methods = op.findOfType( transformed, 'MethodDefinition');

// start processing each method to improve scoping
_.each( methods, ( method ) => {

  // qualify properties that aren't arguments
  const identifiers = op.findOfType( method, 'Identifier' );

  // check for names that need to be qualified
  _.each( identifiers, function( identity ) {
    const parent = op.findParent( transformed, identity );
    if ( parent === method ) return;

    // skip member refs and function arguments
    if ( parent.type === 'MemberExpression' ||
      parent.type === 'FunctionExpression' )
      return;

    // is this an argument that was passed in
    if ( js.methodContainsArgument( method, identity.name ))
      return;

    // prefix with 'this'
    js.qualifyIdentifier( identity );
  });

});


// generate a list of fields
const init = [ ];
op.removeOfType( transformed, 'FieldDeclaration', ( field ) => {
  const fragment = field.fragments[ 0 ];
  if ( !fragment ) return;

  const assignment = generateAssignmentExpression( fragment.name, fragment.initializer );
  js.qualifyIdentifier( assignment.expression.left );
  init.push( assignment );
});

// save them to a special method
if ( init.length > 0 ) {
  const method = generateMethod( '___init_fields___', null, init );
  transformed.body.push( method );
}


// export
const options = { 
  format: {
    indent: { style: '  ' }
  }
};

// perform the generation
try {
  const generated = $codegen.generate( transformed, options );
  console.log( `\n\n${ generated }\n\n` );
}
catch( e ) {
  console.log('failed to render');
  console.log( e );
}
