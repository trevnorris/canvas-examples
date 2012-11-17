(function( Math, global ) {
	var TAU = Math.PI * 2,
		random = Math.random,
		sin = Math.sin,
		sqrt = Math.sqrt,
		abs = Math.abs,
		innerW = global.innerWidth,
		innerH = global.innerHeight,
		well = {
			x2: innerW / 2,
			y2: innerH / 2,
			mass: 100
		};

	function getTime() {
		return (new Date()).getTime();
	}

	// generate random location on page
	function dxy() {
		return ( sin( random()) - sin( random())) * random() * 10;
	}

	// rewrite the increment function
	Field.prototype.increment = function( time ) {
		var i = 0,
			C = 0.002,
			tobjs = this.objs,
			len = tobjs.length,
			Cr, a, x0, y0, x0y0, tobj;
		for ( ; i < len; i++ ) {
			tobj = tobjs[i];

			/* physics for moving particles */
			x0 = well.x2 - tobj.x;
			y0 = well.y2 - tobj.y;
			x0y0 = sqrt( x0 * x0 + y0 * y0 );
			a = well.mass / ( x0y0 + well.mass * well.mass ) * sqrt( random() / 2 ) * 6;
			Cr = C * tobj.r;
			tobj.x += tobj.dx += time * a * x0 / x0y0 - Cr * tobj.dx;
			tobj.y += tobj.dy += time * a * y0 / x0y0 - Cr * tobj.dy;

			// resize circle radius based on velocity
			tobj.r = 1 + sqrt( abs( tobj.dx ) + abs( tobj.dy ));
		}
		return this;
	};

	/* tie to mouse events */
	global.onmousemove = function( e ) {
		well.x2 = e.clientX;
		well.y2 = e.clientY;
	};

	global.onmousedown = function() {
		well.mass *= -0.5;
	};

	global.onmouseup = function() {
		well.mass *= -2;
	};

	/* initialization */

	// create new field
	var myField = Field( 'mycanvas', {
		count: 600,
		r: 1,
		x: innerW * random(),
		y: innerH * random(),
		dx: dxy,
		dy: dxy
	});

	// begin drawing page
	(function drawPage( time ) {
		fpsCount.init();
		function setReuse() {
			var tmptime = getTime();
			myField.clear().draw().increment( tmptime - time );
			fpsCount.print( tmptime - time );
			drawPage( tmptime );
		}
		setTimeout( setReuse, 14 + time - getTime());
	})( getTime());
})( Math, this );
