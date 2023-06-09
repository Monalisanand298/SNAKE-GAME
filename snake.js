let inputDir = { x: 0, y: 0 };
let score = 0;
let speed = 5;
let lasttime = 0;
let snakearray = [{ x: 10, y: 10 }
];

let food = { x: 13, y: 15 };

//high score
let highscore = localStorage.getItem("highscore");
if(highscore === null){
    highval = 0;
    localStorage.setItem("highscore", JSON.stringify(highval));
}
else{
    highval= JSON.parse(highscore);
    highscorebox.innerHTML = "HIGHEST SCORE: "+ highval;
}

//game lopp logic
//main logic

window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 } //start game
    //snake velocity is inputDir
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
});


//game function
function main(ctime) {
    window.requestAnimationFrame(main);

    if ((ctime - lasttime) / 1000 < 1 / speed) {
        return;
    }
    lasttime = ctime;
    gameEngine();
}

function gameEngine() {
    //part 1 updating the snake location & food
    if (isCollide(snakearray)) {
        inputDir = { x: 0, y: 0 };
        alert("GAME OVER. press any key to play again");
        snakearray = [{ x: 10, y: 10 }
        ];
        score = 0;
        scorebox.innerHTML = "SCORE: "+ score;
    }

    function isCollide(sarr) {
        // if snake collide with itself
        for(let i=1; i< snakearray.length;i++){
            if(sarr[i].x === sarr[0].x && sarr[i].y === sarr[0].y){
                return true;
            }
              
              
        }
        //if snake collide with wall
        if(sarr[0].x >= 20 || sarr[0].x <= 0 || sarr[0].y >= 20 || sarr[0].y <= 0){
            return true;
          }

  
    }

    //if u eat food 
    
    // regenerate the food
    if (snakearray[0].y === food.y && snakearray[0].x === food.x) {
        //increment the score
        score += 1;
        scorebox.innerHTML = "SCORE: "+ score;
        
        snakearray.unshift({ x: snakearray[0].x + inputDir.x, y: snakearray[0].y + inputDir.y });
        //unshift add elemnt in strting of array

        if(score > highval){
            localStorage.setItem("highscore",JSON.stringify(score));
            highscorebox.innerHTML = "HIGHEST SCORE: "+ score;

        }
       
        let a = 2;
        let b = 18;
        //to generate no btw 2 to 18 ..so food dnt come in border
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }

    //moving the snake
    // snake length - 1 is last box of snake.. snake length -2 is one box after last box of snake
    for (let i = snakearray.length - 2; i >= 0; i--) {
        //refrence problem if snakearray[i+1] = snakearray[i] ...sab ek ko point karne lag jaega
        snakearray[i + 1] = { ...snakearray[i] };
    }

    snakearray[0].x += inputDir.x;
    snakearray[0].y += inputDir.y;


    //part 2 display snake
    board.innerHTML = ""; //clean board
    snakearray.forEach((e, index) => {
        snakeelement = document.createElement('div');
        //vertical row h.. i.e y
        snakeelement.style.gridRowStart = e.y;
        snakeelement.style.gridColumnStart = e.x;
        snakeelement.classList.add('head');
        board.appendChild(snakeelement);
    });

    //display food
    foodelement = document.createElement('div');
    //vertical row h.. i.e y
    foodelement.style.gridRowStart = food.y;
    foodelement.style.gridColumnStart = food.x;
    foodelement.classList.add('food');
    board.appendChild(foodelement);
}