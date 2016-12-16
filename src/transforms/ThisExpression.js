
import { generateThisExpression } from '../transform';

export default function ThisExpression( node ) {
  return generateThisExpression();
}