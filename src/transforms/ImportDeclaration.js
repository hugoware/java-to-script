
import _ from 'lodash';
import transformAST from '../transform';

export default function ImportDeclaration( item ) {
  const data = transformAST( item.name );
  const name = data.name;
  const definition = _.camelCase( name );
  const path = name.replace(/\./g, '/');

  return {
    type: 'ImportDeclaration',
    specifiers: [{
      type: 'ImportDefaultSpecifier',
      local: {
        type: 'Identifier',
        name: definition
      }
    }],
    source: {
      type: 'Literal',
      value: path,
      raw: `'${ path }'`
    }
  };

}