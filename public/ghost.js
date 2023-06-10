
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
         setInterval((()=>{
            this.changeRandomDirection();
         }),1000);
         
    }
    changeRandomDirection(){
        this.randomTargetIndex+=parseInt(Math.random()*4);
        this.randomTargetIndex=this.randomTargetIndex%4;
    }
isInRangeOfPacman(){
        let xDistance=Math.abs(pacman.getMapX()-this.getMapX());
        let yDistance=Math.abs(pacman.getMapy()-this.getMapy());
        if(Math.sqrt(xDistance*xDistance+yDistance*yDistance)<this.range){
            return true;
        }   return false;
    }
    
     moveProcess(){
        if(this.isInRangeOfPacman()){
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
let mp=[]
for(let i=0;i<map.length;i++){
    mp[i]=map[i].slice();
}
let queue =[
    {
        x:this.getMapX(),
        y:this.getMapy(),
        moves:[],
    }
];
while(queue.length>0){
    let poped=queue.shift();
    if(poped.x==x && poped.y==y){
        return poped.moves[0];
    }else{
        mp[poped.y][poped.x]=1;//marked visited 
        let neighbourList=this.addNeighbors(poped,mp);
        for(let i=0;i<neighbourList.length;i++){
            queue.push(neighbourList[i]);
        }

    }
}
 return DIRECTION_UP;}
 addNeighbors(poped, mp) {
    let queue = [];
    let numOfRows = mp.length;
    let numOfColumns = mp[0].length;

    if (
        poped.x - 1 >= 0 &&
        poped.x - 1 < numOfRows &&
        mp[poped.y][poped.x - 1] != 1
    ) {
        let tempMoves = poped.moves.slice();
        tempMoves.push(DIRECTION_LEFT);
        queue.push({ x: poped.x - 1, y: poped.y, moves: tempMoves });
    }
    if (
        poped.x + 1 >= 0 &&
        poped.x + 1 < numOfRows &&
        mp[poped.y][poped.x + 1] != 1
    ) {
        let tempMoves = poped.moves.slice();
        tempMoves.push(DIRECTION_RIGHT);
        queue.push({ x: poped.x + 1, y: poped.y, moves: tempMoves });
    }
    if (
        poped.y - 1 >= 0 &&
        poped.y - 1 < numOfColumns &&
        mp[poped.y - 1][poped.x] != 1
    ) {
        let tempMoves = poped.moves.slice();
        tempMoves.push(DIRECTION_UP);
        queue.push({ x: poped.x, y: poped.y - 1, moves: tempMoves });
    }
    if (
        poped.y + 1 >= 0 &&
        poped.y + 1 < numOfColumns &&
        mp[poped.y + 1][poped.x] != 1
    ) {
        let tempMoves = poped.moves.slice();
        tempMoves.push(DIRECTION_BOTTOM);
        queue.push({ x: poped.x, y: poped.y + 1, moves: tempMoves });
    }
    return queue;
}







    changeDirectionIfPossible(){
      let tempDirection=this.direction;
      this.direction= this.calculateNewDirection(
        map,
        parseInt(this.target.x/oneBlocksize),
        parseInt(this.target.y/oneBlocksize)

      );
      if(typeof this.direction=="undefined"){
        this.direction=tempDirection;
        return;
      }  
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
        context.beginPath();
        context.strokeStyle = "red";
        context.arc(this.x+oneBlocksize/2, this.y+oneBlocksize/2, this.range*oneBlocksize, 0, 2 * Math.PI);
        context.stroke();

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
