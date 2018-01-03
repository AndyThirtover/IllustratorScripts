﻿////     Graph Axis and Grids//// Constantsvar width = 3840;var height = 2160;var x_origin = 100;var y_origin = 100;var x_span = 3600;var y_span = 2000;//gridvar minorStroke = 1;var minorColor = makeColor(128,128,128);var majorStroke = 5;var majorColor = makeColor(32,32,32);//X axisvar x_type = 'Lin';var x_steps = 5;var x_start = 0;var x_multiplier = 10;var x_ticks = 10;var x_angle = 0;var x_axis_text_offset = 60;//Y axisvar y_type = 'Lin'var y_steps = 10;var y_start = 0;var y_multiplier = 10;var y_ticks = 5;var y_angle = 90;var y_axis_text_offset = 20;var doc = app.documents.add(null,width,height);function makeColor(r,g,b){    var c = new RGBColor();    c.red   = r;    c.green = g;    c.blue  = b;    return c;}function put_value(value,x,y,angle){    this_text = doc.textFrames.pointText([x,y]);    this_text.contents = value.toString();    this_text.paragraphs[0].paragraphAttributes.justification = Justification.CENTER;    this_text.rotate(angle);    var fontStyle = this_text.textRange.characterAttributes;	fontStyle.size = 48;}function value_loop(steps,direction) {	var step;	var xbase = x_steps*x_ticks;	var ybase = y_steps*y_ticks;	for (step = 0; step <= steps; step++) {		if (direction=='X') {			var value = x_start + (step*x_multiplier);			if(x_type=='Log'){				var x = x_origin + x_span*log_pos(step,xbase,steps);			}			else {				var x = x_origin + (step*x_span/steps);							}			var y = y_origin - x_axis_text_offset;			var angle = x_angle;		}		else{			var value = y_start + (step*y_multiplier);			if(y_type=='Log'){				var y = y_origin + y_span*log_pos(step,ybase,steps);			}			else {				var y = y_origin + (step*y_span/steps);							}			var x = x_origin - y_axis_text_offset;			var angle = y_angle;					}		// fix log(0) value		if ((direction=='X') && (x_type=='Log') && (value==0)) {			value = 1;		}		if ((direction=='Y') && (y_type=='Log') && (value==0)) {			value = 1;		}	    put_value(value,x,y,angle);	}	}function place_grid(x,y,xe,ye,width,color) {    var this_path = doc.pathItems.add();    this_path.setEntirePath ([[x,y],[xe,ye]]);    this_path.strokeWidth = width;    this_path.strokeColor = color;}function log_pos(x,base,steps) {	if(x==0){		return 0;	}	else{		if (steps==x_steps) {			x = x * x_ticks ;		}		if (steps==y_steps) {			x = x * y_ticks;		}		return Math.log(x)/Math.log(base);	}}function grid_loop(steps,direction,width,color) {	var step;	var xbase = x_steps*x_ticks;	var ybase = y_steps*y_ticks;	for (step = 0; step <= steps; step++){		if (direction=='X') {			if (x_type=='Log') {				var x_val =  log_pos(step,xbase,steps);				var x = x_origin + x_val*x_span;			}			else {				var x = x_origin + (step*x_span/steps);			}			var y = y_origin;			var xe = x;			var ye = y_origin + y_span;		}		else {			if (y_type=='Log') {				var y_val =  log_pos(step,ybase,steps);				var y = y_origin + y_val*y_span;			}			else {				var y = y_origin + (step*y_span/steps);			}			var x = x_origin;			var xe = x_origin + x_span;			var ye = y;					}		place_grid(x,y,xe,ye,width,color);	}}// Write X valuesvalue_loop(x_steps,'X');value_loop(y_steps,'Y');// Add the Minor Griddoc.layers.add().name = "MinorGrid" ;grid_loop(x_steps * x_ticks,'X',minorStroke,minorColor);grid_loop(y_steps * y_ticks,'Y',minorStroke,minorColor);// Add the Major Griddoc.layers.add().name = "MajorGrid" ;grid_loop(x_steps,'X',majorStroke,majorColor);grid_loop(y_steps,'Y',majorStroke,majorColor);