// going to make board manuallly

const easy = [
  "6------7------5-2------1---362----81--96-----71--9-4-5-2---651---78----345-------",
  "685329174971485326234761859362574981549618732718293465823946517197852643456137298"
];
const medium = [
  "--9-------4----6-758-31----15--4-36-------4-8----9-------75----3-------1--2--3--",
  "619472583243985617587316924158247369926531478734698152891754236365829741472163895"
];
const hard = [
  "-1-5-------97-42----5----7-5---3---7-6--2-41---8--5---1-4------2-3-----9-7----8--",
  "712583694639714258845269173521436987367928415498175326184697532253841769976352841"
];


// variables

var timer;
var timeRemaining;
var lives;
var selectedNum;
var selectedTile;
var disableSelect;

window.onload =function(){
    // after button start is clicked
    id("start-btn").addEventListener("click",startGame);
}

function startGame(){
    // Choose levels
    let board;
    if(id('diff-1').checked) board = easy[0];
    else if(id('diff-1').checked) board = medium[0];
    else  board = hard[0];

    // set live to 3 and enable selecting numbers and tiles
    lives = 3;
    disableSelect = false;
    id("lives").textContent = "lives remaining: 3";
    // Create board based on difficulty 
    generateBoard(board);
    //timer
    startTimer();

    //sets theme

    if(id("theme-1").checked){
        qs("body").classList.remove("dark");
    }else{
        qs("body").classList.add("dark");
    }

    // show number container

    id("number-container").classList.remove("hidden");
}

function startTimer(){
    if(id("time-1").checked) timeRemaining  = 180;
    else if(id("time-2").checked) timeRemaining =300;
    else timeRemaining = 600;

    id("timer").textContent = timeConversion(timeRemaining);

    timer = setInterval(function(){
        timeRemaining--;
        if(timeRemaining === 0) endGame();
        id("timer").textContent = timeConversion(timeRemaining);
    },1000)
}

function timeConversion(time) {
    let minutes = Math.floor(time/60);
    if(minutes < 10) minutes = "0" + minutes;
    let seconds = time % 60;
    if(seconds < 10) seconds = "0" + seconds;
    return minutes + ":" + seconds;
    
}

function generateBoard(board){
 // clear previouse board
 clearPrevious();
 // let used to increament tile id

 let idCount = 0;

 // create 9*9 tiles

 for(let i=0; i< 81; i++){
     // create a new paragraph
     let tile = document.createElement("p");
     // if the tile is not supposed to be blank
     if(board.charAt(i) != "-"){
         tile.textContent = board.charAt(i);
     }else{
         // adding event listner
     }
     // assign tile id
     tile.id = idCount;

     // increament next tile
     idCount++;

     // add tile class to all tiles

     tile.classList.add("tile");

     if((tile.id> 17 && tile.id < 27) || (tile.id > 44 & tile.id < 54)){
         tile.classList.add("bottomBorder");
     }
     if((tile.id+1) % 9 == 3 || (tile.id+1) % 9 ==6){
         tile.classList.add("rightBorder");
     }
     // finally adding tile to board

     id("board").appendChild(tile);
 }
}

function clearPrevious(){
    // access all tiles
    let tiles = qsa(".tile");
    tiles.forEach((data)=>{
       data.remove();
    });

    // clearing the timer
    if(timer) clearTimeout(timer);
    // Deselect any numbers
    for(let i=0; i<id("number-container").children.length;i++){
        id("number-container").children[i].classList.remove("selected");
    }
    // clear selected variables
    selectedTile = null;
    selectedNum = null;

}


// abbreavations for functions
function id(id) {
    return document.getElementById(id);
}

function qsa(selector){
    return document.querySelectorAll(selector);

}

function qs(selector){
    return document.querySelector(selector);

}