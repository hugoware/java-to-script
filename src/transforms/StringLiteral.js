export default function StringLiteral( node ) {
  const value = unescape( node.escapedValue );
  return {
    type: 'Literal',
    value: value.substr( 1, value.length - 2 ),
    raw: node.escapedValue
  };
}