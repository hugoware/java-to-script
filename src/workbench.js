
import _ from 'lodash';
import { fetch } from './ast-generator';
import transformAST from './transform';
import $codegen from 'escodegen';

// generate the test file
const ast = fetch('./java/Test.java');
const transformed = transformAST( ast );
const options = { format: { indent: { style: '  ' }}};
const generated = $codegen.generate( transformed, options );

// export
console.log( generated );
