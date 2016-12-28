
import _ from 'lodash';

// check if a node type matches a type
function matchesNode( node, type ) {
  if ( !_.isObject( node )) return false;
  return node.type === type || node.node === type;
}


// removes nodes by type
export function removeOfType( ast, type, onMatch ) {

  // it it's an array, check and remove anything
  // that matches the type
  if ( _.isArray( ast )) {
    for ( let i = ast.length; i-- > 0;) {
      const child = ast[ i ];

      // should be removed
      if ( matchesNode( child, type )) {
        if ( onMatch ) onMatch( child );
        ast.splice( i, 1 );
        continue;
      }

      // if it wasn't removed, check the
      // child elements as well
      removeOfType( child, type, onMatch );
    }
  }

  // if it's an object, scan each of the children
  if ( _.isObject( ast ))
    _.each( ast, ( child ) => {
      removeOfType( child, type, onMatch );
    })

}


// finds properties matching a specific type
export function findOfType( ast, type, matches ) {
  const isTop = !matches;
  matches = matches || [ ];
  
  // if this is a match
  if ( !isTop && ( ast.type === type || ast.node === type ))
    matches.push( ast );

  // check for children
  _.each( ast, ( child, key ) => {
    if ( _.isObject( child ) || _.isArray( child ))
      findOfType( child, type, matches );
  });

  return matches;
}


// locates a parent of a specific type
export function findParentOfType( ast, find, type ) {
  let parent = findParent( ast, find );
  while ( parent ) {
    if ( parent.type === type ) return parent;
    parent = findParent( ast, parent );
  }
}


// track the last 'type' scope while searching for
// parents since in most cases you're interested
// in the entire definition, not just the child property
let typeScope;
export function findParent( parent, find ) {
  const isObject = _.isObject( parent );
  const isArray = _.isArray( parent );

  // replaces the current scope
  if ( isObject && ('type' in parent || 'node' in parent ))
    typeScope = parent;

  // check the object data
  if (!( isObject || isArray )) return;

  // check for equality first
  for ( let p in parent ) {
    const node = parent[ p ];
    if ( node === find )
      return typeScope;
  }

  // check for nested values
  for ( let p in parent ) {
    const node = parent[ p ];
    
    // check objects
    if ( _.isObject( node )) {
      const match = findParent( node, find );
      if ( match ) return typeScope;
    }
  }

}