
import { generateSimpleName } from '../transform';

export default function ArrayType( node ) {
  return generateSimpleName('var');
}