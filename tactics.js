
var tutorial = 0;
var cpdcenter = new Object;
var mousePos1;
var mouseRef;
var startx;
var mouseIsDown = false;
var newpattern = false;
var newpatterntype = "";
var circlepatdir = parseFloat(1);
function tempdrawcircle(){
	draweverything();
	circlerad = Math.max(turnrad,distbtwnpt(mouseRef.x,mouseRef.y,mousePos1.x,mousePos1.y) * cpdmaxdistance / Math.min(cpdres.x,cpdres.y) / cpdscale);
	circledirection = parseFloat(Math.atan2(mouseRef.x-mousePos1.x,-1*(mouseRef.y-mousePos1.y)));
	circlespace = 2 * Math.PI * circlerad / circlenum;
	for(r=0;r<circlenum;r++){
		var posit = new Object;
		posit = converttoreal(mousePos1.x-cpdcenter.x,mousePos1.y-cpdcenter.y);
		posit.x = posit.x + circlerad * Math.sin(circledirection + circlepatdir * 2 * Math.PI/circlenum* (r));
		posit.y = -1*posit.y + circlerad * Math.cos(circledirection + circlepatdir * 2 * Math.PI/circlenum* (r));
		posit = converttofake(posit.x,posit.y);
		cpdcontext.beginPath();
		cpdcontext.arc(Math.round(posit.x),-1*(posit.y),2,0,2*Math.PI);
		cpdcontext.stroke();
		cpdcontext.beginPath();
		cpdcontext.globalAlpha = 0.5;
		cpdcontext.arc(Math.round(posit.x),-1*(posit.y),range/ cpdmaxdistance * Math.min(cpdres.x,cpdres.y) * cpdscale,0,2*Math.PI);
		cpdcontext.fill();
		cpdcontext.globalAlpha = 1;
	}
	circledirection = radtodeg(circledirection);
};
function tempdrawline(){
	linenum = Math.min(linenum,buoysleft);
	linespace = distbtwnpt(mouseRef.x,mouseRef.y,mousePos1.x,mousePos1.y) * cpdmaxdistance / Math.min(cpdres.x,cpdres.y) / cpdscale / (linenum-1);
	linedir = Math.atan2(mousePos1.x-mouseRef.x,-1*(mousePos1.y-mouseRef.y)) + Math.PI;
	for(r=0;r<linenum;r++){
		var posit = new Object;
		posit = converttoreal(mousePos1.x-cpdcenter.x,mousePos1.y-cpdcenter.y);
		posit.x = posit.x + r * Math.sin(linedir) * linespace;
		posit.y = (-1*posit.y + r * Math.cos(linedir) * linespace);
		posit = converttofake(posit.x,posit.y);
		cpdcontext.fillStyle = "blue";
		cpdcontext.strokeStyle = "blue";
		cpdcontext.beginPath();
		cpdcontext.arc(Math.round(posit.x),-1*(posit.y),2,0,2*Math.PI);
		cpdcontext.stroke();
		cpdcontext.beginPath();
		cpdcontext.globalAlpha = 0.5;
		cpdcontext.arc(Math.round(posit.x),-1*(posit.y),range/ cpdmaxdistance * Math.min(cpdres.x,cpdres.y) * cpdscale,0,2*Math.PI);
		cpdcontext.fill();
		cpdcontext.globalAlpha = 1;
	}
};

function tempdrawattack(){
		linedir = Math.atan2(mousePos1.x-mouseRef.x,-1*(mousePos1.y-mouseRef.y));
		var posit = new Object;
		posit = converttoreal(mousePos1.x-cpdcenter.x,mousePos1.y-cpdcenter.y);
		posit = converttofake(posit.x,-1*posit.y);
		cpdcontext.fillStyle = "red";
		cpdcontext.strokeStyle = "black";
		var disprange = killrange/cpdmaxdistance * Math.min(cpdres.x,cpdres.y) * cpdscale;
		cpdcontext.beginPath();
		cpdcontext.moveTo(Math.round(posit.x+Math.sin(Math.PI/4)*disprange),-1*(posit.y+Math.cos(Math.PI/4)*disprange));
		cpdcontext.lineTo(Math.round(posit.x+Math.sin(5*Math.PI/4)*disprange),-1*(posit.y+Math.cos(5*Math.PI/4)*disprange));
		cpdcontext.lineTo(Math.round(posit.x),-1*(posit.y));
		cpdcontext.lineTo(Math.round(posit.x+Math.sin(3*Math.PI/4)*disprange),-1*(posit.y+Math.cos(3*Math.PI/4)*disprange));
		cpdcontext.lineTo(Math.round(posit.x+Math.sin(7*Math.PI/4)*disprange),-1*(posit.y+Math.cos(7*Math.PI/4)*disprange));
		cpdcontext.stroke();
		cpdcontext.beginPath();
		cpdcontext.globalAlpha = 0.5;
		cpdcontext.arc(Math.round(posit.x),-1*(posit.y),killrange/ cpdmaxdistance * Math.min(cpdres.x,cpdres.y) * cpdscale,0,2*Math.PI);
		cpdcontext.fill();
		cpdcontext.globalAlpha = 1;
}



var circlenum = 6;
var circlespace;
var circledirection;
var circlerad;
var circlepatterncount = 0;
var circlepattern = new Array();
function buildnewcircle(evt){
			circlepattern.push();
			var posit = new Object;
			posit = converttoreal(mousePos1.x - cpdcenter.x,-1 * (mousePos1.y-cpdcenter.y));
			circlepattern[circlepatterncount] = new Array(circlenum + 1);
			circlepattern[circlepatterncount][0] = new Object;
			circlepattern[circlepatterncount][0].startdir = circledirection + circlepatdir * 90;
			circlepattern[circlepatterncount][0].enddir = circledirection + circlepatdir * 90 - circlepatdir * 360/circlenum;
			circlepattern[circlepatterncount][0].rad = circlerad;
			circlepattern[circlepatterncount][0].raddir = circledirection;
			circlepattern[circlepatterncount][0].type = "circle";
			circlepattern[circlepatterncount][0].space = circlespace;
			circlepattern[circlepatterncount][0].num = circlenum;
			circlepattern[circlepatterncount][0].tot = circlenum;
			circlepattern[circlepatterncount][1] = new Object;
			circlepattern[circlepatterncount][1].x = posit.x + Math.sin(degtorad(circlepattern[circlepatterncount][0].raddir)) * circlerad;
			circlepattern[circlepatterncount][1].y = posit.y + Math.cos(degtorad(circlepattern[circlepatterncount][0].raddir)) * circlerad;
			for(b=2;b<circlenum+1;b++){
				circlepattern[circlepatterncount][b] = new Object;
				circlepattern[circlepatterncount][b].x = posit.x + circlerad * Math.sin(degtorad(circlepattern[circlepatterncount][0].raddir + 360/circlenum* (b-1)));
				circlepattern[circlepatterncount][b].y = posit.y + circlerad * Math.cos(degtorad(circlepattern[circlepatterncount][0].raddir + 360/circlenum* (b-1)));
			}
			allpattern.push(circlepattern[circlepatterncount]);
			circlepatterncount += 1;
};
var mousemovecount = 0;
var canvas;
var ctx;
var context;
var allpatterncount = 0;




var linenum = 3;
var linespace;
var linedir;
function buildnewline(evt){
	linepattern.push();
	linedir = (360 + radtodeg(linedir)) % 360;
	var posit = new Object;
	posit = converttoreal(mousePos1.x - cpdcenter.x,-1 * (mousePos1.y-cpdcenter.y));
	var mindist = 9999999999999999999999999999999999;
	if(controli == 1 && 1 == 2){
		for(w=0;w<90;w++){
			var tempdir = linedir + 90 - w*2;
			var tempdist = turncalculator(linepattern[linepatterncount-1][1].x,linepattern[linepatterncount-1][1].y,linepattern[linepatterncount-1][0].dir,posit.x,posit.y,tempdir,0);
			if(tempdist < mindist){
				mindist = tempdist;
				linedir = tempdir;
			}
		}	
	}
	linepattern[linepatterncount] = new Array(linenum + 1);
	linepattern[linepatterncount][0] = new Object;
	linepattern[linepatterncount][0].num = linenum;
	linepattern[linepatterncount][0].tot = linenum;
	linepattern[linepatterncount][0].dir = linedir;
	linepattern[linepatterncount][0].space = linespace;
	linepattern[linepatterncount][0].type = "line";
	linepattern[linepatterncount][1] = new Object;
	linepattern[linepatterncount][1].x = posit.x;
	linepattern[linepatterncount][1].y = posit.y;
	for(b=2;b<linenum+1;b++){
		linepattern[linepatterncount][b] = new Object;
		linepattern[linepatterncount][b].x = posit.x + linespace * Math.sin(degtorad(linedir)) * (b-1);
		linepattern[linepatterncount][b].y = posit.y + linespace * Math.cos(degtorad(linedir)) * (b-1);
	}
	allpattern.push(linepattern[linepatterncount]);
	linepatterncount += 1;
};


var attackpattern = new Array();
var attackpatterncount = 0;
function buildnewattack(evt){
	attackpattern.push();
	linedir = (360 + radtodeg(linedir)) % 360;
	var posit = new Object;
	posit = converttoreal(mousePos1.x - cpdcenter.x,-1 * (mousePos1.y-cpdcenter.y));
	attackpattern[attackpatterncount] = new Array(2);
	attackpattern[attackpatterncount][0] = new Object;
	attackpattern[attackpatterncount][0].num = 1;
	attackpattern[attackpatterncount][0].tot = 1;
	attackpattern[attackpatterncount][0].dir = linedir;
	attackpattern[attackpatterncount][0].space = 0;
	attackpattern[attackpatterncount][0].type = "attack";
	attackpattern[attackpatterncount][0].id = allpatterncount;
	attackpattern[attackpatterncount][0].kill = 0;
	attackpattern[attackpatterncount][0].killdist = 2*killrange;
	attackpattern[attackpatterncount][1] = new Object;
	attackpattern[attackpatterncount][1].x = posit.x;
	attackpattern[attackpatterncount][1].y = posit.y;
	allpattern.push(attackpattern[attackpatterncount]);
	attackpatterncount += 1;
};

function deletepat(){
	if(iii == 0){
		clearcpdpath();
	}
	else{
		for(i=0; i<flightpath.length;i++){
			if(flightpath[i].time / speedmult > iii / fps){
				flightpath[i].time = 0;
			};
		}
		patterncollect();
		gamepath.length= iii-1;
		for(i=0; i < testpatcount; i++){
			if(searchtestpat[i].time / speedmult > iii / fps){
				searchtestpat[i].cancel = 1;
				cancelledsensor.push(i);
			};
		};
	}
	draweverything();
};
var allpattern = new Array();
function gettimes(){
	var spacetime = allpattern[allpatterncount-1][0].space / 2000 / patternspeed * 60 * 60;
	allpattern[allpatterncount-1][1].time = connecttime(allpatterncount-1);
		for(j=2;j<allpattern[allpatterncount-1][0].num+1;j++){
			allpattern[allpatterncount-1][j].time = allpattern[allpatterncount-1][j-1].time + spacetime;
		}
		var linelength = (allpattern[allpatterncount-1][0].num-1)*(allpattern[allpatterncount-1][0].space);
		priorlength = gamepath.length;
		newspots = Math.floor(linelength/secdist);
		for(i = priorlength; i < newspots + priorlength; i++){
			gamepath.push(movealongline(gamepath[i-1].x,gamepath[i-1].y,allpattern[allpatterncount-1][allpattern[allpatterncount-1][0].num].x,allpattern[allpatterncount-1][allpattern[allpatterncount-1][0].num].y,secdist));
		}
	controli = 1;
};

var flightpath = new Array();
function connecttime(u){
	if(controli == 1){
		var initialx = allpattern[u-1][allpattern[u-1][0].tot].x;
		var initialy = allpattern[u-1][allpattern[u-1][0].tot].y;
		var initialhead = allpattern[u-1][0].dir;
	}
	else if(controli == 0){
		var initialx = gamepath[gamepath.length-1].x;
		var initialy = gamepath[gamepath.length-1].y;
		var initialhead = radtodeg(gamepath[gamepath.length-1].head);
	}
	var lastgamepathlength = gamepath.length * speedmult;
	var finalx = allpattern[u][1].x;
	var finaly = allpattern[u][1].y;
	var finalhead = allpattern[u][0].dir;
	var timetoturnnow = parseFloat(turncalculator(initialx,initialy,initialhead,finalx,finaly,finalhead,1));
	flightpath.push(new Object);
	flightpath[flightpath.length-1].initialx = initialx;
	flightpath[flightpath.length-1].initialy = initialy;
	flightpath[flightpath.length-1].finalx = finalx;
	flightpath[flightpath.length-1].finaly = finaly;
	flightpath[flightpath.length-1].initialhead = initialhead;
	flightpath[flightpath.length-1].finalhead = finalhead;
	flightpath[flightpath.length-1].time = gamepath.length;
	if(controli == 1)
		allpattern[u][1].time = allpattern[u-1][allpattern[u-1][0].num].time + timetoturnnow / 2000 / patternspeed * 60 * 60;
	else if(controli == 0)
		allpattern[u][1].time = timetoturnnow / 2000 / patternspeed * 60 * 60 + lastgamepathlength / fps;
	return allpattern[u][1].time;
};


function clearcpdpath(){
	linepatterncount = 0;
	linepattern.length = 0;
	circlepatterncount = 0;
	circlepattern.length = 0;
	attackpatterncount = 0;
	attackpattern.length = 0;
	allpatterncount = 0;
	allpattern.length = 0;
	flightpath.length = 0;
	gamepath.length = 0;
	gamepath.push(initposit);
	testpatcount = 0;
	attackpatcount = 0;
	searchtestpat.length = 0;
	storesub.length = 0;
	cancelledsensor.length = 0;
	iii = 0;
	controli = 0;
	startpausetime = 0;
	score = 0;
	draweverything();
};
var linepattern = new Array();
var linepatterncount = 0;



var numberofsearchbuoys;
function countbuoys(){
numberofsearchbuoys = 0;
	for(r=0;r<allpattern.length;r++){
		if(allpattern[r][0].type != "attack")
			numberofsearchbuoys = numberofsearchbuoys + allpattern[r][0].num;
	}
};
function drawcpdbuoys(){
cpdcontext.strokeStyle = "black";
cpdcontext.fillStyle = "#00FF00";
	for(r=0;r<testpatcount;r++){
		var posit = new Object;
		posit = converttofake(searchtestpat[r].x, -1*searchtestpat[r].y);
		if(searchtestpat[r].cancel == 1)
			continue;
		if(searchtestpat[r].type != "attack"){
			if(searchtestpat[r].time / speedmult > iii / fps)
				cpdcontext.fillStyle = "grey";
			else
				cpdcontext.fillStyle = "blue";
			cpdcontext.beginPath();
			cpdcontext.arc(posit.x,posit.y,2,0,2*Math.PI);
			cpdcontext.stroke();
			cpdcontext.globalAlpha = 0.2;
			cpdcontext.arc(posit.x,posit.y,range/ cpdmaxdistance * Math.min(cpdres.x,cpdres.y) * cpdscale,0,2*Math.PI);
			cpdcontext.fill();
			cpdcontext.globalAlpha = 1;
		}
		else{
			posit.y = -1*posit.y
			if(searchtestpat[r].time / speedmult > iii / fps)
				cpdcontext.fillStyle = "grey";
			else if(searchtestpat[r].kill == 1)
				cpdcontext.fillStyle = "red";
			else
				cpdcontext.fillStyle = "blue";
			var disprange = killrange/cpdmaxdistance * Math.min(cpdres.x,cpdres.y) * cpdscale;
			cpdcontext.beginPath();
			cpdcontext.moveTo(Math.round(posit.x+Math.sin(Math.PI/4)*disprange),-1*(posit.y+Math.cos(Math.PI/4)*disprange));
			cpdcontext.lineTo(Math.round(posit.x+Math.sin(5*Math.PI/4)*disprange),-1*(posit.y+Math.cos(5*Math.PI/4)*disprange));
			cpdcontext.lineTo(Math.round(posit.x),-1*(posit.y));
			cpdcontext.lineTo(Math.round(posit.x+Math.sin(3*Math.PI/4)*disprange),-1*(posit.y+Math.cos(3*Math.PI/4)*disprange));
			cpdcontext.lineTo(Math.round(posit.x+Math.sin(7*Math.PI/4)*disprange),-1*(posit.y+Math.cos(7*Math.PI/4)*disprange));
			cpdcontext.stroke();
			cpdcontext.beginPath();
			cpdcontext.globalAlpha = 0.5;
			cpdcontext.arc(Math.round(posit.x),-1*(posit.y),killrange/ cpdmaxdistance * Math.min(cpdres.x,cpdres.y) * cpdscale,0,2*Math.PI);
			cpdcontext.fill();
			cpdcontext.globalAlpha = 1;
		}
	}
};


function isInArray(value, array) {
  return array.indexOf(value) > -1;
};
var cancelledsensor = new Array();



var searchtestpat = new Array;
var testpatcount = 0;
var attackpatcount = 0;
function patterncollect() {
	searchtestpat.length = 0;
	testpatcount = 0;
	attackpatcount = 0;
	var count = 0;
	for(r=0;r<allpattern.length;r++){
		for(p=1;p<allpattern[r].length;p++){
			searchtestpat.push();
			searchtestpat[testpatcount] = new Object;
			searchtestpat[testpatcount].type = allpattern[r][0].type;
			searchtestpat[testpatcount].time = allpattern[r][p].time;
			searchtestpat[testpatcount].x = allpattern[r][p].x;
			searchtestpat[testpatcount].y = allpattern[r][p].y;
			if(isInArray(count, cancelledsensor))
				searchtestpat[testpatcount].cancel = 1;
			else
				searchtestpat[testpatcount].cancel = 0;
			if(searchtestpat[testpatcount].type == "attack"){
				attackpatcount = attackpatcount + 1;
				searchtestpat[testpatcount].kill = allpattern[r][0].kill;
				searchtestpat[testpatcount].killdist = allpattern[r][0].killdist;
				searchtestpat[testpatcount].id = allpattern[r][0].id;
			}
			testpatcount = testpatcount + 1;
			count = count + 1;
		};
	}
};
