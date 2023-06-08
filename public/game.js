const canvas=document.getElementById('canvas');
const context=canvas.getContext('2d');

const pacmanFrames=document.getElementById('animations');
const ghostFrames=document.getElementById('ghosts');

let creatRect=(x,y,width,height,color)=> {

    context.fillStyle=color;
    context.fillRect(x,y,width,height);
}
let oneBlocksize=20;
let wallColor="#342DCA"; // color
let wallSpaceWidth=oneBlocksize/1.6;
let wallOffset=(oneBlocksize-wallSpaceWidth)/2;
let wallInnerColor="black";
const DIRECTION_UP=4;
const DIRECTION_RIGHT=3;
const DIRECTION_LEFT=2;
const DIRECTION_BOTTOM=1; 
let map=[
    [1,1,1,1,1, 1,1,1,1,1, 1,1,1,1,1, 1,1,1,1,1, 1],
    [1,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 1],
    [1,0,1,1,1, 0,1,1,1,0, 1,0,1,1,1, 0,1,1,1,0, 1],
    [1,0,1,1,1, 0,1,1,1,0, 1,0,1,1,1, 0,1,1,1,0, 1],
    [1,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 1], 
    [1,0,1,1,1, 0,1,0,1,1, 1,1,1,0,1, 0,1,1,1,0, 1],
    [1,0,0,0,0, 0,1,0,0,0, 1,0,0,0,1, 0,0,0,0,0, 1],
    [1,1,1,1,1, 0,1,1,1,0, 1,0,1,1,1, 0,1,1,1,1, 1],
    [0,0,0,0,1, 0,1,0,0,0, 0,0,0,0,1, 0,1,0,0,0, 0],
    [1,1,1,1,1, 0,1,0,1,1, 0,1,1,0,1, 0,1,1,1,1, 1],
    [0,0,0,0,0, 0,0,0,1,0, 0,0,1,0,0, 0,0,0,0,0, 0],
    [1,1,1,1,1, 0,1,0,1,0, 0,0,1,0,1, 0,1,1,1,1, 1],
    [0,0,0,0,1, 0,1,0,1,1, 1,1,1,0,1, 0,1,0,0,0, 0],
    [0,0,0,0,1, 0,1,0,0,0, 0,0,0,0,1, 0,1,0,0,0, 0],
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

 let gameloop=()=>{

    update();
    draw();
}

function update(){

}

function draw(){
    creatRect(0,0,canvas.width,canvas.height,"black");
    drawWalls();
}

let gameInterval=setInterval(gameloop,1000/60);
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