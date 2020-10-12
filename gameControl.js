
function endgame(){
	historicalscores.push(score);
	var jsonText = JSON.stringify(historicalscores);
	localStorage.setItem("Scores", jsonText);
	var jsonText = localStorage.getItem("Scores");
	historicalscores = JSON.parse(jsonText);
	pauseanimation();
	var maxscore = 0;
	for(i=0;i<historicalscores.length;i++){
		if(maxscore < historicalscores[i])
			maxscore = historicalscores[i];
	}
	drawbuttontext(returnbutton,maxscore + ", " + score);
}





var actualrange = 1200;
var centersubheading = 360;
var subheadingerror = 180;
var secdist;
var fps = 30;
var initposit;
var lastclick;
var pinch = 0;
var startpinch = 0;
var endpinch;
var zoomcenter = new Object;
zoomcenter.x = 0;
zoomcenter.y = 0;
var oldclick = 0;
var doubleclick;
var endgame= false;
var menu = false;
var MDR = 1000;
function cpdmain(){
	var calcdate = new Date();
	var calcmins = calcdate.getMinutes();
	var calcsecs = calcdate.getSeconds();
	radius = Math.pow(patternspeed+wind,2) / (11.26*Math.tan(aob*(Math.PI / 180)))/3;
	turnrad = radius * 1.1;
	unloadScrollBars();
	cpdres.x = Math.round(window.innerWidth/2);
	cpdres.y = Math.round(window.innerHeight/2);
	var blob = '<canvas id="myCanvas" width="' + 2*cpdres.x + '" height="' + 2*cpdres.y + '"/>';
	document.getElementById("inputs").innerHTML = blob;
    cpdcanvas = document.getElementById('myCanvas');
    cpdcontext = cpdcanvas.getContext('2d');
    cpdcanvas.style.border = '1px solid #000';
    range = MDR;
 	cpdcontext.translate(cpdres.x, cpdres.y);
	cpdcenter.x = cpdres.x;
	cpdcenter.y = cpdres.y;
	secdist = patternspeed * 2000 / 60 / 60 / fps * speedmult;
	initposit = new Object;
	initposit.x = -5000;
	initposit.y = 0;
	initposit.head = degtorad(90);
	gamepath.push(initposit);
	gamepath.push(initposit);
	draweverything();
	cpdcanvas.onmousedown = function(e){
		mousePos1 = getMousePos(cpdcanvas, e);
		mouseIsDown = true;
		var clicktime = new Date();
		var newclick = clicktime.getTime();
		if(newclick - oldclick < 500)
			doubleclick = false;
		else
			doubleclick = false;
		oldclick = newclick;
	};

	cpdcanvas.onmouseup = function(e){
		mouseRef = getMousePos(cpdcanvas, e);
		if(menu == true){
			menudetect(mouseRef,mousePos1);
		}
		else if(initmenu == true){
			initmenudetect(mouseRef,mousePos1);
		}
		else if(tutorial == 1){
			if(tutorialstate >= 4){
				tutorial = 0;
				tutorialstate = 0;
				initmenu = true;
				initdrawmenu();
			}
			else
				runtutorial();
		}
		else if(endgame == true){
			endgame = false;
			initmenu = true;
		}
		else if(clickinside(mouseRef,linebutton) && clickinside(mousePos1,linebutton)){
			newpattern = true;
			if(newpatterntype == "line"){
				newpattern = false;
				newpatterntype = "";
			}
			else
			newpatterntype = "line";
		}
		else if(clickinside(mouseRef,attackbutton) && clickinside(mousePos1,attackbutton)){
			newpattern = true;
			if(newpatterntype == "attack"){
				newpattern = false;
				newpatterntype = "";
			}
			else
			newpatterntype = "attack";
		}
		else if(clickinside(mouseRef,morelinebutton) && clickinside(mousePos1,morelinebutton)){
			linenum = Math.min(buoysleft,linenum + 1);
		}
		else if(clickinside(mouseRef,lesslinebutton) && clickinside(mousePos1,lesslinebutton)){
				linenum = Math.max(1,linenum - 1);
		}

		else if(clickinside(mouseRef,calcbutton) && clickinside(mousePos1,calcbutton)){
			if(animate == 0)
				startanimation();
			else
				pauseanimation();
		}
		else if(clickinside(mouseRef,menubutton) && clickinside(mousePos1,menubutton)){
			if(iii > 0 && pause == 0)
				pauseanimation();
			menu = true;
		}
		else if(clickinside(mouseRef,deletebutton) && clickinside(mousePos1,deletebutton)){
			deletepat();
		}
		else if(mouseIsDown && newpattern){
			mouseClick(e,newpatterntype);
			newpattern = false;
			newpatterntype = "";
		}
		mouseIsDown = false;
		if(menu == false && initmenu == false && endgame == false)
			draweverything();
		else{
			if(menu == true){
				drawmenu();
				clearTimeout(animation);
				setTimeout(drawmenu(),2000/fps);
			}
			else if(endgame == false){
				initdrawmenu();
				clearTimeout(animation);
				setTimeout(initdrawmenu(),2000/fps);
			}
		}
	};
	cpdcanvas.onmousemove = function(e){
		var mousePos = getMousePos(cpdcanvas, e);
		if(endgame == true)
			return
		//(mouseIsDown && doubleclick && menu == false && initmenu == false) ||
		if((mouseIsDown && newpattern && newpatterntype == "line" && menu == false && initmenu == false)){
			newpatterntype = "line";
			newpattern = true;
			mouseRef = getMousePos(cpdcanvas, e);
			draweverything();
		}
		else if((mouseIsDown && newpattern && newpatterntype == "attack" && menu == false && initmenu == false)){
			newpatterntype = "attack";
			newpattern = true;
			mouseRef = getMousePos(cpdcanvas, e);
			draweverything();
		}
		else if(mouseIsDown && newpattern && newpatterntype == "circle"&& menu == false && initmenu == false){
			mouseRef = getMousePos(cpdcanvas, e);
			setTimeout(tempdrawcircle(),200);
		}
		else if(mouseIsDown && newpatterntype == "" && menu == false && initmenu == false){
			cpdcenter.x = cpdcenter.x + (mousePos.x-mousePos1.x);
			cpdcenter.y = cpdcenter.y + (mousePos.y- mousePos1.y);
			cpdcontext.translate((mousePos.x-mousePos1.x), (mousePos.y- mousePos1.y));
			mousePos1 = mousePos;
			draweverything();
		}

		return false;
	};
	cpdcanvas.addEventListener("touchstart", function (e) {

		e.preventDefault();
		mousePos1 = new Object;
		mousePos1 = getTouchPos(cpdcanvas, e);
		mouseRef = new Object;
		mouseRef = getTouchPos(cpdcanvas, e);
		mouseIsDown = true;
		if(e.touches.length == 2 && pinch == 0){
			pinch = 1;
			startpinch = distbtwnpt(e.touches[0].clientX,e.touches[0].clientY,e.touches[1].clientX,e.touches[1].clientY);
			zoomcenter.x = cpdcenter.x;
			zoomcenter.y = cpdcenter.y;
		}
		else{
			pinch = 0;
			var clicktime = new Date();
			var newclick = clicktime.getTime();
			if(newclick - oldclick < 500)
				doubleclick = false;
			else
				doubleclick = false;
			oldclick = newclick;
		}
	}, false);
	cpdcanvas.addEventListener("touchend", function (eb) {

		if(menu == true){
			menudetect(mouseRef,mousePos1);
		}
		else if(initmenu == true){
			initmenudetect(mouseRef,mousePos1);
		}
		else if(tutorial == 1){
			if(tutorialstate >= 4){
				tutorial = 0;
				tutorialstate = 0;
				initmenu = true;
				initdrawmenu();
			}
			else
				runtutorial();
		}
		else if(endgame == true){
			endgame = false;
			initmenu = true;
		}
		else if(clickinside(mouseRef,linebutton) && clickinside(mousePos1,linebutton)){
			newpattern = true;
			if(newpatterntype == "line"){
				newpattern = false;
				newpatterntype = "";
			}
			else
			newpatterntype = "line";
		}
		else if(clickinside(mouseRef,attackbutton) && clickinside(mousePos1,attackbutton)){
			newpattern = true;
			if(newpatterntype == "attack"){
				newpattern = false;
				newpatterntype = "";
			}
			else
			newpatterntype = "attack";
		}
		else if(clickinside(mouseRef,morelinebutton) && clickinside(mousePos1,morelinebutton)){
			linenum = linenum + 1;
		}
		else if(clickinside(mouseRef,lesslinebutton) && clickinside(mousePos1,lesslinebutton)){
				linenum = Math.max(1,linenum - 1);
		}

		else if(clickinside(mouseRef,calcbutton) && clickinside(mousePos1,calcbutton)){
			if(animate == 0)
				startanimation();
			else
				pauseanimation();
		}
		else if(clickinside(mouseRef,menubutton) && clickinside(mousePos1,menubutton)){
			if(iii > 0 && pause == 0)
				pauseanimation();
			menu = true;
		}
		else if(clickinside(mouseRef,deletebutton) && clickinside(mousePos1,deletebutton)){
			deletepat();
		}
		else if(mouseIsDown && newpattern){
			mouseClick(eb,newpatterntype);
			newpattern = false;
			newpatterntype = "";
		}
		mouseIsDown = false;
		if(menu == false && initmenu == false && endgame == false)
			draweverything();
		else{
			if(menu == true){
				drawmenu();
				clearTimeout(animation);
				setTimeout(drawmenu(),2000/fps);
			}
			else if(endgame == false){
				initdrawmenu();
				clearTimeout(animation);
				setTimeout(initdrawmenu(),2000/fps);
			}
		}
	}, false);

	cpdcanvas.addEventListener("touchmove", function (e) {
	e.preventDefault();
		mouseRef = new Object;
		mouseRef = getTouchPos(cpdcanvas, e);
		if(endgame == true || menu == true || initmenu == true)
			return
		if(e.touches.length == 1){
			pinch = 0;

		}
		if(pinch == 1){
			endpinch = distbtwnpt(e.touches[0].clientX,e.touches[0].clientY,e.touches[1].clientX,e.touches[1].clientY);
			zoom(Math.pow(startpinch/endpinch,1));
			if(1==0){
			var xchange = mousePos1.x - zoomcenter.x;
			var ychange = mousePos1.y - zoomcenter.y;


			xchange = xchange / 100;
			ychange = ychange / 100;
			if(startpinch/endpinch > 1){
				cpdcontext.translate(xchange, ychange);
				cpdcenter.x = cpdcenter.x + xchange;
				cpdcenter.y = cpdcenter.y + ychange;
			}
			else{
				cpdcontext.translate(-1 * xchange, -1 * ychange);
				cpdcenter.x = cpdcenter.x - xchange;
				cpdcenter.y = cpdcenter.y - ychange;
			};
			}
			startpinch = endpinch;
		}
		else if((mouseIsDown && doubleclick && menu == false && initmenu == false) || (mouseIsDown && newpattern && newpatterntype == "line" && menu == false && initmenu == false)){
			newpatterntype = "line";
			newpattern = true;

			draweverything();
		}
		else if(mouseIsDown && newpattern && newpatterntype == "circle"){
			setTimeout(tempdrawcircle(),500);
		}
		else if(mouseIsDown && newpatterntype == ""){
			cpdcenter.x = cpdcenter.x + (mouseRef.x - mousePos1.x);
			cpdcenter.y = cpdcenter.y + (mouseRef.y - mousePos1.y);
			cpdcontext.translate((mouseRef.x - mousePos1.x), (mouseRef.y - mousePos1.y));
			mousePos1 = mouseRef;
            draweverything();
		}

		return false;
	}, false);
};