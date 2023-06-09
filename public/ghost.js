
  class Ghost{
    constructor(x,y,width,height,speed,imageX,imageY,imageWidth,imageHeight,range){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        this.speed=speed;
        this.direction=DIRECTION_RIGHT;
        this.imageX=imageX;
        this.imageY=imageY;
        this.imageWidth=imageWidth;
        this.imageHeight=imageHeight;
        this.range=range;
         this.randomTargetIndex=parseInt(Math.random()%randomTargetsForGhosts.length);
         setInterval(function(){
            this.changeRandomDirection();
         },10000);
         
    }
    
     moveProcess(){
        if(this.isInRangeofPacman()){
            this.target=pacman;
        }else{
         this.target=randomTargetsForGhosts[this.randomTargetIndex];
        }
      this.changeDirectionIfPossible();
      this.moveForwards();
     if(this.checkCollision()){
          this.moveBackwards();
     }
    }
     

    
    moveBackwards(){
        
        switch (this.direction) {
            case DIRECTION_RIGHT: // Right
                this.x -= this.speed;
                break;
            case DIRECTION_UP: // Up
                this.y += this.speed;
                break;
            case DIRECTION_LEFT: // Left
                this.x += this.speed;
                break;
            case DIRECTION_BOTTOM: // Bottom
                this.y -= this.speed;
                break;
        }
    }
    moveForwards(){
        switch (this.direction) {
            case DIRECTION_RIGHT: // Right
                this.x += this.speed;
                break;
            case DIRECTION_UP: // Up
                this.y -= this.speed;
                break;
            case DIRECTION_LEFT: // Left
                this.x -= this.speed;
                break;
            case DIRECTION_BOTTOM: // Bottom
                this.y += this.speed;
                break;
        }    }
    checkCollision(){
let isCollided=false;
if(map[this.getMapy()][this.getMapX()]==1 
|| map[this.getMapYRightSide()][this.getMapX()]==1 
|| map[this.getMapy()][this.getMapXRightSide()]==1||
   map[this.getMapYRightSide()][this.getMapXRightSide()]==1 ){return true} return false;  }
    checkGhostCollision(){

    }


 calculateNewDirection(map,x,y){

}

isInRangeOfPacman(){
    let xDistance=Maths.abs(pacman.getMapX()-this.getMapX());
    let yDistance=Maths.abs(pacman.getMapY()-this.getMapY());
    if(Math.sqrt(xDistance*xDistance+yDistance*yDistance)<this.range){
        return true;
    }   return false;
}






    changeDirectionIfPossible(){
      let tempDirection=this.direction;
      this.direction= calculateNewDirection(
        map,
        parseInt(this.target.x/oneBlocksize),
        parseInt(this.target.y/oneBlocksize)

      );
     this.moveForwards();
     if(this.checkCollision()){
        this.moveBackwards();
        this.direction=tempDirection;

     }else {this.moveBackwards();
    }
    }
    changeAnimation(){
        this.currentFrame = (this.currentFrame % this.frameCount) + 1;    }
    draw(){
        context.save();
         
        context.drawImage(
        ghostFrames,
        this.imageX,this.imageY,
        this.imageWidth,this.imageHeight,
        this.x,
        this.y,
        this.width,
        this.height
       );
        context.restore();

}

getMapX(){
return parseInt(this.x/oneBlocksize);
}
getMapy(){
return parseInt(this.y/oneBlocksize);
} 
getMapXRightSide(){
    return parseInt((this.x+0.9999* oneBlocksize)/oneBlocksize);

}
getMapYRightSide(){
    return parseInt((this.y+0.9999* oneBlocksize)/oneBlocksize);

}



};
