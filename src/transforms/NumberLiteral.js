
export default function NumberLiteral( node ) {
  return {
    type: 'Literal',
    value: parseFloat( node.token ),
    raw: node.token
  };
}