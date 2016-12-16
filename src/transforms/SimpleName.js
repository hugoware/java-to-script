
export default function SimpleName( node ) {
  let name = node.identifier;
  return {
    type: 'Identifier', 
    name: name
  };
};