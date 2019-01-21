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
}
function update(enviroment){
	items = enviroment;
}
var render = function(){
	context.clearRect(0, 0, cw, ch);
	var i;
	for(i = 0; i < items.length; i ++){
		items[i].draw(context, cx, cw, ch);
	}
	window.requestAnimationFrame(render);
}
function moveCamera(dx){
	cx += dx;
}

init();