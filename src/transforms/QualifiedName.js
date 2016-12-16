
import SimpleName from './SimpleName';
import { generateSimpleName } from '../transform';

// not sure
export default function QualifiedName( node ) {
  const name = [ ];

  // search for all qualifiers
  let qualifier = node.qualifier;
  while ( qualifier ) {

    // check for a deeper qualifier
    if ( qualifier.qualifier ) {
      name.push( qualifier.name.identifier );
      qualifier = qualifier.qualifier;
    }
    // last qualifier
    else {
      name.push( qualifier.identifier );
      break;
    }
  }

  name.reverse();
  name.push( node.name.identifier );

  // just use the name as a path
  return generateSimpleName( name.join('.') );
}