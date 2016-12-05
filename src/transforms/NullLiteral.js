
export default function NullLiteral( node ) {
  return {
    type: 'Literal',
    value: null,
    raw: 'null'
  };
}