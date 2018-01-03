//
//   Linear Gauges
//
//
// Constants
var width = 400;
var height = 2160;
var x_origin = 200;
var y_origin = 50;
var x_span = 300;
var y_span = 2000;
//grid
var minorStroke = 1;
var minorColor = makeColor(128,128,128);
var majorStroke = 5;
var majorColor = makeColor(32,32,32);
//Y axis  -- there is no 'X' Axis in this case, rotate in Illustrator and use y_angle
var y_type = 'Lin'
var y_steps = 10;
var y_start = -50;
var y_multiplier = 10;
var y_ticks = 5;
var y_angle = 0;
var y_axis_text_offset = -50;
var y_minor_width = 100;
var y_major_width = 200
//X Related Stuff
var x_axis_text_offset = 5;  // to lift the text above the tick line

var doc = app.documents.add(null,width,height);

function makeColor(r,g,b){
    var c = new RGBColor();
    c.red   = r;
    c.green = g;
    c.blue  = b;
    return c;
}

function put_value(value,x,y,angle){
    this_text = doc.textFrames.pointText([x,y]);
    this_text.contents = value.toString();
    this_text.paragraphs[0].paragraphAttributes.justification = Justification.CENTER;
    this_text.rotate(angle);
    var fontStyle = this_text.textRange.characterAttributes;
	fontStyle.size = 48;
}

function value_loop(steps) {
	var step;
	var ybase = y_steps*y_ticks;
	for (step = 0; step <= steps; step++) {
		var value = y_start + (step*y_multiplier);
		if(y_type=='Log'){
			var y = y_origin + x_axis_text_offset + y_span*log_pos(step,ybase,steps);
		}
		else {
			var y = y_origin + x_axis_text_offset + (step*y_span/steps);				
		}
		var x = x_origin + y_axis_text_offset;
		var angle = y_angle;			
		// fix log(0) value
		if ((y_type=='Log') && (value==0)) {
			value = 1;
		}
	    put_value(value,x,y,angle);
	}
}	

function place_grid(x,y,xe,ye,width,color) {
    var this_path = doc.pathItems.add();
    this_path.setEntirePath ([[x,y],[xe,ye]]);
    this_path.strokeWidth = width;
    this_path.strokeColor = color;
}

function log_pos(x,base,steps) {
	if(x==0){
		return 0;
	}
	else{
		if (steps==x_steps) {
			x = x * x_ticks ;
		}
		if (steps==y_steps) {
			x = x * y_ticks;
		}
		return Math.log(x)/Math.log(base);
	}
}

function grid_loop(steps,width,stroke,color) {
	var step;
	var ybase = y_steps*y_ticks;
	for (step = 0; step <= steps; step++){
		if (y_type=='Log') {
			var y_val =  log_pos(step,ybase,steps);
			var y = y_origin + y_val*y_span;
		}
		else {
			var y = y_origin + (step*y_span/steps);
		}
		var x = x_origin - width/2;
		var xe = x_origin + width/2;
		var ye = y;			
		place_grid(x,y,xe,ye,stroke,color);	
	}
}


// Write Y values
value_loop(y_steps);

// Add the Minor Grid
doc.layers.add().name = "MinorGrid" ;
grid_loop(y_steps * y_ticks,y_minor_width,minorStroke,minorColor);

// Add the Major Grid
doc.layers.add().name = "MajorGrid" ;
grid_loop(y_steps,y_major_width,majorStroke,majorColor);
