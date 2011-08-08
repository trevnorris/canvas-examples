(function( Math, global ) {
	var TAU = Math.PI * 2,
		random = Math.random,
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

	function chooseColor() {
		var colors = [
			'rgb(0,63,122)',
			'rgb(0,44,67)',
			'rgb(159,56,27)',
			'rgb(122,37,27)'
		];
		return colors[ -~( Math.random() * 4 ) - 1];
	}

	function Field( ctxid, obj ) {
		if (!( this instanceof Field )) return new Field( ctxid, obj );

		this.canvas = document.getElementById( ctxid );
		this.ctx = this.canvas.getContext( '2d' );
		this.canvas.width = innerW;
		this.canvas.height = innerH;

		this.objs = [];
		for ( var i = 0; i < obj.count; i++ )
			this.objs.push({
				r: obj.r,
				x: obj.x,
				y: obj.y,
				dx: obj.dx(),
				dy: obj.dy(),
				color: chooseColor()
			});
	}

	Field.prototype.dcheck = function() {
		var i = 0, tmpobj, tmpr, xdx, ydy;
		for ( ; i < this.objs.length; i++ ) {
			tmpobj = this.objs[i];
			tmpr = tmpobj.r;
			xdx = tmpobj.x + tmpobj.dx;
			ydy = tmpobj.y + tmpobj.dy;
			if ( xdx + tmpr > innerW || xdx - tmpr < 0 )
				tmpobj.dx *= -1;
			if ( ydy + tmpr > innerH || ydy - tmpr < 0 )
				tmpobj.dy *= -1;
		}
		return this;
	};

	Field.prototype.clear = function() {
		this.ctx.clearRect( 0, 0, innerW, innerH );
		return this;
	};

	Field.prototype.draw = function() {
		var i = 0,
			tctx = this.ctx,
			len = this.objs.length,
			tobjs = this.objs,
			tobj;
		//tctx.clearRect( 0, 0, this.canvas.width, this.canvas.height );
		for ( ; i < len; i++ ) {
			tobj = tobjs[i];
			tctx.fillStyle = tobj.color;
			tctx.beginPath();
			tctx.arc( tobj.x, tobj.y, tobj.r, 0, TAU, true );
			tctx.fill();
		}
		return this;
	};

	Field.prototype.increment = function( time ) {
/* debug:start */
time *= 4;
/* debug:stop */
		var i = 0,
			C = 0.002,
			len = this.objs.length,
			Cr, a, x0, y0, x0y0, tobj;
		for ( ; i < len; i++ ) {
			tobj = this.objs[i];

			/* physics for moving particles */
			x0 = well.x2 - tobj.x;
			y0 = well.y2 - tobj.y;
			x0y0 = Math.sqrt( x0 * x0 + y0 * y0 );
			a = well.mass / ( x0y0 + well.mass * well.mass ) * Math.sqrt( random());
			Cr = C * tobj.r;
			tobj.x += tobj.dx += time * a * x0 / x0y0 - Cr * tobj.dx;
			tobj.y += tobj.dy += time * a * y0 / x0y0 - Cr * tobj.dy;

			// resize circle radius based on velocity
			tobj.r = 1 + Math.sqrt( Math.abs( tobj.dx ) + Math.abs( tobj.dy ));
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

	// generate random location on page
	function dxy() {
		return ( Math.sin( random()) - Math.sin( random())) * random() * 10;
	}

	// create new field
	var myField = Field( 'mycanvas', {
		count: 150,
		r: 1,
		x: innerW * Math.random(),
		y: innerH * Math.random(),
		dx: dxy,
		dy: dxy
	});

/* debug:start */
	//var timeP = document.getElementById( 'time' );
/* debug:stop */
	(function drawPage( time ) {
		setTimeout( function() {
			var tmptime = getTime();
			myField.clear().draw().dcheck().increment( tmptime - time );
			//myField.draw().increment( tmptime - time );
			//myField.clear().draw().increment( tmptime - time );
			//timeP.innerHTML = -~( 1000 / ( tmptime - time ));
			drawPage( tmptime );
		}, 14 + time - getTime());
	})( getTime());

	global.Field = Field;
})( Math, this );
