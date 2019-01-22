/* Renderer
 * Author: Carson Riker
 */

  //////////////////////////
 //Variable intialization//
//////////////////////////

var canvas = document.getElementById("mainCanvas");
var context = canvas.getContext("2d");
var cw = 0;
var ch = 0;
var gw = 0;
var gh = 0;
var underground = true;
var cx = 0;
var items;
var background;

function init(){
	resize();
	window.requestAnimationFrame(render);
	window.addEventListener("resize", resize);
}
function resize(){
	canvas.style.width ='100%';
	canvas.style.height='100%';
	canvas.width  = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;
	cw = canvas.width;
	ch = canvas.height;
	//Content resizing
	gw = cw;
	if(gw / 1.8 < ch){
		gh = gw / 1.8;
		underground = true;
	} else {
		gh = ch;
		gw = gh * 1.8;
		underground = false;
	}
}
function update(enviroment){
	items = enviroment;
}
var render = function(){
	context.clearRect(0, 0, cw, ch);
	var i;
	for(i = 0; i < items.length; i ++){
		items[i].draw(context, cx, gw, gh, (cw - gw) / 2);
	}
	background();
	window.requestAnimationFrame(render);
}
function moveCamera(dx){
	cx += dx;
}

function background(){
	if(underground){
		context.fillStyle = "#964B00";
		context.fillRect(0, gh, cw, (ch - gh));
	} else {
		context.fillStyle = "#33AAFF";
		context.fillRect(0, 0, (cw - gw) / 2, gh);
		context.fillRect((cw - ((cw - gw) / 2)), 0, (cw - gw) / 2, gh);
	}
}

init();