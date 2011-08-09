(function( Math, global ) {
	var random = Math.random,
		sin = Math.sin,
		innerW = global.innerWidth,
		innerH = global.innerHeight;

	function getTime() {
		return ( new Date()).getTime();
	}

	/* initialization */

	// generate random location on page
	function dxy() {
		return ( sin( random()) - sin( random())) * random() * 10;
	}

	// create new field
	var myField = Field( 'mycanvas', {
		count: 500,
		r: 1,
		x: innerW * random(),
		y: innerH * random(),
		dx: dxy,
		dy: dxy
	});

	// begin drawing page
	(function drawPage( time ) {
		setTimeout( function() {
			var tmptime = getTime();
			myField.clear().draw().dcheck().increment( tmptime - time );
			drawPage( tmptime );
		}, 14 + time - getTime());
	})( getTime());

	// make visible
	global.Field = Field;
})( Math, this );
