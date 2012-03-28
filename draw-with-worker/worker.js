self.addEventListener( 'message', function( e ) {

	var ctx = e.data.ctx,
		imgData = e.data.imgData,
		iData = imgData.data,
		width = e.data.width,
		height = e.data.height,

		imgArr = new Array( width ),
		imgW = new Array( height ),

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

	self.postMessage({
		msg : 'pixel manipulation complete',
		imgData : imgData
	});

}, false );
