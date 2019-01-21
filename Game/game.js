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
	draw(context, cx, cw, ch){
		var ax = (cw * this.x / 100) - cx;
		var ay = ch - (ch * (this.y + this.h) / 100);
		var aw = cw * this.w / 100;
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
	//Animation test
	get color(){
		var letters = '0123456789ABCDEF';
		var color = '#';
		for (var i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}
}
class Image extends Entity{
	constructor(x, y, w, h, i){
		super(x, y, w, h);
		this.image = i;
	}
}
var checkers = [];
var i = 0;
for(var y = 0; y < 100; y += 10){
	for(var x = 0; x < 100; x += 20){
		checkers[i] = new Entity(x, y, 10, 10);
		i ++;
	}
	//y += 10;
	for(var x = 10; x < 100; x += 20){
		checkers[i] = new Entity(x, y, 10, 10);
		i ++;
	}
}
update(checkers);