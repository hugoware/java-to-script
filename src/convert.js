
import _ from 'lodash';
import $parser from 'java-parser';
import $codegen from 'escodegen';
import transformAST from './transform';

// performs a Java to JavaScript conversion on a string of code
export default function convert( code, options ) {
  const ast = $parser.parse( code );
  const transformed = transformAST( ast );
  const generated = $codegen.generate( transformed, options );
  return _.trim( generated );
}