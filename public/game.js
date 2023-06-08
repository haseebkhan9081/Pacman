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
        }
     }
}
}