
function initdrawmenu(){
	cpdcontext.clearRect(-1*cpdcenter.x, -1*cpdcenter.y, cpdcanvas.width, cpdcanvas.height);
	cpdcontext.fillStyle = "#dcdfe5";
	cpdcontext.fillRect(-1*cpdcenter.x, -1*cpdcenter.y, cpdcanvas.width, cpdcanvas.height);
	cpdcontext.globalAlpha = 0.6;
	cpdcontext.fillStyle="#548c5f";
	menucenterpos = (-1*cpdcenter.x+cpdres.x)-.5 * menubuttonwidth;
	difficultyheader.yd = fontsize * 1.1;
	infomodeheader.yd = fontsize * 1.1;
	gamemodeheader.yd = fontsize * 1.1;
	menucenterpos = (-1*cpdcenter.x+cpdres.x)-.5 * menubuttonwidth;
	infomodeheader.xs = menucenterpos;
	infomodeheader.ys = -1*cpdcenter.y + 2 * menubuttongap;
	exactbutton.xs = menucenterpos - .5*menubuttongap - .5*menubuttonwidth;
	exactbutton.ys = infomodeheader.ys + fontsize * 1.1
	bearingbutton.xs = menucenterpos + .5*menubuttonwidth+.5*menubuttongap;
	bearingbutton.ys = exactbutton.ys;
	difficultyheader.xs = menucenterpos;
	difficultyheader.ys = bearingbutton.ys + menubuttonheight;
	mediumbutton.xs = menucenterpos;
	easybutton.xs = mediumbutton.xs - menubuttonwidth - menubuttongap;
	hardbutton.xs = mediumbutton.xs + menubuttonwidth + menubuttongap;
	mediumbutton.ys = difficultyheader.ys + fontsize * 1.1;
	easybutton.ys = mediumbutton.ys;
	hardbutton.ys = mediumbutton.ys;
	gamemodeheader.xs = menucenterpos;
	gamemodeheader.ys = easybutton.ys + menubuttonheight;
	attackmodebutton.xs = mediumbutton.xs;
	trackmodebutton.xs = easybutton.xs;
	defendmodebutton.xs = hardbutton.xs;
	attackmodebutton.ys = gamemodeheader.ys + fontsize * 1.1;;
	defendmodebutton.ys = attackmodebutton.ys;
	trackmodebutton.ys = attackmodebutton.ys;
	startbutton.xs = menucenterpos;
	startbutton.ys = (2*cpdres.y - cpdcenter.y) - 3 * menubuttongap - menubuttonheight;
	cpdcontext.textAlign = 'center';
	cpdcontext.textBaseline="middle";
	if(infomode != "fix")
		cpdcontext.fillStyle="#909090";
	else
		cpdcontext.fillStyle="#548c5f";
	drawonebutton(exactbutton);
	if(infomode != "bearing")
		cpdcontext.fillStyle="#909090";
	else
		cpdcontext.fillStyle="#548c5f";
	drawonebutton(bearingbutton);
	if(difficulty != "easy")
		cpdcontext.fillStyle="#909090";
	else
		cpdcontext.fillStyle="#548c5f";
	drawonebutton(easybutton);
	if(difficulty != "medium")
		cpdcontext.fillStyle="#909090";
	else
		cpdcontext.fillStyle="#548c5f";
	drawonebutton(mediumbutton);
	if(difficulty != "hard")
		cpdcontext.fillStyle="#909090";
	else
		cpdcontext.fillStyle="#548c5f";
	drawonebutton(hardbutton);
	if(gamemode != "attack")
		cpdcontext.fillStyle="#909090";
	else
		cpdcontext.fillStyle="#548c5f";
	drawonebutton(attackmodebutton);
	if(gamemode != "track")
		cpdcontext.fillStyle="#909090";
	else
		cpdcontext.fillStyle="#548c5f";
	//drawonebutton(trackmodebutton);
	if(gamemode != "defend")
		cpdcontext.fillStyle="#909090";
	else
		cpdcontext.fillStyle="#548c5f";
	//drawonebutton(defendmodebutton);
	cpdcontext.fillStyle="#909090";
	drawonebutton(startbutton);
	cpdcontext.fillStyle="black";
	drawbuttontext(infomodeheader,"Information Mode");
	drawbuttontext(difficultyheader,"Difficulty");
	//drawbuttontext(gamemodeheader,"Game Mode");
	drawbuttontext(infomodeheader,"Information Mode");
	drawbuttontext(difficultyheader,"Difficulty");
	//drawbuttontext(gamemodeheader,"Game Mode");
	drawbuttontext(exactbutton,"Fix");
	drawbuttontext(bearingbutton,"Bearing");
	drawbuttontext(easybutton,"Easy");
	drawbuttontext(mediumbutton,"Medium");
	drawbuttontext(hardbutton,"Hard");
	//drawbuttontext(defendmodebutton,"Defend");
	//drawbuttontext(attackmodebutton,"Attack");
	//drawbuttontext(trackmodebutton,"Track");
	drawbuttontext(attackmodebutton,"Tutorial");
	drawbuttontext(startbutton,"Start");
	cpdcontext.globalAlpha = 1;
}

function layout(){
	document.write('<div id="inputs"></div>');
};

var tutorialstate = 0;
function runtutorial(){
	base_image = new Image();
	if(tutorialstate == 0)
		base_image.src = 'img/firstinstructions.jpg';
	else if(tutorialstate == 1)
		base_image.src = 'img/secondinstructions.jpg';
	else if(tutorialstate == 2)
		base_image.src = 'img/thirdinstructions.jpg';
	else if(tutorialstate == 3)
		base_image.src = 'img/fourthinstructions.jpg';
	var tutorialheight = cpdcanvas.height;
	var tutorialwidth = cpdcanvas.width;
	var tutorialratio = tutorialheight / tutorialwidth;
	//if(tutorialratio < 19/9)
		//tutorialwidth = cpdcanvas.height * 9 / 19;
	//else if(tutorialratio > 19/9)
		//tutorialheight = cpdcanvas.width / 9 * 19;
	base_image.onload = function(){
		cpdcontext.drawImage(base_image, -1*cpdcenter.x, -1*cpdcenter.y, tutorialwidth, tutorialheight);
	}
	tutorialstate += 1;
}

var cpdres = {};
cpdres.x = Math.round(.98*window.innerWidth/2);
cpdres.y = Math.round(window.innerHeight/2);

var fontsize= Math.min(cpdres.x,cpdres.y) * .05;

var buttonheight = 80/300 * cpdres.y;
var buttongap = Math.ceil(2/300 * Math.min(cpdres.x,cpdres.y));
var buttonwidth = 2/5 * cpdres.x - .8*buttongap;
var smallbuttonheight = .75*buttonheight;
var smallbuttonwidth = 3/7*buttonwidth;
var animation;
var iii = 0;
var controli = 0;
var gamenowtime = 0;
var gamestarttime = 0;
var score = 0;

function drawscore(){
cpdcontext.textAlign="start";
	cpdcontext.font=getFont(.05);
	cpdcontext.fillStyle="black";
	if(display == 1){
		if(difficulty == "easy")
			score = Math.round(iii/fps);
		else if(difficulty == "medium")
			score = 2*Math.round(iii/fps);
		else if(difficulty == "hard")
			score = 3*Math.round(iii/fps);
	}
	cpdcontext.fillText("Score: " + score,-1*cpdcenter.x+buttongap,-1*cpdcenter.y + 2*cpdres.y - 5*buttongap);
	buoysleft = startbuoys - testpatcount + attackpatcount;
	for(i=0;i<testpatcount;i++){
		if(searchtestpat[i].type != "attack")
			buoysleft = buoysleft + searchtestpat[i].cancel;
	}
	cpdcontext.fillText("Buoys: " + buoysleft,-1*cpdcenter.x+buttongap,-1*cpdcenter.y + 2*cpdres.y - 5*buttongap - fontsize * 1.3);
};


function getFont(ratio) {
    fontsize = Math.min(cpdres.x,cpdres.y) * ratio;
    return (fontsize|0) + 'px georgia';
	};

function drawonebutton(button){
	cpdcontext.fillRect(button.xs,button.ys,button.xd,button.yd);
};

function drawbuttontext(button,text){
	cpdcontext.fillText(text,button.xd/2+button.xs,button.yd/2+button.ys);
};
	var calcbutton = new Object;
		calcbutton.xd = buttonwidth;
		calcbutton.yd = buttonheight;
	var deletebutton = new Object;
		deletebutton.xd = buttonwidth;
		deletebutton.yd = buttonheight;
	var linebutton = new Object;
		linebutton.xd = buttonwidth;
		linebutton.yd = buttonheight;
	var attackbutton = new Object;
		attackbutton.xd = buttonwidth;
		attackbutton.yd = buttonheight;


	var zoominbutton = new Object;
		zoominbutton.xd = smallbuttonwidth;
		zoominbutton.yd = smallbuttonheight;
	var zoomoutbutton = new Object;
		zoomoutbutton.xd = smallbuttonwidth;
		zoomoutbutton.yd = smallbuttonheight;
	var morelinebutton = new Object;
		morelinebutton.xd = smallbuttonwidth;
		morelinebutton.yd = smallbuttonheight;
	var lesslinebutton = new Object;
		lesslinebutton.xd = smallbuttonwidth;
		lesslinebutton.yd = smallbuttonheight;
	var menubutton = new Object;
		menubutton.xd = buttonwidth;
		menubutton.yd = buttonheight;






function drawbuttons(){
	cpdcontext.font=getFont(.075);
	menubutton.xs = -1*cpdcenter.x+buttonwidth+buttongap;
	menubutton.ys = -1*cpdcenter.y;
	calcbutton.xs = -1*cpdcenter.x;
	calcbutton.ys = -1*cpdcenter.y;
	deletebutton.xs = 2*cpdres.x-cpdcenter.x-buttonwidth;
	deletebutton.ys = -1*cpdcenter.y+buttonheight+buttongap;
	if(gamemode == "attack"){
		attackbutton.xs = deletebutton.xs;
		attackbutton.ys = deletebutton.ys + buttonheight + buttongap;
	}
	linebutton.xs = 2*cpdres.x-cpdcenter.x-buttonwidth;
	linebutton.ys = -1*cpdcenter.y;
	zoominbutton.xs = 2*cpdres.x-cpdcenter.x-zoominbutton.xd;
	zoominbutton.ys = -1*cpdcenter.y+buttonheight+buttongap;
	zoomoutbutton.xs = 2*cpdres.x-cpdcenter.x-zoomoutbutton.xd;
	zoomoutbutton.ys = -1*cpdcenter.y+buttonheight+buttongap+smallbuttonheight+fontsize;
	morelinebutton.xs = 2*cpdres.x-cpdcenter.x-morelinebutton.xd - buttongap - buttonwidth;
	morelinebutton.ys = -1*cpdcenter.y;
	lesslinebutton.xs = 2*cpdres.x-cpdcenter.x-morelinebutton.xd - buttongap - buttonwidth;
	lesslinebutton.ys = -1*cpdcenter.y + buttongap + 2 * buttonheight - smallbuttonheight;
	cpdcontext.globalAlpha = 0.6;
	cpdcontext.fillStyle="#548c5f";
	if(newpatterntype == "line")
		cpdcontext.fillStyle="#909090";
	drawonebutton(linebutton);

		cpdcontext.fillStyle="#ad6868";
	if(gamemode == "attack" && newpatterntype != "attack")
		drawonebutton(attackbutton);
	else if(gamemode == "attack" && newpatterntype == "attack"){
		cpdcontext.fillStyle="#909090";
		drawonebutton(attackbutton);
	}
	cpdcontext.fillStyle="#548c5f";
	drawonebutton(morelinebutton);
	drawonebutton(lesslinebutton);



	cpdcontext.fillStyle="#6882ad";
	drawonebutton(calcbutton);
	drawonebutton(menubutton);

		drawonebutton(deletebutton);
	cpdcontext.fillStyle="black";
	cpdcontext.textAlign = 'center';
	cpdcontext.textBaseline="middle";
		drawbuttontext(deletebutton,"Cancel");
	drawbuttontext(linebutton,"Deploy");

	drawbuttontext(menubutton,"Menu");
	if(animate > 0){
		drawbuttontext(calcbutton,"Pause");
		drawbuttontext(calcbutton,"Pause");
	}
	else{
		drawbuttontext(calcbutton,"Start");
		drawbuttontext(calcbutton,"Start");
	}
	if(gamemode == "attack")
		drawbuttontext(attackbutton,"Attack");
	cpdcontext.fillText(linenum,2*cpdres.x-cpdcenter.x-smallbuttonwidth/2 - buttongap - buttonwidth,-1*cpdcenter.y+buttonheight+.5*buttongap+fontsize*0);

	cpdcontext.font=getFont(.1);


	drawbuttontext(morelinebutton,"+");
	drawbuttontext(lesslinebutton,"-");


	cpdcontext.globalAlpha = 1;
	cpdcontext.fillStyle = "#00FF00";
};
var menubuttonheight = 80/300 * cpdres.y;
var menubuttongap = Math.ceil(2/300 * Math.min(cpdres.x,cpdres.y));
var menubuttonwidth = 6/10 * cpdres.x - .8*buttongap;
var menucenterpos;
var quitbutton = new Object;
quitbutton.xd = menubuttonwidth;
quitbutton.yd = menubuttonheight;
var replaybutton = new Object;
replaybutton.xd = menubuttonwidth;
replaybutton.yd = menubuttonheight;
var savebutton = new Object;
savebutton.xd = menubuttonwidth;
savebutton.yd = menubuttonheight;
var attackmodebutton = new Object;
attackmodebutton.xd = menubuttonwidth;
attackmodebutton.yd = menubuttonheight;
var trackmodebutton = new Object;
trackmodebutton.xd = menubuttonwidth;
trackmodebutton.yd = menubuttonheight;
var defendmodebutton = new Object;
defendmodebutton.xd = menubuttonwidth;
defendmodebutton.yd = menubuttonheight;
var gamemodeheader = new Object;
gamemodeheader.xd = menubuttonwidth;
gamemodeheader.yd = fontsize * 1.1;;
var infomodeheader = new Object;
infomodeheader.xd = menubuttonwidth;
infomodeheader.yd = fontsize * 1.1;
var bearingbutton = new Object;
bearingbutton.xd = menubuttonwidth;
bearingbutton.yd = menubuttonheight;
var exactbutton = new Object;
exactbutton.xd = menubuttonwidth;
exactbutton.yd = menubuttonheight;
var difficultyheader = new Object;
difficultyheader.xd = menubuttonwidth;
difficultyheader.yd = fontsize * 1.1;
var easybutton = new Object;
easybutton.xd = menubuttonwidth;
easybutton.yd = menubuttonheight;
var mediumbutton = new Object;
mediumbutton.xd = menubuttonwidth;
mediumbutton.yd = menubuttonheight;
var hardbutton = new Object;
hardbutton.xd = menubuttonwidth;
hardbutton.yd = menubuttonheight;
var returnbutton = new Object;
returnbutton.xd = menubuttonwidth;
returnbutton.yd = menubuttonheight;
var startbutton = new Object;
startbutton.xd = menubuttonwidth;
startbutton.yd = menubuttonheight;
function drawmenu(){
	cpdcontext.clearRect(-1*cpdcenter.x, -1*cpdcenter.y, cpdcanvas.width, cpdcanvas.height);
	cpdcontext.fillStyle = "#dcdfe5";
	cpdcontext.fillRect(-1*cpdcenter.x, -1*cpdcenter.y, cpdcanvas.width, cpdcanvas.height);
	cpdcontext.globalAlpha = 0.6;
	cpdcontext.fillStyle="#548c5f";

	menucenterpos = (-1*cpdcenter.x+cpdres.x)-.5 * menubuttonwidth;
	savebutton.xs = menucenterpos;
	quitbutton.xs = menucenterpos;
	replaybutton.xs = menucenterpos;
	savebutton.ys = -1*cpdcenter.y + 2 * menubuttongap;
	quitbutton.ys = savebutton.ys + menubuttongap + menubuttonheight;
	replaybutton.ys = quitbutton.ys + menubuttongap + menubuttonheight;
	returnbutton.xs = menucenterpos;
	returnbutton.ys = replaybutton.ys + 3*menubuttongap + menubuttonheight;
	//returnbutton.ys = (2*cpdres.y - cpdcenter.y) - 3 * menubuttongap - menubuttonheight;
	cpdcontext.textAlign = 'center';
	cpdcontext.textBaseline="middle";
	cpdcontext.fillStyle="#909090";

	cpdcontext.fillStyle="#6882ad";
	drawonebutton(quitbutton);
	//drawonebutton(savebutton);
	//drawonebutton(replaybutton);
	cpdcontext.fillStyle="#548c5f";
	drawonebutton(returnbutton);
	cpdcontext.fillStyle="black";
	//drawbuttontext(savebutton,"Save and Quit");
	drawbuttontext(quitbutton,"Quit");
	//drawbuttontext(replaybutton,"Show Replay");
	drawbuttontext(returnbutton,"Resume");
	cpdcontext.globalAlpha = 1;

};

var historicalscores = [];
function drawquitscreen(){
	endgame = true;
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
	cpdcontext.clearRect(-1*cpdcenter.x, -1*cpdcenter.y, cpdcanvas.width, cpdcanvas.height);
	cpdcontext.fillStyle = "#dcdfe5";
	cpdcontext.fillRect(-1*cpdcenter.x, -1*cpdcenter.y, cpdcanvas.width, cpdcanvas.height);
	cpdcontext.fillStyle = "black";
	drawbuttontext(returnbutton,"Score: " + score + " High Score: " + maxscore);
	cpdcontext.fillStyle="#909090";
	drawonebutton(replaybutton);
	cpdcontext.fillStyle = "black";
	drawbuttontext(replaybutton,"Main Menu");
	//if(AdMob) AdMob.createBanner( {
    //adId:admobid.banner, 
    //position:AdMob.AD_POSITION.BOTTOM_CENTER, 
    //autoShow:true} );
}

function menudetect(pos1,pos2){
	if(clickinside(pos1,returnbutton) && clickinside(pos2,returnbutton)){
		menu = false;
	}
	if(clickinside(pos1,quitbutton) && clickinside(pos2,quitbutton)){
		menu = false;
		drawquitscreen();
	}
	if(clickinside(pos1,savebutton) && clickinside(pos2,savebutton)){
		if(1==1)
			return;
		menu = false;
		initmenu = true;
		initdrawmenu();
	}
};



function initmenudetect(pos1,pos2){
	if(clickinside(pos1,startbutton) && clickinside(pos2,startbutton)){
		animate = 0;
		pause = 0;
		pausetime = 0;
		lastiii = 0;
		clearcpdpath();
		cpdmain();
		menu = false;
		initmenu = false;
	}
	if(clickinside(pos1,exactbutton) && clickinside(pos2,exactbutton)){
		infomode = "fix";
		initdrawmenu();
	}
	if(clickinside(pos1,bearingbutton) && clickinside(pos2,bearingbutton)){
		infomode = "bearing";
		initdrawmenu();
	}
	if(clickinside(pos1,easybutton) && clickinside(pos2,easybutton)){
		difficulty = "easy";
		initdrawmenu();
	}
	if(clickinside(pos1,mediumbutton) && clickinside(pos2,mediumbutton)){
		difficulty = "medium";
		initdrawmenu();
	}
	if(clickinside(pos1,hardbutton) && clickinside(pos2,hardbutton)){
		difficulty = "hard";
		initdrawmenu();
	}
	if(clickinside(pos1,attackmodebutton) && clickinside(pos2,attackmodebutton)){
		//EDIT THIS if we go back to game modes
		//gamemode = "attack";
		//initdrawmenu();
		tutorial = 1;
		initmenu = false;
		runtutorial();
	}
	if(clickinside(pos1,defendmodebutton) && clickinside(pos2,defendmodebutton)){
		//gamemode = "defend";
		//initdrawmenu();
	}
	if(clickinside(pos1,trackmodebutton) && clickinside(pos2,trackmodebutton)){
		//gamemode = "track";
		//initdrawmenu();
	}
}