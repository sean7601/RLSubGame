
var submarine = new Object;
var speedmult = 10;
function startsubposit(){

	var samplex = 2*Math.random()*major-major;
	var sampley = 2*Math.random()*major-major;
	while(distbtwnpt(samplex,sampley,0,0) > major){
		var samplex = 2*Math.random()*major-major;
		var sampley = 2*Math.random()*major-major;
	}
	var sampleangle = Math.random() * 360;
	var samplerange = Math.random() * major;
	submarine.x = samplex;
	submarine.y = sampley;


	submarine.head = (Math.random() * 2 * subheadingerror - subheadingerror) + centersubheading;
	targethead = submarine.head;
	if(difficulty == "easy"){
	largedynamicratio = .05;
	smalldynamicratio = .3;
	speeddynamicratio = .05;
	speeddynamiclengthseed = 20;
	speeddynamiclength = 0;
	dynamic = 0;
	tgtspeed = 10;}
	else if(difficulty == "medium"){
	largedynamicratio = .06;
	smalldynamicratio = .4;
	speeddynamicratio = .1;
	speeddynamiclengthseed = 25;
	speeddynamiclength = 0;
	dynamic = 0;
	tgtspeed = 15;}
	else if(difficulty == "hard"){
	largedynamicratio = .15;
	smalldynamicratio = .4;
	speeddynamicratio = .15;
	speeddynamiclengthseed = 35;
	speeddynamiclength = 0;
	dynamic = 0;
	tgtspeed = 20;}
};
var largedynamicratio = .05;
var smalldynamicratio = .3;
var turnrate = 1;
var targethead;
var speeddynamicratio = .05;
var speeddynamiclengthseed = 20;
var speeddynamiclength = 0;
var dynamic = 0;
var turndynamic = 0;
var dynamicdir = 0;
var infomode = "fix";
var difficulty = "easy";
var gamemode = "track";
var storesub = new Array();
var killscore = 0;
function animatesub(){
	if(Math.random() < largedynamicratio / fps && lastiii != iii && turndynamic == 0){
		dynamicdir = Math.random() - .5;
		targethead = targethead + (120 * dynamicdir);
		dynamicdir = dynamicdir / Math.abs(dynamicdir);
		turndynamic = 1;
	}
	if(Math.random() < smalldynamicratio / fps && lastiii != iii && turndynamic == 0){
		dynamicdir = Math.random() - .5;
		targethead = targethead + (10 * dynamicdir);
		dynamicdir = dynamicdir / Math.abs(dynamicdir);
		turndynamic = 1;
	}
	if(Math.round(submarine.head) != Math.round(targethead)){
		submarine.head = submarine.head + dynamicdir * turnrate / fps;
	}
	else
		turndynamic = 0;
	if(Math.random() < speeddynamicratio / fps && dynamic == 0 && lastiii != iii){
		tgtspeed = tgtspeed * 2;
		dynamic = 1;
		speeddynamiclength = iii + speeddynamiclengthseed * Math.random() * fps;
		speeddynamiclengthseed = speeddynamiclengthseed * 1.1;
		speeddynamicratio = speeddynamicratio * 1.1;
		}
	else if(iii > speeddynamiclength && dynamic == 1 && lastiii != iii){
		tgtspeed = tgtspeed / 1.8;
		dynamic = 0;
	}
	if(lastiii != iii){
		submarine.x = submarine.x + Math.sin(degtorad(submarine.head)) / fps / 60 / 60  * tgtspeed * 2000 * speedmult;
		submarine.y = submarine.y + Math.cos(degtorad(submarine.head)) / fps / 60 / 60  * tgtspeed * 2000 * speedmult;
	}
	while(storesub.length < iii){
		storesub.push(submarine);
	}
	display = 0;
	for(i=0;i<testpatcount;i++){
		searchtestpat[i].dir = "";
		var distbetween = distbtwnpt(searchtestpat[i].x,searchtestpat[i].y,submarine.x,submarine.y);
		if(searchtestpat[i].type != "attack" && searchtestpat[i].time / speedmult < iii / fps && distbetween < range && searchtestpat[i].cancel == 0){
			display = 1;
			searchtestpat[i].dir = Math.atan2(submarine.x-searchtestpat[i].x,submarine.y-searchtestpat[i].y);
		}
		else if(searchtestpat[i].type == "attack" && searchtestpat[i].time / speedmult > (iii / fps) && searchtestpat[i].time / speedmult < (iii / fps)+1&& distbetween < killrange && searchtestpat[i].cancel == 0){
			searchtestpat[i].kill = 1;
			searchtestpat[i].killdist = Math.min(searchtestpat[i].killdist,distbetween);
			allpattern[searchtestpat[i].id][0].kill = 1;
		}
	}
	if(infomode == "fix"){
		if(display == 1){
			var subsize = 35;
			var currentsubposit = new Object;
			cpdcontext.strokeStyle = "red";
			cpdcontext.beginPath();
			currentsubposit = converttofake(submarine.x, -1*submarine.y)
			//drawsubmarineangle(1, currentsubposit, 1, 0, subsize);
			//drawsubmarineangle(2, currentsubposit, 1.05, 2.5, subsize);
			//drawsubmarineangle(2, currentsubposit, 1.15, 5, subsize);
			drawsubmarineangle(1, currentsubposit, 1.25, 10, subsize);
			drawsubmarineangle(2, currentsubposit, 1, 172, subsize);
			drawsubmarineangle(2, currentsubposit, .9, 175, subsize);
			drawsubmarineangle(2, currentsubposit, .9, -175, subsize);
			drawsubmarineangle(2, currentsubposit, 1, -172, subsize);
			drawsubmarineangle(2, currentsubposit, 1.25, -10, subsize);
			//drawsubmarineangle(2, currentsubposit, 1.15, -5, subsize);
			//drawsubmarineangle(2, currentsubposit, 1.05, -2.5, subsize);
			//drawsubmarineangle(2, currentsubposit, 1, 0, subsize);
			drawsubmarineangle(3, currentsubposit, 1.25, -10, subsize);
			cpdcontext.fillStyle = 'black';
			cpdcontext.stroke();
			cpdcontext.fill();
		};
	}
	cpdcontext.lineWidth=2;
	if(infomode == "bearing"){
		if(display == 1){
			for(i=0;i<testpatcount;i++){
				if(searchtestpat[i].dir != ""){
					var currentsubposit = new Object;
					currentsubposit.x = searchtestpat[i].x + range * Math.sin(searchtestpat[i].dir);
					currentsubposit.y = searchtestpat[i].y + range * Math.cos(searchtestpat[i].dir);
					currentsubposit = converttofake(currentsubposit.x,-1*currentsubposit.y);
					var currentbuoyposit = new Object;
					currentbuoyposit = converttofake(searchtestpat[i].x,-1*searchtestpat[i].y);
					if(Math.abs(distbtwnangle((720+submarine.head)%360,(720+radtodeg(searchtestpat[i].dir))%360)) > 90)
						cpdcontext.strokeStyle = "green";
					else
						cpdcontext.strokeStyle = "red";
					cpdcontext.beginPath();
					cpdcontext.moveTo(currentbuoyposit.x,currentbuoyposit.y);
					cpdcontext.lineTo(currentsubposit.x,currentsubposit.y);
					cpdcontext.stroke();
				};
			};
		};
	}
	cpdcontext.lineWidth=1;
	lastiii = iii;
};
var lastiii;
var startbuoys = 20;
var buoysleft = 20;
var display;

function drawsubmarineangle(sequence, centerobject, dstnce, bearng, subsize){
	if(sequence == 1)
		cpdcontext.moveTo(centerobject.x+subsize/dstnce*Math.sin(degtorad(submarine.head+bearng)),centerobject.y-subsize/dstnce*Math.cos(degtorad(submarine.head+bearng)));
	else if(sequence == 2)
		cpdcontext.lineTo(centerobject.x+subsize/dstnce*Math.sin(degtorad(submarine.head+bearng)),centerobject.y-subsize/dstnce*Math.cos(degtorad(submarine.head+bearng)));
	else if(sequence == 3)
		cpdcontext.bezierCurveTo(centerobject.x+subsize/dstnce*Math.sin(degtorad(submarine.head+bearng)),centerobject.y-subsize/dstnce*Math.cos(degtorad(submarine.head+bearng)),centerobject.x+subsize/.8*Math.sin(degtorad(submarine.head)),centerobject.y-subsize/.8*Math.cos(degtorad(submarine.head)),centerobject.x+subsize/dstnce*Math.sin(degtorad(submarine.head-bearng)),centerobject.y-subsize/dstnce*Math.cos(degtorad(submarine.head-bearng)));
}
