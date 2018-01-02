﻿var width = 1000;var height = 1000;var doc = app.documents.add(null,width,height);var centre = width/2;function position_from_angle(radius,angle){    x = centre + radius*Math.cos(angle*Math.PI/180);    y = centre + radius*Math.sin(angle*Math.PI/180);    return [x,y] ;}function radius_put_value(radius,angle,value,align) {    this_text = doc.textFrames.pointText(position_from_angle(radius,angle));    this_text.contents = value.toString();    this_text.paragraphs[0].paragraphAttributes.justification = Justification.CENTER;    if (align == 1) {        this_text.rotate(angle-90);    }}function place_tick(radius,angle,start,end,width) {    var this_path = doc.pathItems.add();    this_path.setEntirePath ([position_from_angle(radius-start,angle), position_from_angle(radius-end,angle)]);    this_path.strokeWidth = width;}//  MAIN CODE LOOPS ////var radius = parseInt(prompt("Radius (of 500)","400"));//var steps = parseInt(prompt("Number of Steps","10"));//var total_angle = parseInt(prompt("Total Angle", "270"));//var value_offset = parseInt(prompt("Value Offset","0"))//var value_multiplier = parseInt(prompt("Value Multiplier","1"))//var align = parseInt(prompt("Align, 1=True, 0=False","1"))var radius = 400;var steps = 10;var total_angle = 270;var offset = -90 - (360-total_angle)/2;var value_offset=0;var value_multiplier=1;var align=1var minticks=10;var step;for (step = 0; step <= steps; step++) {    radius_put_value(radius,                    (-step*total_angle/steps)+offset,                    value_offset+(step*steps*value_multiplier),                    align);}// Add the Minor Ticksdoc.layers.add().name = "TicksMinor" ;minsteps = steps * minticks ;for (step = 0; step <= minsteps; step++) {    place_tick(radius,            (-step*total_angle/minsteps)+offset,            10,            20,            5) ;}// Add the Major Ticksdoc.layers.add().name = "TicksMajor" ;for (step = 0; step <= steps; step++) {    place_tick(radius,            (-step*total_angle/steps)+offset,            10,            40,            10) ;}