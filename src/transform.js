
import _ from 'lodash';
import transforms from './transforms';

const $listeners = { };
let $depth = -1;

// converts a Java AST to a JavaScript friendly format
export default function transformAST( node ) {
  if ( !node ) return;

  // skip empty nodes for now -- these might be errors
  if ( _.isNull( node ) || _.isUndefined( node ))
    return null;

  // just return strings - they might be the expected value
  if ( _.isString( node ))
    return node;

  // for collections, transform each node and give 
  // back the matched items
  if ( _.isArray( node ))
    return _.compact( _.map( node, transformAST ));

  // get the transform type
  const type = node.node;

  // check if missing this transform
  if (!( type in transforms )) {
    console.log(`Missing ${ type } at ${ $depth }`);
    return;
  }

  // find the transform to use
  const transform = transforms[ type ];

  // apply the transformation
  $depth++;

  // perform the transformation
  notifyListeners( type, 'beforeTransform', transform, $depth );
  const transformed = applyTransformation( transform, node );
  notifyListeners( type, 'afterTransform', transformed, $depth );

  // move back up
  --$depth;
  return transformed;
}


// applies a detected transformation 
function applyTransformation( action, node ) {
  return action ? action( node ) : node;
}


// quick check for a specific modifier
export function hasModifier( node, find ) {
  return _.filter( node.modifiers, { node: 'Modifier', keyword: find }).length > 0;
}


export function generateBlock( body ) {
  return {
    type: 'BlockStatement',
    body: body
  };
}

export function generateThrow( message ) {
  return {
    type: "ThrowStatement",
    argument: {
      type: "Literal",
      value: message,
      raw: `'${ escape( message ) }'`
    }
  }
}

export function generateSequenceExpression( items ) {
  return {
    type: 'SequenceExpression',
    expressions: transformAST( items )
  };
}

export function generateSimpleName( name ) {
  return {
    type: 'Identifier', 
    name: name
  };
}

export function generateThisExpression() {
  return { type: 'ThisExpression' };
}


export function generateAssignmentExpression( assignTo, value ) {
  return {
    type: 'ExpressionStatement',
    expression: {
      type: 'AssignmentExpression',
      operator: '=',
      left: transformAST( assignTo ),
      right: transformAST( value || { node: 'NullLiteral' })
    }
  };
}

export function generateMethod( name, args, body ) {
  return {
    type: 'MethodDefinition',
    key: {
      type: 'Identifier',
      name: name
    },
    computed: false,
    value: {
      type: 'FunctionExpression',
      id: null,
      params: _.map( args, generateSimpleName ),
      body: {
        type: 'BlockStatement',
        body: body //  transformAST( body ) || [ ]
      },
      generator: false,
      expression: false
    },
    kind: 'method',
    static: false
  };
}

// adds an object to listen for events
export function addListener( type, actions ) {
  if ( _.isFunction( actions ))
    actions = { all: actions };

  // save the listener
  $listeners[ type ] = actions;

}

function notifyListeners( type, event, data, depth ) {
  const listener = $listeners[ type ];
  const action = listener && ( listener[ event ] || listener.all );
  if ( action ) action( data, depth );
}
