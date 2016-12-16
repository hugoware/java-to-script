
import transformAST from '../transform';

export default function ParameterizedType( node ) {
  node.type.name.identifier += `_ofType_${ node.typeArguments[0].name.identifier }`;
  return transformAST( node.type );
}