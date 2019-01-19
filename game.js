/* Game.js
 * Author: Carson Riker
 */

//Document pointer initialization
var canvas = document.getElementById("mainCanvas");
var context = canvas.getContext("2d");
context.canvas.height = 1000;
context.canvas.width = 1000;



//Game Object initialization
var user, enviroment;
//Controll intialization
controller = {
	left: false,
	right: false,
	up: false,
	keyListener:function(event) {
	var key_state = (event.type == "keydown")?true:false;
	switch(event.keyCode) {
		case 37:// left key
			controller.left = key_state;
			break;
		case 38:// up key
			controller.up = key_state;
			break;
		case 39:// right key
			controller.right = key_state;
			break;
		case 40:
			user.x = 0;
			user.y = 0;
			break;
		}
	}
}
function init(){
	user = new avatar();
	enviroment = [
	new platform(platform.initDimensions(0,990,1000,10)),
	new platform(platform.initDimensions(1000,0,1,100)),
	new platform(platform.initDimensions(10,20,10,10)),
	new platform(platform.initDimensions(10,20,10,10))];
	console.log(user);
	console.log(enviroment);
	user.updatePos();
	window.requestAnimationFrame(loop);
}

loop = function(){
	user.updatePos();
	redraw();
	window.requestAnimationFrame(loop);
}

function redraw(){
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.fillRect(user.x, user.y, user.width, user.height);
	var i;
	for(i = 0; i < enviroment.length; i ++){
		context.fillRect(enviroment[i].x, enviroment[i].y, enviroment[i].width, enviroment[i].height);
	}
}

class avatar{
	constructor(){
		this.x = -10;
		this.y = -10;
		this.dx = 0;
		this.dy = 0;
		this.ddx = 3;
		this.ddy = 5;
		this.width = 10;
		this.height = 10;
		this.jumping = false;
	}
	updateSpeeds(){
		if(this.dy = 0)this.jumping = false;
		if(this.jumping){
			//console.log(this.dy);
			this.dy += this.ddy;
			//console.log(this.dy);
		} else {
			if(controller.up){
				this.dy = -10;
				this.jumping = true;
			}
		}
		if(controller.right){
			this.dx = this.ddx;
		} else if(controller.left) {
			this.dx = -1 * this.ddx;
		} else {
			this.dx = 0;
		}
	}
	updatePos(){
		this.updateSpeeds();
		var lx = this.x;
		var rx = this.x + (this.dx / 2);
		var ndx = this.dx;
		var ly = this.y;
		var ry = this.y + (this.dy / 2);
		var ndy = this.dy;
		while(!avatar.close(lx, ly, rx, ry)){
			//console.log("Current Position: (" + this.x + "," + this.y + "), Currently testing: (" + lx + "," + ly + "), (" + rx + "," + ry + ")");
			ndx /= 2;
			ndy /= 2;
			if(Math.abs(ndx) < collisionThreshold)ndx = 0;
			if(Math.abs(ndy) < collisionThreshold)ndy = 0;
			if(this.collidingOrigin(rx, ry)){
				console.log("Collided");
				rx = lx + (ndx / 2);
				ry = ly + (ndy / 2);
			} else {
				lx = rx;
				rx = lx + (ndx / 2);
				ly = ry;
				ry = ly + (ndy / 2);
			}
		}
		this.dx = rx - this.x;
		this.dy = ry - this.y;
		this.x = rx;
		this.y = ry;
		this.tl = [this.x, this.y];
		this.tr = [this.x + this.width, this.y];
		this.bl = [this.x, this.y + this.height];
		this.br = [this.x + this.width, this.y + this.height];
		this.corners = [this.tl, this.tr, this.bl, this.br];
		//console.log("new coordinates: " + this.corners);
	}
	collidingAvatar(){
		for(p in enviroment){
			if(p.checkAvatar(this))return true;
		}
		return false;
	}
	collidingCorners(c){
		//console.log(enviroment);
		for(var i = 0; i < enviroment.length; i ++){
			if(enviroment[i].checkCorners(c))return true;
		}
		return false;
	}
	collidingOrigin(nx, ny){
		//console.log("colliding(" + nx + "," + ny + ")");
		var tl = [nx, ny];
		var tr = [nx + this.width, ny];
		var bl = [nx, ny + this.height];
		var br = [nx + this.width, ny + this.height];
		return this.collidingCorners([tl, tr, bl, br]);
	}

	static close(x1, y1, x2, y2){
		return ((Math.abs(x1 - x2) < collisionThreshold)&&(Math.abs(y1 - y2) < collisionThreshold));
	}
}

class platform{
	//Bottom left then top right corner
	constructor(c){
		this.corners = c;
		this.tl = c[0];
		this.tr = c[1];
		this.bl = c[2];
		this.br = c[3];
		this.x = this.tl[0];
		this.y = this.tl[1];
		this.width = this.br[0] - this.bl[0];
		this.height = this.br[1] - this.tr[1];
		console.log(this);
	}

	static initCorners(x1, y1, x2, y2){
		var tl = [x1, y1];
		var tr = [x2, y1];
		var bl = [x1, y2];
		var br = [x2, y2];
		var corners = [tl, tr, bl, br];
		return corners;
	}
	static initDimensions(x, y, w, h){
		var tl = [x, y];
		var tr = [x + w, y];
		var bl = [x, y + h];
		var br = [x + w, y + h];
		var corners = [tl, tr, bl, br];
		console.log(corners);
		return corners;
	}

	checkAvatar(a){
		if(this.checkPoint(a.tl))return true;
		if(this.checkPoint(a.tr))return true;
		if(this.checkPoint(a.bl))return true;
		if(this.checkPoint(a.br))return true;
		return false;
	}
	checkCorners(c){
		if(this.checkPoint(c[0]))return true;
		if(this.checkPoint(c[1]))return true;
		if(this.checkPoint(c[2]))return true;
		if(this.checkPoint(c[3]))return true;
		return false;
	}
	checkPoint(tuple){
		var ix = tuple[0];
		var iy = tuple[1];
		var inX = ((ix > this.x) && (ix < this.x + this.width));
		var inY = ((iy > this.y) && (iy < this.y + this.height));
		return (inX && inY);
	}
}


function keyPress(){

}

function arrow(){

}

window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);
init();
