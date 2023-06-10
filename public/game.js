const canvas=document.getElementById('canvas');
const context=canvas.getContext('2d');

const pacmanFrames=document.getElementById('animations');
const ghostFrames=document.getElementById('ghosts');
const eatSound=document.getElementById('eatSound');
const hitSound=document.getElementById('hitSound');
const gameOpening=document.getElementById('gameOpening');
const gameOverSound=document.getElementById('gameOverSound');
const gameWinSound=document.getElementById('gameWinSound');
 let creatRect=(x,y,width,height,color)=> {

    context.fillStyle=color;
    context.fillRect(x,y,width,height);
}

let pacman;
let oneBlocksize=20;
let wallColor="#342DCA"; // color
let wallSpaceWidth=oneBlocksize/1.6;
let wallOffset=(oneBlocksize-wallSpaceWidth)/2;
let wallInnerColor="black";
let foodColor="#FFFF00";
const DIRECTION_UP=4;
const DIRECTION_RIGHT=3;
const DIRECTION_LEFT=2;
const DIRECTION_BOTTOM=1; 
let score=0;
let ghostCount=4;
let ghosts=[];
let lives=3;
let foodCount=220;
let ghostImageLocations=[
    { x: 0, y: 0 },
    { x: 176, y: 0 },
    { x: 0, y: 121 },
    { x: 176, y: 121 },
];
let map=[
    [1,1,1,1,1, 1,1,1,1,1, 1,1,1,1,1, 1,1,1,1,1, 1],
    [1,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 1],
    [1,0,1,1,1, 0,1,1,1,0, 1,0,1,1,1, 0,1,1,1,0, 1],
    [1,0,1,1,1, 0,1,1,1,0, 1,0,1,1,1, 0,1,1,1,0, 1],
    [1,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 1], 
    [1,0,1,1,1, 0,1,0,1,1, 1,1,1,0,1, 0,1,1,1,0, 1],
    [1,0,0,0,0, 0,1,0,0,0, 1,0,0,0,1, 0,0,0,0,0, 1],
    [1,1,1,1,1, 0,1,1,1,0, 1,0,1,1,1, 0,1,1,1,1, 1],
    [2,2,2,2,1, 0,1,0,0,0, 0,0,0,0,1, 0,1,2,2,2, 2],
    [1,1,1,1,1, 0,1,0,1,1, 0,1,1,0,1, 0,1,1,1,1, 1],
    [1,0,0,0,0, 0,0,0,1,0, 0,0,1,0,0, 0,0,0,0,0, 1],
    [1,1,1,1,1, 0,1,0,1,0, 0,0,1,0,1, 0,1,1,1,1, 1],
    [2,2,2,2,1, 0,1,0,1,1, 1,1,1,0,1, 0,1,2,2,2, 2],
    [2,2,2,2,1, 0,1,0,0,0, 0,0,0,0,1, 0,1,2,2,2, 2],
    [1,1,1,1,1, 0,0,0,1,1, 1,1,1,0,0, 0,1,1,1,1, 1],
    [1,0,0,0,0, 0,0,0,0,0, 1,0,0,0,0, 0,0,0,0,0, 1],
    [1,0,1,1,1, 0,1,1,1,0, 1,0,1,1,1, 0,1,1,1,0, 1],
    [1,0,0,0,1, 0,0,0,0,0, 0,0,0,0,0, 0,1,0,0,0, 1],
    [1,1,0,0,1, 0,1,0,1,1, 1,1,1,0,1, 0,1,0,0,1, 1],
    [1,0,0,0,0, 0,1,0,0,0, 1,0,0,0,1, 0,0,0,0,0, 1],
    [1,0,1,1,1, 1,1,1,1,0, 1,0,1,1,1, 1,1,1,1,0, 1],
    [1,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 1],
    [1,1,1,1,1, 1,1,1,1,1, 1,1,1,1,1, 1,1,1,1,1, 1],
     
]
//
let randomTargetsForGhosts = [
    { x: 1 * oneBlocksize, y: 1 * oneBlocksize },
    { x: 1 * oneBlocksize, y: (map.length - 2) * oneBlocksize },
    { x: (map[0].length - 2) * oneBlocksize, y: oneBlocksize },
    {
        x: (map[0].length - 2) * oneBlocksize,
        y: (map.length - 2) * oneBlocksize,
    },
];

function update(){
    pacman.moveProcess();
    pacman.eat();
    for(let i=0;i<ghosts.length;i++){
        ghosts[i].moveProcess();
    }
    if(pacman.checkGhostCollision()){
       console.log("hit");
       
       hitSound.play();
       
       restartGame();

    }
    if(score>=foodCount){
        gameWinSound.play();
        drawWin();
    }
}
function drawWin(){
    context.font="30px emulogic";
    context.fillStyle="white";
    context.fillText("You Win! ",150,220);
}
function restartGame(){
    createNewPacman();
    createGhosts();
    
    lives--;
    if(lives==0){
        gameOverSound.play();
        clearInterval(gameInterval);
        drawGameOver();
    }}


    function drawGameOver(){
        context.font="30px emulogic";
        context.fillStyle="white";
        context.fillText("Game Over! ",150,220);
    }
function gameloop() {
     

    draw();
    update();
    
}
gameInterval=setInterval(gameloop,1000/60);
function drawLives(){
    context.font="30px emulogic";
    context.fillStyle="white";
    context.fillText("Lives: ",220,oneBlocksize*(map.length+1)+20);
    for(let i=0;i<lives;i++){
    context.drawImage(
        pacmanFrames,
        2*oneBlocksize,
        0,
        oneBlocksize,
        oneBlocksize,
        350+i*oneBlocksize,
        oneBlocksize*map.length+20,
        oneBlocksize,
        oneBlocksize

        )
    }
}

function drawFoods(){
    for(let i=0;i<map.length;i++){
   for(let j=0;j<map[i].length;j++){
    if(map[i][j]==0){
        creatRect(j*oneBlocksize+oneBlocksize/3,i*oneBlocksize+oneBlocksize/3,oneBlocksize/3,oneBlocksize/3,foodColor);
    }
   }}}

function drawScore(){
    context.font="30px emulogic";
    context.fillStyle="white";
    context.fillText("Score: "+score,0,(map.length+1)*oneBlocksize+oneBlocksize);
}
function drawGhost(){
    for(let i=0;i<ghosts.length;i++){
        ghosts[i].draw();
         
        
    }
}

function draw(){
    creatRect(0,0,canvas.width,canvas.height,"black");
    drawWalls();
    drawFoods();
    drawScore();
    drawLives();
    pacman.draw();
    drawGhost();
}

 

function drawWalls(){
    for(let i=0;i<map.length;i++){
     for(let j=0;j<map[i].length;j++){
        if(map[i][j]==1){
            //if  there is a 1 then it is a wall
    creatRect(j*oneBlocksize,i*oneBlocksize,oneBlocksize,oneBlocksize,wallColor);
         if (j > 0 && map[i][j - 1] == 1) {
        creatRect(
            j * oneBlocksize,
            i * oneBlocksize + wallOffset,
            wallSpaceWidth + wallOffset,
            wallSpaceWidth,
            wallInnerColor
        );
    }

    if (j < map[0].length - 1 && map[i][j + 1] == 1) {
        creatRect(
            j * oneBlocksize + wallOffset,
            i * oneBlocksize + wallOffset,
            wallSpaceWidth + wallOffset,
            wallSpaceWidth,
            wallInnerColor
        );
    }

    if (i < map.length - 1 && map[i + 1][j] == 1) {
        creatRect(
            j * oneBlocksize + wallOffset,
            i * oneBlocksize + wallOffset,
            wallSpaceWidth,
            wallSpaceWidth + wallOffset,
            wallInnerColor
        );
    }

    if (i > 0 && map[i - 1][j] == 1) {
        creatRect(
            j * oneBlocksize + wallOffset,
            i * oneBlocksize,
            wallSpaceWidth,
            wallSpaceWidth + wallOffset,
            wallInnerColor
        );
    }      
        }
     }
}
}
function createNewPacman(){
    pacman= new Pacman(oneBlocksize,oneBlocksize,oneBlocksize,oneBlocksize,oneBlocksize/8);
}

function createGhosts(){
    ghosts=[];
for(let i=0;i<ghostCount;i++){
    console.log("this is he loop");
    let newGhost = new Ghost( 
        9*oneBlocksize+(i%2==0?0:1)*oneBlocksize,
        10*oneBlocksize+(i%2==0?0:1)*oneBlocksize,
        oneBlocksize,oneBlocksize,pacman.speed/2,
        ghostImageLocations[i%4].x,
        ghostImageLocations[i%4].y,
        124,116,
        6+i
        );

        ghosts.push(newGhost);
console.log(ghosts);
}
}
gameOpening.play();
createNewPacman();
createGhosts();
 gameloop();
window.addEventListener('keydown',function(event){
let k=event.keyCode;
this.setTimeout(function(){
if(k==37||k==65){

    console.log(k);
    //left key
    pacman.nextDirection=DIRECTION_LEFT;
}else if(k==39||k==68){
    //right key
    pacman.nextDirection=DIRECTION_RIGHT;
}else if(k==38||k==87){
    //up key
    pacman.nextDirection=DIRECTION_UP;
}else if(k==40||k==83){
    //down key
    pacman.nextDirection=DIRECTION_BOTTOM;
}},1);
});