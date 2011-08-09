(function( Math, global ) {
	var TAU = Math.PI * 2,
		random = Math.random,
		innerW = global.innerWidth,
		innerH = global.innerHeight,
		colors = [
			'rgba(0,63,122,0.65)',
			'rgba(31,113,111,0.65)',
			'rgba(177,150,56,0.65)',
			'rgba(229,227,102,0.65)'
		],
		well = {
			x2: innerW / 2,
			y2: innerH / 2,
			mass: 100
		};

	function getTime() {
		return (new Date()).getTime();
	}

	function chooseColor() {
		return colors[ -~( random() * 4 ) - 1];
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
	Fieldfn = Field.prototype;

	Fieldfn.dcheck = function() {
		var i = 0,
			tobjs = this.objs,
			tmpobj, tmpr, xdx, ydy;
		for ( ; i < tobjs.length; i++ ) {
			tmpobj = tobjs[i];
			tmpr = tmpobj.r;
			xdx = tmpobj.x + tmpobj.dx;
			ydy = tmpobj.y + tmpobj.dy;

			/* collision detection */
			if ( xdx + tmpr > innerW || xdx - tmpr < 0 ) tmpobj.dx *= -1;
			if ( ydy + tmpr > innerH || ydy - tmpr < 0 ) tmpobj.dy *= -1;
		}
		return this;
	};

	Fieldfn.clear = function() {
		this.ctx.clearRect( 0, 0, innerW, innerH );
		return this;
	};

	Fieldfn.draw = function() {
		var i = 0,
			tctx = this.ctx,
			len = this.objs.length,
			tobjs = this.objs,
			tobj;
		tctx.globalCompositeOperation = 'lighter';
		for ( ; i < len; i++ ) {
			tobj = tobjs[i];
			tctx.fillStyle = tobj.color;
			tctx.beginPath();
			tctx.arc( tobj.x, tobj.y, tobj.r, 0, TAU, true );
			tctx.closePath();
			tctx.fill();
		}
		return this;
	};

	Fieldfn.increment = function( time ) {
		var i = 0,
			tobjs = this.objs,
			len = tobjs.length,
			Cr, a, x0, y0, x0y0, tobj;
		for ( ; i < len; i++ ) {
			tobj = tobjs[i];

			/* physics for moving particles */
			tobj.x += tobj.dx;
			tobj.y += tobj.dy;

			// resize circle radius based on velocity
			tobj.r = 1 + Math.sqrt( Math.abs( tobj.dx ) + Math.abs( tobj.dy ));
		}
		return this;
	};

	// make visible
	global.Field = Field;
})( Math, this );
