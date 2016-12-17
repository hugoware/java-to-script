
import _ from 'lodash';
import { fetch } from './ast-generator';
import transformAST, { addListener } from './transform';
import $codegen from 'escodegen';

// generate the test file


// addListener( 'MethodDeclaration', {
//   beforeTransform: function( method, depth ) {
//     console.log(method);
//   },
//   afterTransform: function( method, depth ) {
//     console.log(method);

//   }
// });


const path = './java/Test.java';
// const path = '/Users/hugo/Desktop/boolean/scriptographer/src/java/com/scriptographer/ai/Pathfinder.java';
const ast = fetch( path, true );
// console.log( JSON.stringify( ast, null, 2 ));
const transformed = transformAST( ast );
// console.log( JSON.stringify( transformed, null, 2 ));



// export
const options = { 
  format: {
    indent: { style: '  ' }
  }
};

// perform the generation
try {
  const generated = $codegen.generate( transformed, options );
  console.log( '\n\n', generated, '\n\n' );
}
catch( e ) {
  console.log('failed to render');
  console.log( e );
}
