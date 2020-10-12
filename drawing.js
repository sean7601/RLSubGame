function drawdatum(x,y){
    cpdcontext.fillStyle = "red";
    cpdcontext.strokeStyle = "red";
    var posit = new Object;
    posit = converttofake(x,y);
    if(major == 0){
    cpdcontext.fillRect(posit.x-3,posit.y,9,3);
    cpdcontext.fillRect(posit.x,posit.y-3,3,9);
    }
    else
        cpdcontext.beginPath();
        cpdcontext.arc(posit.x,posit.y,scalevalue(major),0,2*Math.PI);
        cpdcontext.stroke();
    };
    
var cpdarray;
var cpdcontext;
var cpdcanvas;
var cpdmaxdistance = 10000;
var cpdscale = 1;
var cpdres = new Object;
cpdres.x = Math.round(.98*window.innerWidth/2);
cpdres.y = Math.round(window.innerHeight/2);

function draweverything(){
		cpdcontext.clearRect(-1*cpdcenter.x, -1*cpdcenter.y, cpdcanvas.width, cpdcanvas.height);
		cpdcontext.fillStyle = "#dcdfe5";
		cpdcontext.fillRect(-1*cpdcenter.x, -1*cpdcenter.y, cpdcanvas.width, cpdcanvas.height);
		drawscore();
		drawcpdbuoys();
		countbuoys();
		drawdatum(0,0);
		for(q=0;q<flightpath.length;q++){
			if(flightpath[q].time > iii){
				turncalculator(flightpath[q].initialx,flightpath[q].initialy,flightpath[q].initialhead,flightpath[q].finalx,flightpath[q].finaly,flightpath[q].finalhead,0);
				flightpath[q];
			};
		}
		drawplaneposit(iii);
		if(gamepath.length > 0 && animate > 0){
			animatesub();
			var d = new Date();
			if(animate == 1){
				gamestarttime = d.getTime();
				animate = 2;
			}
			gamenowtime = d.getTime();
			iii = Math.round((gamenowtime-gamestarttime)/(1000/fps)-pausetime);
			clearTimeout(animation);
			animation = setTimeout(draweverything,(1000/fps));

		}
		else if(pause == 1){
			animatesub();
			drawplaneposit(iii);
		}
		if(mouseIsDown && newpattern && newpatterntype == "line"){
			tempdrawline();
		}
		if(mouseIsDown && newpattern && newpatterntype == "attack"){
			tempdrawattack();
		}
		drawbuttons();
};
var planesize = 20;
function drawplaneposit(iii){
cpdcontext.fillStyle="green";
		var drawpoints = new Object;
		if(gamepath[iii])
			drawpoints = converttofake(gamepath[iii].x,-1*gamepath[iii].y);
		else{
			controli = 0;
			while(! gamepath[iii]){
				var startingx = gamepath[gamepath.length-1].x + Math.sin(gamepath[gamepath.length-1].head+Math.PI/2) * turnrad;
				var startingy = gamepath[gamepath.length-1].y + Math.cos(gamepath[gamepath.length-1].head+Math.PI/2) * turnrad;
				gamepath.push(movealongarc(startingx,startingy,gamepath[gamepath.length-1].x,gamepath[gamepath.length-1].y,turnrad,90,secdist));
			}
			drawpoints = converttofake(gamepath[iii].x,-1*gamepath[iii].y);
		}
		var drawangle = (360 + radtodeg(gamepath[iii].head)) % 360;
		cpdcontext.beginPath();
		cpdcontext.moveTo(drawpoints.x+planesize/1.1*Math.sin(degtorad((drawangle +355)%360)),drawpoints.y-planesize/1.1*Math.cos(degtorad((drawangle +355)%360)));
		cpdcontext.lineTo(drawpoints.x+planesize/1.2*Math.sin(degtorad((drawangle +350)%360)),drawpoints.y-planesize/1.2*Math.cos(degtorad((drawangle +350)%360)));
		cpdcontext.lineTo(drawpoints.x+planesize/2.5*Math.sin(degtorad((drawangle +337)%360)),drawpoints.y-planesize/2.5*Math.cos(degtorad((drawangle +337)%360)));
		cpdcontext.lineTo(drawpoints.x+planesize*Math.sin(degtorad((drawangle +290)%360)),drawpoints.y-planesize*Math.cos(degtorad((drawangle +290)%360)));
		cpdcontext.lineTo(drawpoints.x+planesize/1.05*Math.sin(degtorad((drawangle +280)%360)),drawpoints.y-planesize/1.05*Math.cos(degtorad((drawangle +280)%360)));
		cpdcontext.lineTo(drawpoints.x+planesize/6*Math.sin(degtorad((drawangle +270)%360)),drawpoints.y-planesize/6*Math.cos(degtorad((drawangle +270)%360)));
		cpdcontext.lineTo(drawpoints.x+planesize/1.3*Math.sin(degtorad((drawangle +190)%360)),drawpoints.y-planesize/1.3*Math.cos(degtorad((drawangle +190)%360)));
		cpdcontext.lineTo(drawpoints.x+planesize/1.01*Math.sin(degtorad((drawangle +210)%360)),drawpoints.y-planesize/1.01*Math.cos(degtorad((drawangle +210)%360)));
		cpdcontext.lineTo(drawpoints.x+planesize/.93*Math.sin(degtorad((drawangle +207)%360)),drawpoints.y-planesize/.93*Math.cos(degtorad((drawangle +207)%360)));
		cpdcontext.lineTo(drawpoints.x+planesize/1.05*Math.sin(degtorad((drawangle +182)%360)),drawpoints.y-planesize/1.05*Math.cos(degtorad((drawangle +182)%360)));

		cpdcontext.lineTo(drawpoints.x+planesize/.7*Math.sin(degtorad((drawangle +180)%360)),drawpoints.y-planesize/.7*Math.cos(degtorad((drawangle +180)%360)));

		cpdcontext.lineTo(drawpoints.x+planesize/1.05*Math.sin(degtorad((drawangle +178)%360)),drawpoints.y-planesize/1.05*Math.cos(degtorad((drawangle +178)%360)));
		cpdcontext.lineTo(drawpoints.x+planesize/.93*Math.sin(degtorad((drawangle +153)%360)),drawpoints.y-planesize/.93*Math.cos(degtorad((drawangle +153)%360)));
		cpdcontext.lineTo(drawpoints.x+planesize/1.01*Math.sin(degtorad((drawangle +150)%360)),drawpoints.y-planesize/1.01*Math.cos(degtorad((drawangle +150)%360)));
		cpdcontext.lineTo(drawpoints.x+planesize/1.3*Math.sin(degtorad((drawangle +170)%360)),drawpoints.y-planesize/1.3*Math.cos(degtorad((drawangle +170)%360)));
		cpdcontext.lineTo(drawpoints.x+planesize/6*Math.sin(degtorad((drawangle +90)%360)),drawpoints.y-planesize/6*Math.cos(degtorad((drawangle +90)%360)));
		cpdcontext.lineTo(drawpoints.x+planesize/1.05*Math.sin(degtorad((drawangle +80)%360)),drawpoints.y-planesize/1.05*Math.cos(degtorad((drawangle +80)%360)));
		cpdcontext.lineTo(drawpoints.x+planesize*Math.sin(degtorad((drawangle +70)%360)),drawpoints.y-planesize*Math.cos(degtorad((drawangle +70)%360)));
		cpdcontext.lineTo(drawpoints.x+planesize/2.5*Math.sin(degtorad((drawangle +23)%360)),drawpoints.y-planesize/2.5*Math.cos(degtorad((drawangle +23)%360)));
		cpdcontext.lineTo(drawpoints.x+planesize/1.2*Math.sin(degtorad((drawangle +10)%360)),drawpoints.y-planesize/1.2*Math.cos(degtorad((drawangle +10)%360)));
		cpdcontext.lineTo(drawpoints.x+planesize/1.1*Math.sin(degtorad((drawangle +5)%360)),drawpoints.y-planesize/1.1*Math.cos(degtorad((drawangle +5)%360)));

		cpdcontext.bezierCurveTo(drawpoints.x+planesize*Math.sin(degtorad(drawangle + 3)), drawpoints.y-planesize*Math.cos(degtorad(drawangle + 3)), drawpoints.x+planesize*Math.sin(degtorad(drawangle - 3)), drawpoints.y-planesize*Math.cos(degtorad(drawangle - 3)), drawpoints.x+planesize/1.1*Math.sin(degtorad((drawangle +355)%360)), drawpoints.y-planesize/1.1*Math.cos(degtorad((drawangle +355)%360)));
		cpdcontext.fill();
};