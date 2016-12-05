
import transformAST from '../transform';

// TODO: JavaScript don't handle catching multiple exception types
// consider wrapping multiple conditions with if statements
export default function TryStatement( node ) {
  return {
    type: 'TryStatement',
    block: transformAST( node.body ),
    handler: {
      type: 'CatchClause',
      param: transformAST( node.catchClauses[0].exception.name ),
      body: transformAST( node.body )
    },
    finalizer: transformAST( node.finally )
  };
}