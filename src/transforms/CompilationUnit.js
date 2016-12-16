
import _ from 'lodash';
import transformAST from '../transform';

export default function CompilationUnit( node ) {

  // include imports
  const imports = transformAST( node.imports );
  const body = transformAST( node.types );

  // create the initial result
  return {
    type: 'Program',
    sourceType: 'module',
    body: imports.concat( body )
  };

}
