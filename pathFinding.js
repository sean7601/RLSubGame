var turnrad;
var wind = 0;

function distbtwnangle(angle1,angle2){
	var angledist = Math.min((angle1-angle2+360)%360,(angle2-angle1+360)%360);
	return angledist;
};
function degtorad(deg){
	var rad = deg /180 * Math.PI;
	return rad;
};

function radtodeg(rad){
	var deg = rad * 180 / Math.PI;
	return deg;
};

function newx(x,deg,dist){
	var newxx;
	newxx = x + Math.sin(degtorad(deg)) * dist;
	return newxx;
};

function newy(y,deg,dist){
	var newyy;
	newyy = y + Math.cos(degtorad(deg)) * dist;
	return newyy;
};

function addtoangle(origang,add){
	var newangle = (origang + add + 360) % 360;
	return newangle;
};

function distbtwnpt(x1,y1,x2,y2){
	var distancebtwn = Math.pow((Math.pow(x1-x2,2) + Math.pow(y1-y2,2)),.5);
	return distancebtwn;
};

function generatecircles(initxv,inityv,finxv,finyv,initheadv,finheadv,turnradv){
	var circlesv = new Object();
	circlesv.initright = new Object();
	circlesv.initleft = new Object();
	circlesv.finright = new Object();
	circlesv.finleft = new Object();
	circlesv.initright.x = newx(initxv,addtoangle(initheadv,90),turnradv);
	circlesv.initright.y = newy(inityv,addtoangle(initheadv,90),turnradv);
	circlesv.initleft.x = newx(initxv,addtoangle(initheadv,-90),turnradv);
	circlesv.initleft.y = newy(inityv,addtoangle(initheadv,-90),turnradv);
	circlesv.finright.x = newx(finxv,addtoangle(finheadv,90),turnradv);
	circlesv.finright.y = newy(finyv,addtoangle(finheadv,90),turnradv);
	circlesv.finleft.x = newx(finxv,addtoangle(finheadv,-90),turnradv);
	circlesv.finleft.y = newy(finyv,addtoangle(finheadv,-90),turnradv);
	return circlesv;
};

function determineoutsidetangent(firstturn,lastturn,direction){
	var angle = Math.atan2(lastturn.x-firstturn.x,lastturn.y-firstturn.y);
	angle = (radtodeg(angle) + 360) % 360;
	var resultstore = {
		firstx:newx(firstturn.x,addtoangle(angle,-1*direction),turnrad),
		firsty:newy(firstturn.y,addtoangle(angle,-1*direction),turnrad),
		lastx:newx(lastturn.x,addtoangle(angle,-1*direction),turnrad),
		lasty:newy(lastturn.y,addtoangle(angle,-1*direction),turnrad)
	};
	return resultstore;
};

function determineinsidetangent(firstturn,lastturn,direction1,direction2,turnrad){
	var result = new Object();
	if(distbtwnpt(firstturn.x,firstturn.y,lastturn.x,lastturn.y) > 2 * turnrad-1 && distbtwnpt(firstturn.x,firstturn.y,lastturn.x,lastturn.y) < 2 * turnrad+1 ){
		var angle = (360+radtodeg(Math.atan2(lastturn.x-firstturn.x,lastturn.y-firstturn.y)))%360;
		result.firstx = newx(firstturn.x,angle,turnrad);
		result.lastx = result.firstx;
		result.firsty = newy(firstturn.y,angle,turnrad);
		result.lasty = result.firsty;
	}
	else if(distbtwnpt(firstturn.x,firstturn.y,lastturn.x,lastturn.y) > 2 * turnrad){
		var xp = (lastturn.x * turnrad + firstturn.x * turnrad) / (2 * turnrad);
		var yp = (lastturn.y * turnrad + firstturn.y * turnrad) / (2 * turnrad);
		var insideinit = {
			x1:(Math.pow(turnrad,2)*(xp-firstturn.x)+turnrad*(yp-firstturn.y)*Math.pow(Math.pow(xp-firstturn.x,2)+Math.pow(yp-firstturn.y,2)-Math.pow(turnrad,2),.5))/(Math.pow(xp-firstturn.x,2)+Math.pow(yp-firstturn.y,2))+firstturn.x,
			y1:(Math.pow(turnrad,2)*(yp-firstturn.y)+turnrad*(xp-firstturn.x)*Math.pow(Math.pow(xp-firstturn.x,2)+Math.pow(yp-firstturn.y,2)-Math.pow(turnrad,2),.5))/(Math.pow(xp-firstturn.x,2)+Math.pow(yp-firstturn.y,2))+firstturn.y,
			x2:(Math.pow(turnrad,2)*(xp-firstturn.x)-turnrad*(yp-firstturn.y)*Math.pow(Math.pow(xp-firstturn.x,2)+Math.pow(yp-firstturn.y,2)-Math.pow(turnrad,2),.5))/(Math.pow(xp-firstturn.x,2)+Math.pow(yp-firstturn.y,2))+firstturn.x,
			y2:(Math.pow(turnrad,2)*(yp-firstturn.y)-turnrad*(xp-firstturn.x)*Math.pow(Math.pow(xp-firstturn.x,2)+Math.pow(yp-firstturn.y,2)-Math.pow(turnrad,2),.5))/(Math.pow(xp-firstturn.x,2)+Math.pow(yp-firstturn.y,2))+firstturn.y
		};

		var initx1y = firstturn.y - Math.sqrt(-1*Math.pow(firstturn.x,2) + 2 * firstturn.x * insideinit.x1 + Math.pow(turnrad,2) - Math.pow(insideinit.x1,2));
		if(Math.round(initx1y) == Math.round(insideinit.y1)){
			insideinit.pt1x = insideinit.x1;
			insideinit.pt1y = insideinit.y1;
			insideinit.pt2x = insideinit.x2;
			insideinit.pt2y = insideinit.y2;
			insideinit.pt1angle = addtoangle(radtodeg(Math.atan2(insideinit.x1-firstturn.x,insideinit.y1-firstturn.y)),direction1);
			insideinit.pt2angle = addtoangle(radtodeg(Math.atan2(insideinit.x2-firstturn.x,insideinit.y2-firstturn.y)),direction1);
		}
		else{
			insideinit.pt1x = insideinit.x1;
			insideinit.pt1y = insideinit.y2;
			insideinit.pt2x = insideinit.x2;
			insideinit.pt2y = insideinit.y1;
			insideinit.pt1angle = addtoangle(radtodeg(Math.atan2(insideinit.x1-firstturn.x,insideinit.y2-firstturn.y)),direction1);
			insideinit.pt2angle = addtoangle(radtodeg(Math.atan2(insideinit.x2-firstturn.x,insideinit.y1-firstturn.y)),direction1);
		}
		var insidefin = {
			x1:(Math.pow(turnrad,2)*(xp-lastturn.x)+turnrad*(yp-lastturn.y)*Math.pow(Math.pow(xp-lastturn.x,2)+Math.pow(yp-lastturn.y,2)-Math.pow(turnrad,2),.5))/(Math.pow(xp-lastturn.x,2)+Math.pow(yp-lastturn.y,2))+lastturn.x,
			y1:(Math.pow(turnrad,2)*(yp-lastturn.y)+turnrad*(xp-lastturn.x)*Math.pow(Math.pow(xp-lastturn.x,2)+Math.pow(yp-lastturn.y,2)-Math.pow(turnrad,2),.5))/(Math.pow(xp-lastturn.x,2)+Math.pow(yp-lastturn.y,2))+lastturn.y,
			x2:(Math.pow(turnrad,2)*(xp-lastturn.x)-turnrad*(yp-lastturn.y)*Math.pow(Math.pow(xp-lastturn.x,2)+Math.pow(yp-lastturn.y,2)-Math.pow(turnrad,2),.5))/(Math.pow(xp-lastturn.x,2)+Math.pow(yp-lastturn.y,2))+lastturn.x,
			y2:(Math.pow(turnrad,2)*(yp-lastturn.y)-turnrad*(xp-lastturn.x)*Math.pow(Math.pow(xp-lastturn.x,2)+Math.pow(yp-lastturn.y,2)-Math.pow(turnrad,2),.5))/(Math.pow(xp-lastturn.x,2)+Math.pow(yp-lastturn.y,2))+lastturn.y
		};
		insidefin.angle1 = addtoangle(radtodeg(Math.atan2(insidefin.x1-lastturn.x,insidefin.y1-lastturn.y)),direction2);
		insidefin.angle2 = addtoangle(radtodeg(Math.atan2(insidefin.x2-lastturn.x,insidefin.y2-lastturn.y)),direction2);
		insidefin.angle3 = addtoangle(radtodeg(Math.atan2(insidefin.x1-lastturn.x,insidefin.y2-lastturn.y)),direction2);
		insidefin.angle4 = addtoangle(radtodeg(Math.atan2(insidefin.x2-lastturn.x,insidefin.y1-lastturn.y)),direction2);

		var finx1y = firstturn.y - Math.sqrt(-1*Math.pow(firstturn.x,2) + 2 * firstturn.x * insidefin.x1 + Math.pow(turnrad,2) - Math.pow(insidefin.x1,2));
		if(Math.round(finx1y) == Math.round(insidefin.y1)){
			insidefin.pt1x = insidefin.x1;
			insidefin.pt1y = insidefin.y1;
			insidefin.pt2x = insidefin.x2;
			insidefin.pt2y = insidefin.y2;
			insidefin.pt1angle = addtoangle(radtodeg(Math.atan2(insidefin.x1-firstturn.x,insidefin.y1-firstturn.y)),direction1);
			insidefin.pt2angle = addtoangle(radtodeg(Math.atan2(insidefin.x2-firstturn.x,insidefin.y2-firstturn.y)),direction1);
		}
		else{
			insidefin.pt1x = insidefin.x1;
			insidefin.pt1y = insidefin.y2;
			insidefin.pt2x = insidefin.x2;
			insidefin.pt2y = insidefin.y1;
			insidefin.pt1angle = addtoangle(radtodeg(Math.atan2(insidefin.x1-firstturn.x,insidefin.y2-firstturn.y)),direction1);
			insidefin.pt2angle = addtoangle(radtodeg(Math.atan2(insidefin.x2-firstturn.x,insidefin.y1-firstturn.y)),direction1);
		}

		if(Math.round((360+radtodeg(Math.atan2(insidefin.pt1x-insideinit.pt1x,insidefin.pt1y-insideinit.pt1y)))%360) == Math.round(insideinit.pt1angle)){
			result.firstx = insideinit.pt1x;
			result.firsty = insideinit.pt1y;
			result.lastx = insidefin.pt1x;
			result.lasty = insidefin.pt1y;
		}

		if(Math.round((360+radtodeg(Math.atan2(insidefin.pt2x-insideinit.pt1x,insidefin.pt2y-insideinit.pt1y)))%360) == Math.round(insideinit.pt1angle)){
				result.firstx = insideinit.pt1x;
				result.firsty = insideinit.pt1y;
				result.lastx = insidefin.pt2x;
				result.lasty = insidefin.pt2y;
		}

		if(Math.round((360+radtodeg(Math.atan2(insidefin.pt2x-insideinit.pt2x,insidefin.pt2y-insideinit.pt2y)))%360) == Math.round(insideinit.pt2angle)){
				result.firstx = insideinit.pt2x;
				result.firsty = insideinit.pt2y;
				result.lastx = insidefin.pt2x;
				result.lasty = insidefin.pt2y;
		}

		if(Math.round((360+radtodeg(Math.atan2(insidefin.pt1x-insideinit.pt2x,insidefin.pt1y-insideinit.pt2y)))%360) == Math.round(insideinit.pt2angle)){
				result.firstx = insideinit.pt2x;
				result.firsty = insideinit.pt2y;
				result.lastx = insidefin.pt1x;
				result.lasty = insidefin.pt1y;
		};
	}
		return result;
};

function pathdistance(startx,starty,departx,departy,arrivex,arrivey,endx,endy,circle1x,circle1y,circle2x,circle2y,direction1,direction2,turnradv){
	var angle1 = radtodeg(Math.atan2(startx-circle1x,starty-circle1y));
	var angle2 = radtodeg(Math.atan2(departx-circle1x,departy-circle1y));
	var angle3 = radtodeg(Math.atan2(arrivex-circle2x,arrivey-circle2y));
	var angle4 = radtodeg(Math.atan2(endx-circle2x,endy-circle2y));
	var angulardistance1 = direction1 / 90 * angle2 - direction1 / 90 * angle1;
	angulardistance1 = (360 + angulardistance1) % 360;
	angulardistance1 = 2 * Math.PI * turnradv * angulardistance1 / 360;
	var angulardistance2 = direction2 / 90 * angle4 - direction2 / 90 * angle3;
	angulardistance2 = (360 + angulardistance2) % 360;
	angulardistance2 = 2 * Math.PI * turnradv * angulardistance2 / 360;
	var straightdistance = distbtwnpt(departx,departy,arrivex,arrivey);
	var totaldistance = angulardistance1 + angulardistance2 + straightdistance;
	return totaldistance;
};


function tangentcirclepathdistance(startx,starty,startcircle,tangentcircle,tangentline,endx,endy,endcircle,direction1,direction2,direction3){

	var angle1 = (360+radtodeg(Math.atan2(startx-startcircle.x,starty-startcircle.y)))%360;
	var angle2 = (360+radtodeg(Math.atan2(tangentcircle.xint-startcircle.x,tangentcircle.yint-startcircle.y)))%360;
	var angle3 = (360+radtodeg(Math.atan2(tangentcircle.xint-tangentcircle.x,tangentcircle.yint-tangentcircle.y)))%360;
	var angle4 = (360+radtodeg(Math.atan2(tangentline.firstx-tangentcircle.x,tangentline.firsty-tangentcircle.y)))%360;
	var angle5 = (360+radtodeg(Math.atan2(tangentline.lastx-endcircle.x,tangentline.lasty-endcircle.y)))%360;
	var angle6 = (360+radtodeg(Math.atan2(endx-endcircle.x,endy-endcircle.y)))%360;
	var angulardistance1 = direction1 / 90 * angle2 - direction1 / 90 * angle1;
	angulardistance1 = (360 + angulardistance1) % 360;
	angulardistance1 = 2 * Math.PI * turnrad * angulardistance1 / 360;
	var angulardistance2 = direction2 / 90 * angle4 - direction2 / 90 * angle3;
	angulardistance2 = (360 + angulardistance2) % 360;
	angulardistance2 = 2 * Math.PI * turnrad * angulardistance2 / 360;
	var angulardistance3 = direction3 / 90 * angle6 - direction3 / 90 * angle5;
	angulardistance3 = (360 + angulardistance3) % 360;
	angulardistance3 = 2 * Math.PI * turnrad * angulardistance3 / 360;
	var straightdistance1 = distbtwnpt(tangentline.firstx,tangentline.firsty,tangentline.lastx,tangentline.lasty);
	var totaldistance = angulardistance1 + angulardistance2 + angulardistance3 + straightdistance1;
	return totaldistance;
};

function generatetangentcircle(x1,y1,x2,y2,turnradv){
	var heading = (radtodeg(Math.atan2(x2-x1,y2-y1)) + 360) % 360;
	var initdist = distbtwnpt(x1,y1,x2,y2);
	var perpdist = Math.pow(Math.pow(2*turnradv,2)- Math.pow(initdist/2,2),.5);
	var intermediatex = newx(x1,heading,initdist/2);
	var intermediatey = newy(y1,heading,initdist/2);
	var tangentcircle = new Object;
	tangentcircle.right = { };
	tangentcircle.left = { };
	tangentcircle.right.x = newx(intermediatex,heading+90,perpdist);
	tangentcircle.right.y = newy(intermediatey,heading+90,perpdist);
	tangentcircle.left.x = newx(intermediatex,heading-90,perpdist);
	tangentcircle.left.y = newy(intermediatey,heading-90,perpdist);
	var intheadright = (radtodeg(Math.atan2(x1-tangentcircle.right.x,y1-tangentcircle.right.y)) + 360) % 360;
	var intheadleft = (radtodeg(Math.atan2(x1-tangentcircle.left.x,y1-tangentcircle.left.y)) + 360) % 360;
	tangentcircle.right.xint = newx(tangentcircle.right.x,intheadright,turnradv);
	tangentcircle.right.yint = newy(tangentcircle.right.y,intheadright,turnradv);
	tangentcircle.left.xint = newx(tangentcircle.left.x,intheadleft,turnradv);
	tangentcircle.left.yint = newy(tangentcircle.left.y,intheadleft,turnradv);
	return tangentcircle;
};


function calcmindist(initx,inity,rightoutside,rightinside,leftoutside,leftinside,circles,finx,finy,tangentoutside,tangentinside){
	mindist = 9000000000000000000000000000000000000000000000000000;
	rightoutside.distance = pathdistance(initx,inity,rightoutside.firstx,rightoutside.firsty,rightoutside.lastx,rightoutside.lasty,finx,finy,circles.initright.x,circles.initright.y,circles.finright.x,circles.finright.y,90,90,turnrad);
	if(rightoutside.distance)
		mindist = rightoutside.distance;
	leftoutside.distance = pathdistance(initx,inity,leftoutside.firstx,leftoutside.firsty,leftoutside.lastx,leftoutside.lasty,finx,finy,circles.initleft.x,circles.initleft.y,circles.finleft.x,circles.finleft.y,-90,-90,turnrad);
	if(leftoutside.distance)
		mindist = Math.min(mindist,leftoutside.distance);
	rightinside.distance = pathdistance(initx,inity,rightinside.firstx,rightinside.firsty,rightinside.lastx,rightinside.lasty,finx,finy,circles.initright.x,circles.initright.y,circles.finleft.x,circles.finleft.y,90,-90,turnrad);
	if(rightinside.distance)
		mindist = Math.min(mindist,rightinside.distance);
	leftinside.distance = pathdistance(initx,inity,leftinside.firstx,leftinside.firsty,leftinside.lastx,leftinside.lasty,finx,finy,circles.initleft.x,circles.initleft.y,circles.finright.x,circles.finright.y,-90,90,turnrad);
	if(leftinside.distance)
		mindist = Math.min(mindist,leftinside.distance);
	if(tangentoutside.rr.firstx){
		torrd = tangentcirclepathdistance(initx,inity,circles.initright,tangentcircler.right,tangentoutside.rr,finx,finy,circles.finleft,90,-90,-90);
		mindist = Math.min(mindist,torrd);
	}
	if(tangentoutside.rl.firstx){
		torld = tangentcirclepathdistance(initx,inity,circles.initright,tangentcircler.left,tangentoutside.rl,finx,finy,circles.finleft,90,-90,-90);
		mindist = Math.min(mindist,torld);
	}
	if(tangentoutside.ll.firstx){
		tolld = tangentcirclepathdistance(initx,inity,circles.initleft,tangentcirclel.left,tangentoutside.ll,finx,finy,circles.finright,-90,90,90);
		mindist = Math.min(mindist,tolld);
	}
	if(tangentoutside.lr.firstx){
		tolrd = tangentcirclepathdistance(initx,inity,circles.initleft,tangentcirclel.right,tangentoutside.lr,finx,finy,circles.finright,-90,90,90);
		mindist = Math.min(mindist,tolrd);
	}

	if(tangentinside.rr.firstx){
		tirrd = tangentcirclepathdistance(initx,inity,circles.initright,tangentcircler.right,tangentinside.rr,finx,finy,circles.finright,90,-90,90);
		mindist = Math.min(mindist,tirrd);
	}
	if(tangentinside.rl.firstx){
		tirld = tangentcirclepathdistance(initx,inity,circles.initright,tangentcircler.left,tangentinside.rl,finx,finy,circles.finright,90,-90,90);
		mindist = Math.min(mindist,tirld);
	}
	if(tangentinside.ll.firstx){
		tilld = tangentcirclepathdistance(initx,inity,circles.initleft,tangentcirclel.left,tangentinside.ll,finx,finy,circles.finleft,-90,90,-90);
		mindist = Math.min(mindist,tilld);
	}
	if(tangentinside.lr.firstx){
		tilrd = tangentcirclepathdistance(initx,inity,circles.initleft,tangentcirclel.right,tangentinside.lr,finx,finy,circles.finleft,-90,90,-90);
		mindist = Math.min(mindist,tilrd);
	}
	return mindist;
};


function cpddrawtangent(startx,starty,endx,endy,startcircle,tangentcircle,path,endcircle,direction1,direction2,direction3){
	var startcircleval = new Object;
	startcircleval = converttofake(startcircle.x,-1*startcircle.y);
	var endcircleval = new Object;
	endcircleval = converttofake(endcircle.x,-1*endcircle.y);
	var tangentcircleval = new Object;
	tangentcircleval = converttofake(tangentcircle.x,-1*tangentcircle.y);
	var startpath = new Object;
	startpath = converttofake(path.firstx,-1*path.firsty);
	var endpath = new Object;
	endpath = converttofake(path.lastx,-1*path.lasty);
	cpdcontext.beginPath();
	cpdcontext.arc(startcircleval.x,startcircleval.y,scalevalue(turnrad),Math.atan2(startx-startcircle.x,starty-startcircle.y)-Math.PI/2,Math.atan2(tangentcircle.xint-startcircle.x,tangentcircle.yint-startcircle.y)-Math.PI/2,direction1);
	cpdcontext.stroke();
	cpdcontext.beginPath();
	cpdcontext.arc(tangentcircleval.x,tangentcircleval.y,scalevalue(turnrad),Math.atan2(tangentcircle.xint-tangentcircle.x,tangentcircle.yint-tangentcircle.y)-Math.PI/2,Math.atan2(path.firstx-tangentcircle.x,path.firsty-tangentcircle.y)-Math.PI/2,direction2);
	cpdcontext.stroke();
	cpdcontext.beginPath();
	cpdcontext.moveTo(startpath.x,startpath.y);
	cpdcontext.lineTo(endpath.x,endpath.y);
	cpdcontext.stroke();
	cpdcontext.beginPath();
	cpdcontext.arc(endcircleval.x,endcircleval.y,scalevalue(turnrad),Math.atan2(path.lastx-endcircle.x,path.lasty-endcircle.y)-Math.PI/2,Math.atan2(endx-endcircle.x,endy-endcircle.y)-Math.PI/2,direction3);
	cpdcontext.stroke();
};

function scalevalue(value){
	 value = value   / cpdmaxdistance * Math.min(cpdres.x,cpdres.y) * cpdscale;
		return value;
};
function cpddrawvanilla(startx,starty,endx,endy,startcircle,path,endcircle,direction1,direction2){
	var startcircleval = new Object;
	startcircleval = converttofake(startcircle.x,-1*startcircle.y);
	var endcircleval = new Object;
	endcircleval = converttofake(endcircle.x,-1*endcircle.y);
	var startpath = new Object;
	startpath = converttofake(path.firstx,-1*path.firsty);
	var endpath = new Object;
	endpath = converttofake(path.lastx,-1*path.lasty);
	cpdcontext.beginPath();
	cpdcontext.arc(startcircleval.x,startcircleval.y,scalevalue(turnrad),Math.atan2(startx-startcircle.x,starty-startcircle.y)-Math.PI/2,Math.atan2(path.firstx-startcircle.x,path.firsty-startcircle.y)-Math.PI/2,direction1);
	cpdcontext.stroke();
	cpdcontext.beginPath();
	cpdcontext.moveTo(startpath.x,startpath.y);
	cpdcontext.lineTo(endpath.x,endpath.y);
	cpdcontext.stroke();
	cpdcontext.beginPath();
	cpdcontext.arc(endcircleval.x,endcircleval.y,scalevalue(turnrad),Math.atan2(path.lastx-endcircle.x,path.lasty-endcircle.y)-Math.PI/2,Math.atan2(endx-endcircle.x,endy-endcircle.y)-Math.PI/2,direction2);
	cpdcontext.stroke();
};

function cpddrawbestpath(initx,inity,rightoutside,rightinside,leftoutside,leftinside,circles,finx,finy,tangentoutside,tangentinside){
cpdcontext.strokeStyle = "#FF00FF";
	if(rightoutside.distance == mindist){
		cpddrawvanilla(initx,inity,finx,finy,circles.initright,rightoutside,circles.finright,false,false);
	}
	else if(leftoutside.distance == mindist){
		cpddrawvanilla(initx,inity,finx,finy,circles.initleft,leftoutside,circles.finleft,true,true);
	}
	else if(rightinside.distance == mindist){
		cpddrawvanilla(initx,inity,finx,finy,circles.initright,rightinside,circles.finleft,false,true);
	}
	else if(leftinside.distance == mindist){
		cpddrawvanilla(initx,inity,finx,finy,circles.initleft,leftinside,circles.finright,true,false);
	}
	else if(torrd == mindist){
		cpddrawtangent(initx,inity,finx,finy,circles.initright,tangentcircler.right,tangentoutside.rr,circles.finleft,false,true,true);
	}
	else if(torld == mindist){
		cpddrawtangent(initx,inity,finx,finy,circles.initright,tangentcircler.left,tangentoutside.rl,circles.finleft,false,true,true);
	}
	else if(tolld == mindist){
		cpddrawtangent(initx,inity,finx,finy,circles.initleft,tangentcirclel.left,tangentoutside.ll,circles.finright,true,false,false);
	}
	else if(tolrd == mindist){
		cpddrawtangent(initx,inity,finx,finy,circles.initleft,tangentcirclel.right,tangentoutside.lr,circles.finright,true,false,false);
	}
	else if(tirrd == mindist){
		cpddrawtangent(initx,inity,finx,finy,circles.initright,tangentcircler.right,tangentinside.rr,circles.finright,false,true,false);
	}
	else if(tirld == mindist){
		cpddrawtangent(initx,inity,finx,finy,circles.initright,tangentcircler.left,tangentinside.rl,circles.finright,false,true,false);
	}
	else if(tilld == mindist){
		cpddrawtangent(initx,inity,finx,finy,circles.initleft,tangentcirclel.left,tangentinside.ll,circles.finleft,true,false,true);
	}
	else if(tilrd == mindist){
		cpddrawtangent(initx,inity,finx,finy,circles.initleft,tangentcirclel.right,tangentinside.lr,circles.finleft,true,false,true);
	}
};
function arclength(centerx,centery,startx,starty,endx,endy,turnradv,directionx){
	var angle1 = (360+radtodeg(Math.atan2(startx-centerx,starty-centery)))%360;
	var angle2 = (360+radtodeg(Math.atan2(endx-centerx,endy-centery)))%360;
	var angulardistance = parseFloat(directionx) / 90 * angle2 - parseFloat(directionx) / 90 * angle1;
	angulardistance = (360 + angulardistance) % 360;
	angulardistance = 2 * Math.PI * turnradv * angulardistance / 360;
	return angulardistance;
};


function movealongarc(centerx,centery,startx,starty,turnradv,direction,secdist){
	var angulardistance = secdist/(2*Math.PI*turnradv)*360;
	var angle1 = (360+radtodeg(Math.atan2(startx-centerx,starty-centery)))%360;
	var angle2 = (angulardistance + direction/90*angle1)*90/direction;
	angle2 = (360 + angle2) % 360;
	var posit = new Object;
	posit.x = centerx + turnradv * Math.sin(degtorad(angle2));
	posit.y = centery + turnradv * Math.cos(degtorad(angle2));
	posit.head = Math.atan2(posit.x-centerx,posit.y-centery) + direction / 90 * Math.PI / 2;
	return posit;
};

function movealongline(startx,starty,endx,endy,secdist){
	var angle = Math.atan2(endx-startx,endy-starty);
	var posit = new Object;
	posit.x = startx + secdist * Math.sin((angle));
	posit.y = starty + secdist * Math.cos((angle));
	posit.head = Math.atan2(endx-startx,endy-starty);
	return posit;
};
var gamepath = new Array;
function storetangent(startx,starty,endx,endy,startcircle,tangentcircle,path,endcircle,direction1,direction2,direction3){
	var tangentstart = new Object;
	tangentstart.x = tangentcircle.xint;
	tangentstart.y = tangentcircle.yint;
	var startpath = new Object;
	startpath.x = path.firstx;
	startpath.y = path.firsty;
	var endpath = new Object;
	endpath.x = path.lastx;
	endpath.y = path.lasty;

	gamepath.push();
	gamepath[gamepath.length-1] = new Object;
	gamepath[gamepath.length-1].x = startx;
	gamepath[gamepath.length-1].y = starty;
	var arclength1 = arclength(startcircle.x,startcircle.y,startx,starty,tangentstart.x,tangentstart.y,turnrad,direction1);
	var priorlength = gamepath.length;
	var newspots = Math.floor(arclength1/secdist);
	for(i = priorlength; i < newspots + priorlength; i++){
		gamepath.push(movealongarc(startcircle.x,startcircle.y,gamepath[i-1].x,gamepath[i-1].y,turnrad,direction1,secdist));
	}
	var arclength2 = arclength(tangentcircle.x,tangentcircle.y,tangentstart.x,tangentstart.y,startpath.x,startpath.y,turnrad,direction2);
	priorlength = gamepath.length;
	newspots = Math.floor(arclength2/secdist);
	for(i = priorlength; i < newspots + priorlength; i++){
		gamepath.push(movealongarc(tangentcircle.x,tangentcircle.y,gamepath[i-1].x,gamepath[i-1].y,turnrad,direction2,secdist));
	}
	var arclength3 = arclength(endcircle.x,endcircle.y,endpath.x,endpath.y,endx,endy,turnrad,direction3);
	priorlength = gamepath.length;
	newspots = Math.floor(arclength3/secdist);
	for(i = priorlength; i < newspots + priorlength; i++){
		gamepath.push(movealongarc(endcircle.x,endcircle.y,gamepath[i-1].x,gamepath[i-1].y,turnrad,direction3,secdist));
	}





};

function storevanilla(startx,starty,endx,endy,startcircle,path,endcircle,direction1,direction2){
	var startpath = new Object;
	startpath.x = path.firstx;
	startpath.y = path.firsty;
	var endpath = new Object;
	endpath.x = path.lastx;
	endpath.y = path.lasty;
	gamepath.push();
	gamepath[gamepath.length-1] = new Object;
	gamepath[gamepath.length-1].x = startx;
	gamepath[gamepath.length-1].y = starty;
	var arclength1 = arclength(startcircle.x,startcircle.y,startx,starty,startpath.x,startpath.y,turnrad,direction1);
	var priorlength = gamepath.length;
	var newspots = Math.floor(arclength1/secdist);
	for(i = priorlength; i < newspots + priorlength; i++){
		gamepath.push(movealongarc(startcircle.x,startcircle.y,gamepath[i-1].x,gamepath[i-1].y,turnrad,direction1,secdist));
	}
	var linelength = distbtwnpt(startpath.x,startpath.y,endpath.x,endpath.y);
	priorlength = gamepath.length;
	newspots = Math.floor(linelength/secdist);
	for(i = priorlength; i < newspots + priorlength; i++){
		gamepath.push(movealongline(gamepath[i-1].x,gamepath[i-1].y,endpath.x,endpath.y,secdist));
	}
	var arclength2 = arclength(endcircle.x,endcircle.y,endpath.x,endpath.y,endx,endy,turnrad,direction2);
	var priorlength = gamepath.length;
	var newspots = Math.floor(arclength2/secdist);
	for(i = priorlength; i < newspots + priorlength; i++){
		gamepath.push(movealongarc(endcircle.x,endcircle.y,gamepath[i-1].x,gamepath[i-1].y,turnrad,direction2,secdist));
	}
};

function storebestpath(initx,inity,rightoutside,rightinside,leftoutside,leftinside,circles,finx,finy,tangentoutside,tangentinside){
cpdcontext.strokeStyle = "#FF00FF";
	if(rightoutside.distance == mindist){
		storevanilla(initx,inity,finx,finy,circles.initright,rightoutside,circles.finright,90,90);
	}
	else if(leftoutside.distance == mindist){
		storevanilla(initx,inity,finx,finy,circles.initleft,leftoutside,circles.finleft,-90,-90);
	}
	else if(rightinside.distance == mindist){
		storevanilla(initx,inity,finx,finy,circles.initright,rightinside,circles.finleft,90,-90);
	}
	else if(leftinside.distance == mindist){
		storevanilla(initx,inity,finx,finy,circles.initleft,leftinside,circles.finright,-90,90);
	}
	else if(torrd == mindist){
		storetangent(initx,inity,finx,finy,circles.initright,tangentcircler.right,tangentoutside.rr,circles.finleft,90,-90,-90);
	}
	else if(torld == mindist){
		storetangent(initx,inity,finx,finy,circles.initright,tangentcircler.left,tangentoutside.rl,circles.finleft,90,-90,-90);
	}
	else if(tolld == mindist){
		storetangent(initx,inity,finx,finy,circles.initleft,tangentcirclel.left,tangentoutside.ll,circles.finright,-90,90,90);
	}
	else if(tolrd == mindist){
		storetangent(initx,inity,finx,finy,circles.initleft,tangentcirclel.right,tangentoutside.lr,circles.finright,-90,90,90);
	}
	else if(tirrd == mindist){
		storetangent(initx,inity,finx,finy,circles.initright,tangentcircler.right,tangentinside.rr,circles.finright,90,-90,90);
	}
	else if(tirld == mindist){
		storetangent(initx,inity,finx,finy,circles.initright,tangentcircler.left,tangentinside.rl,circles.finright,90,-90,90);
	}
	else if(tilld == mindist){
		storetangent(initx,inity,finx,finy,circles.initleft,tangentcirclel.left,tangentinside.ll,circles.finleft,-90,90,-90);
	}
	else if(tilrd == mindist){
		storetangent(initx,inity,finx,finy,circles.initleft,tangentcirclel.right,tangentinside.lr,circles.finleft,-90,90,-90);
	}
};

function drawpoints(startx,starty,endx,endy){
	ctx.strokeStyle = "#CCCCCC";
	ctx.beginPath();
	ctx.arc(startx,-1*starty,2,0,2*Math.PI);
	ctx.stroke();
	ctx.strokeStyle = "#FF00FF";
	ctx.beginPath();
	ctx.arc(endx,-1*endy,2,0,2*Math.PI);
	ctx.stroke();
};
var circles = new Object();
var rightoutside = { };
var leftoutside = { };
var rightinside = { };
var leftinside = { };
var tangentcirclel = new Object;
var tangentcircler = new Object;
var torrd;
var torld;
var tolrd;
var tolld;
var tirrd;
var tirld;
var tilrd;
var tilld;
var mindist;
var turnrad;
function turncalculator(initx,inity,inithead,finx,finy,finhead,newpath){

	circles = generatecircles(initx,inity,finx,finy,inithead,finhead,turnrad);
	rightoutside = determineoutsidetangent(circles.initright,circles.finright,90);
	leftoutside = determineoutsidetangent(circles.initleft,circles.finleft,-90);
	rightinside = determineinsidetangent(circles.initright,circles.finleft,90,-90,turnrad);
	leftinside = determineinsidetangent(circles.initleft,circles.finright,-90,90,turnrad);
	tangentcircler = generatetangentcircle(circles.initright.x,circles.initright.y,circles.finright.x,circles.finright.y,turnrad);
	tangentcirclel = generatetangentcircle(circles.initleft.x,circles.initleft.y,circles.finleft.x,circles.finleft.y,turnrad);
	var tangentoutside = {
	rr: determineoutsidetangent(tangentcircler.right,circles.finleft,-90),
	rl:	determineoutsidetangent(tangentcircler.left,circles.finleft,-90),
	lr: determineoutsidetangent(tangentcirclel.right,circles.finright,90),
	ll: determineoutsidetangent(tangentcirclel.left,circles.finright,90)};
	var tangentinside = {
	rr: determineinsidetangent(tangentcircler.right,circles.finright,-90,90,turnrad),
	rl: determineinsidetangent(tangentcircler.left,circles.finright,-90,90,turnrad),
	ll: determineinsidetangent(tangentcirclel.left,circles.finleft,90,-90,turnrad),
	lr: determineinsidetangent(tangentcirclel.right,circles.finleft,90,-90,turnrad)};
	mindist = calcmindist(initx,inity,rightoutside,rightinside,leftoutside,leftinside,circles,finx,finy,tangentoutside,tangentinside);
	cpddrawbestpath(initx,inity,rightoutside,rightinside,leftoutside,leftinside,circles,finx,finy,tangentoutside,tangentinside);
	if(newpath == 1){
		storebestpath(initx,inity,rightoutside,rightinside,leftoutside,leftinside,circles,finx,finy,tangentoutside,tangentinside);
		newpath = 0;
	}
	return mindist;

};