(function( Math, global ) {

var elem = document.getElementById( 'mycanvas' ),
	ctx = elem.getContext( '2d' ),
	width = parseInt( elem.getAttribute( 'width' )),
	height = parseInt( elem.getAttribute( 'height' )),
	imgData = ctx.createImageData( width, height ),

	imgArr = new Array( width ),
	imgW = new Array( height ),

	iData = imgData.data,
	i, j, idx;

for ( i = 0; i < height; i++ ) {
	imgW[i] = Math.round( i / width * 255 );
}

for ( i = 0; i < width; i++ ) {
	imgArr[i] = imgW;
}

for ( i = 0; i < width; i++ ) {
	for ( j = 0; j < height; j++ ) {
		idx = ( i + j * width ) * 4;
		iData[ idx + 0 ] = imgArr[i][j];
		iData[ idx + 1 ] = imgArr[i][j];
		iData[ idx + 2 ] = imgArr[i][j];
		iData[ idx + 3 ] = 0xff;
	}
}

ctx.putImageData( imgData, 0, 0 );

}( Math, this ));
