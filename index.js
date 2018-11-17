function concat ( first, second ) {
  var len = +second.length,
    j = 0,
    i = first.length;

  for ( ; j < len; j++ ) {
    first[ i++ ] = second[ j ];
  }

  first.length = i;

  return first;
}

let res = concat([1,2,3], [1,2,3])

function map ( elems, callback, arg ) {
  var length, value,
    i = 0,
    ret = [];

  // 数组
  if ( Array.isArray(elems) ) {
    length = elems.length;
    for ( ; i < length; i++ ) {
      value = callback( elems[ i ], i, arg );

      if ( value != null ) {
        ret.push( value );
      }
    }

  // 对象
  } else {
    for ( i in elems ) {
      value = callback( elems[ i ], i, arg );

      if ( value != null ) {
        ret.push( value );
      }
    }
  }

  // Flatten any nested arrays
  return [].concat.apply( [], ret );
}