
import _ from 'lodash';
import { fetch } from './ast-generator';
import transformAST from './transform';

var $codegen = require('escodegen');


const ast = fetch('./java/Basic.java');


const transformed = transformAST(ast);

console.log(JSON.stringify(transformed, null, 2));

console.log($codegen.generate(transformed));
