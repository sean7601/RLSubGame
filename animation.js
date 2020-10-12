var boxaop = 0;
var animate = 0;
var gamestartdate = new Date();
var gamestarttime;
var startpausetime = 0;
function startanimation(){
	animate = 1;
	if(pause == 0)
		startsubposit();
	pause = 0;
	if(startpausetime > 0){
		var d1 = new Date();
		pausetime = (d1.getTime() - startpausetime) / (1000/fps) + pausetime;
		startpausetime = 0;
		animate = 2;
	}
	var xd = 0;
	draweverything();
};
function pauseanimation(){
	animate = 0;
	var d1 = new Date();
	startpausetime = d1.getTime();
	pause = 1;
};
var pausetime = 0;
var pause = 0;