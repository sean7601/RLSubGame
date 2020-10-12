
function centeronthisrealposit(x,y){
	var realposit = new Object;
	realposit = converttofake(x,y);
	realposit.x = realposit.x + cpdres.x;
	realposit.y = realposit.y + cpdres.y;
	cpdcontext.translate(realposit.x - cpdcenter.x,realposit.y - cpdcenter.y);
	cpdcenter.x = realposit.x;
	cpdcenter.y = realposit.y;
};
function zoom(dir){
	totaloom = totaloom * dir;
	var realcenter = new Object;
	realcenter = converttoreal(cpdcenter.x-cpdres.x,cpdcenter.y-cpdres.y);
	lastcpdmaxdistance = cpdmaxdistance;
	cpdmaxdistance = cpdmaxdistance * dir;
	centeronthisrealposit(realcenter.x,realcenter.y);
	draweverything();
};

var totaloom = 1;
var lastcpdmaxdistance = 10000;
function converttofake(realx,realy){
	var fake = new Object;
	fake.x = realx  / cpdmaxdistance * Math.min(cpdres.x,cpdres.y) * cpdscale;
	fake.y = realy  / cpdmaxdistance * Math.min(cpdres.x,cpdres.y) * cpdscale;
	return fake;
};

function converttoreal(fakex,fakey){
	var real = new Object;
	real.x = fakex * cpdmaxdistance / Math.min(cpdres.x,cpdres.y) / cpdscale;
	real.y = fakey * cpdmaxdistance / Math.min(cpdres.x,cpdres.y) / cpdscale;
	return real;
};

var tempmouse = new Object;
function clickinside(mouse,button){
	tempmouse.x = mouse.x - cpdcenter.x;
	tempmouse.y = mouse.y - cpdcenter.y;
	if(mouseIsDown && tempmouse.x > button.xs && tempmouse.x < button.xs + button.xd && tempmouse.y > button.ys && tempmouse.y < button.ys + button.yd){
		return true;
	}
	else{
		return false;
	}
};


function reloadScrollBars() {
    document.documentElement.style.overflow = 'auto';
    document.body.scroll = "yes";
};

function unloadScrollBars() {
    document.documentElement.style.overflow = 'hidden';
    document.body.scroll = "no";
};



function getTouchPos(canvasDom, e) {
    var rect = canvasDom.getBoundingClientRect();
    var touch = event.touches[0];
    return {
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top
    };
  };
  
  var linetimeout;
  function mouseClick(evt,type){
      if(type == "line" && buoysleft > 0){
          buildnewline(evt);
          allpatterncount = allpatterncount + 1;
          gettimes();
          draweverything();
      }
      else if(type == "circle"){
          buildnewcircle(evt);
          allpatterncount = allpatterncount + 1;
          gettimes();
          draweverything();
      }
      else if(type == "attack"){
          buildnewattack(evt);
          allpatterncount = allpatterncount + 1;
          gettimes();
          draweverything();
      }
      patterncollect();
  };
  
  
  window.getWidthOfText = function(txt, fontname, fontsize){
  
    this.e = document.createElement('span');
  
    this.e.style.fontSize = fontsize;
  
    this.e.style.fontFamily = fontname;
  
    this.e.innerHTML = txt;
    document.body.appendChild(this.e);
  
    var w = this.e.offsetWidth;
  
    document.body.removeChild(this.e);
  
    return w;
  };

  
  function writeMessage(canvas, message) {
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = '18pt Calibri';
    context.fillStyle = 'black';
  };
  function getMousePos(canvas, evt) {
    var rect= canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  };