 class Pacman{
    constructor(x,y,width,height,speed){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        this.speed=speed;
        this.direction=DIRECTION_RIGHT;
        this.nextDirection=this.direction;
        this.currentFrame=1;
        this.frameCount=7;
        setInterval(() => {
            this.changeAnimation();
          }, 100);
    }
    
     moveProcess(){
      this.changeDirectionIfPossible();
      this.moveForwards();
     if(this.checkCollision()){
          this.moveBackwards();
     }
    }
    eat(){

    for(let i=0;i<map.length;i++){
        for(let j=0;j<map[i].length;j++){
            if(map[i][j]==0 && this.getMapy()==i && this.getMapX()==j){
                map[i][j]=2;
                score++;
                eatSound.play();
            }

            
        }
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
   
   
   
   
   //the GHost collison
   checkGhostCollision(){
    for(let i=0;i<ghosts.length;i++){
        if(ghosts[i].getMapy()==this.getMapy() && ghosts[i].getMapX()==this.getMapX()){
            return true;
        }
    }
    return false;
   }
    
   
   
   
   
    changeDirectionIfPossible(){
     if(this.direction==this.nextDirection){return}
     let tempDirection=this.direction;
     this.direction=this.nextDirection;
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
        context.translate(this.x+oneBlocksize/2,this.y+oneBlocksize/2);
        let rotationAngle = 0;
        switch (this.direction) {
          case DIRECTION_RIGHT:
            rotationAngle = 0;
            break;
          case DIRECTION_LEFT:
            rotationAngle = Math.PI;
            break;
          case DIRECTION_UP:
            rotationAngle = -Math.PI / 2;
            break;
          case DIRECTION_BOTTOM:
            rotationAngle = Math.PI / 2;
            break;
        }
      
        context.rotate(rotationAngle);
        //context.rotate((this.direction*90*Math.PI)/180);
        context.translate(-this.x-oneBlocksize/2,-this.y-oneBlocksize/2);
       context.drawImage(
        pacmanFrames,
        (this.currentFrame-1)*oneBlocksize,
        0,
        oneBlocksize,
        oneBlocksize,
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



