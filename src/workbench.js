
import _ from 'lodash';
import { fetch } from './ast-generator';
import transformAST from './transform';
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

// extra transforms
js.qualifyInstanceMembers( transformed );
js.extractFields( transformed );


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
