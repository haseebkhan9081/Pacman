class pacman{
    constructor(x,y,width,height,speed){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        this.speed=speed;
        this.direction=DIRECTION_RIGHT
    }
     moveProcess(){
      this.changeDirectionIfPossible();
      this.moveForwards();
     if(this.checkCollision()){
          this.moveBackwards();
     }
    }
    eat(){

    }
    moveBackwards(){
        switch(this.direction){
            case DIRECTION_RIGHT:
                this.x=this.x-this.speed;
                break;
            case DIRECTION_LEFT:
                this.x=this.x+this.speed;
                break;
            case DIRECTION_UP:
                this.y=this.y+this.speed;
                break;
            case DIRECTION_BOTTOM:
                this.y=this.y-this.speed;
                break;    
        }
        
    }
    moveForwards(){
switch(this.direction){
    case DIRECTION_RIGHT:
        this.x=this.x+this.speed;
        break;
    case DIRECTION_LEFT:
        this.x=this.x-this.speed;
        break;
    case DIRECTION_UP:
        this.y=this.y-this.speed;
        break;
    case DIRECTION_BOTTOM:
        this.y=this.y+this.speed;
        break;    
}
    }
    checkCollision(){
let isCollided=false;
if(map[this.getMapy()][this.getMapX()]==1 || map[this.getMapyYRightSide()][this.getMapXRightSide()]==1 || )

    }
    checkGhostCollision(){

    }
    changeDirectionIfPossible(){

    }
    changeAnimation(){

    }
    draw(){

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

}