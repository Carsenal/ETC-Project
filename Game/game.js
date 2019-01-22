/* Game.js
 * Author: Carson Riker
 */

class Entity{
	constructor(x, y, w, h){
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}
	draw(context, cx, cw, ch, ha){
		var ax = (cw * this.x / 180) - cx + ha;
		var ay = ch - (ch * (this.y + this.h) / 100);
		var aw = cw * this.w / 180;
		var ah = ch * this.h / 100;
		context.fillStyle = this.color;
		context.fillRect(ax, ay, aw, ah);
	}
	inside(entity){
		if(this.inside(entity.x, entity.y))return true;
		if(this.inside(entity.x, entity.y + entity.h))return true;
		if(this.inside(entity.x + entity.w, entity.y))return true;
		if(this.inside(entity.x + entity.w, entity.y + entity.h))return true;
		return false;
	}
	inside(x, y){
		var inX = ((x > this.x) && (x < this.x + this.w));
		var inY = ((y > this.y) && (y < this.y + this.h));
		return (inX && inY);
	}
	get color(){
		return "#000000"
		/*
		 * random color/animation test
		var letters = '0123456789ABCDEF';
		var color = '#';
		for (var i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
		*/
	}
}
class Image extends Entity{
	constructor(x, y, w, h, i){
		super(x, y, w, h);
		this.image = i;
	}
}
class User extends Entity{
	constructor(x, y, w, h){
		super(x, y, w, h);
		this.jumping = false;
	}
	updatePos(){
		this.x += this.dx;
	}
	draw(context, cx, cw, ch, ha){
		this.updatePos();
		super.draw(context, cx, cw, ch, ha);
	}
	get dx(){
		if(controller.left && controller.right){
			return 0;
		} else if(controller.left){
			return -1;
		} else if(controller.right){
			return 1;
		} else {
			return 0;
		}
	}
	get dy(){
		return 0;
	}
}

controller = {
	left:false,
	right:false,
	up:false,

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
		}
	}
};

window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);

var ground = new Entity(0, 0, 180, 1);
var box = new Entity(30, 60, 40, 20);
var user = new User(0, 1, 10, 10);
update([ground, box, user]);