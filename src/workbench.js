
import _ from 'lodash';
import { fetch } from './ast-generator';
import transformAST from './transform';
import $codegen from 'escodegen';

// generate the test file
const ast = fetch('./java/Test.java');
const transformed = transformAST( ast );
// console.log( JSON.stringify( transformed, null, 2 ));

// export
const options = { format: { indent: { style: '  ' }}};
const generated = $codegen.generate( transformed, options );
console.log( generated );
