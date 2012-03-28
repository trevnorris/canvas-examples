(function( Math, global ) {

var elem = document.getElementById( 'mycanvas' ),
	ctx = elem.getContext( '2d' ),
	width = parseInt( elem.getAttribute( 'width' )),
	height = parseInt( elem.getAttribute( 'height' )),
	imgData = ctx.createImageData( width, height ),
	worker = new Worker( 'worker.js' );

worker.addEventListener( 'message', function( e ) {
	ctx.putImageData( e.data.imgData, 0, 0 );
	console.log( e.data.msg );
});

worker.postMessage({
	imgData : imgData,
	width: width,
	height: height
});

}( Math, this ));
