
export default function SimpleName( node ) {
  return {
    type: 'Identifier', 
    name: node.identifier
  };
};