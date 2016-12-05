
export default function BooleanLiteral( node ) {
  return {
    type: 'Literal',
    value: node.booleanValue,
    raw: node.booleanValue.toString()
  };
}