var playerColor = "green";
var backgroundColor = "black";
var overflowColor = "red";

class Player{

}

class Enviroment{
  constructor(){

  }
  draw(frame){
    //clear
    frame.context.clearRect(0, 0, frame.w, frame.h);
    //padding
    frame.context.fillStyle = overflowColor;
    frame.context.fillRect(0, 0, frame.hPad, frame.h);
    frame.context.fillRect(frame.w, 0, -frame.hPad, frame.h);
    frame.context.fillRect(0, 0, frame.w, frame.vPad);
    frame.context.fillRect(0, frame.h, frame.w, -frame.vPad);
    //draw Image
  }
  get array(){

  }
  getPoint(x, y){

  }
}


/*
var enviroment;

function init(){

}

function advanceEnviroment(){
  for(var c = 1; c < enviroment.length; c ++){
    for(var r = 0; r < enviroment[c].length; r ++){
      enviroment[c-1][r] = enviroment[c][r];
    }
  }
  enviroment[enviroment.length - 1] = generateNextLayer(enviroment[enviroment.length - 2]);
}
function generateNextLayer(previousLayer){
  for(var r = 0; r < previousLayer.length; r ++){
    if(Math.random() > 0.5){
      previousLayer
    }
  }
}
*/
