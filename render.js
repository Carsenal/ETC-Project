
class Frame{
  constructor(c, e, p){
    this.canvas = c;
    this.context = this.canvas.getContext("2d");
    this.enviroment = e;
    this.player = p;
    window.addEventListener("resize", this.resize);
    this.resize();
  }
  update(){
    this.enviroment.update();
    this.player.update(this.enviroment);
  }
  draw(){
    this.enviroment.draw(this);
    //this.player.draw(this);
  }
  resize(){
    this.canvas.style.width ='100%';
    this.canvas.style.height='100%';
    this.canvas.width  = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
    this.draw();
  }
  get w(){
    return this.canvas.width;
  }
  get h(){
    return this.canvas.height
  }
  get hPad(){
    return (this.w - this.cw)/2;
  }
  get vPad(){
    return (this.h - this.ch)/2;
  }
  get cw(){
    if(this.w / 1.8 < this.h)return this.w;
    return this.h * 1.8;
  }
  get ch(){
    if(this.h * 1.8 < this.w)return this.h;
    return this.w / 1.8;
  }
}
