const jpexs = require( 'jpexs-flash-decompiler' );

jpexs.export( {
    file: 'output/swf/lang_fr_807.swf',
    output: 'decompiler',
    items: [ jpexs.ITEM.SCRIPT ],
  }, function( err ) {
    if ( err ) {
      console.log( 'Error: ', err.message );
    } else {
      console.log( 'DONE!' );
      console.log(jpexs.ITEM.SCRIPT)
    }
  } );