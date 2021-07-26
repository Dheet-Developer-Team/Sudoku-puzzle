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
    //Add event listener to each number in number container 
    for(let i=0;i<id("number-container").children.length;i++){
        id("number-container").children[i].addEventListener("click",function(){
            //If selecting is not desabled
            if(!disableSelect){
                //If number is alreasy selected
                if(this.classList.contains("selected")){
                    //Then remove this selection
                    this.classList.remove("selected");
                    selectedNum = null;
                }else{
                    //Dselect all other numbers
                    for(let i=0;i<9;i++){
                        id("number-container").children[i].classList.remove('selested');
                    }
                    //Selected it and selected updated num variable
                    this.classList.add("selected");
                    selectedNum = this;
                    updateMove();
                }
            }
        })
    }
}

function startGame(){
    // Choose levels
    let board;
    if(id('diff-1').checked) board = easy[0];
    else if(id('diff-2').checked) board = medium[0];
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
         // adding click event listner
         tile.addEventListener("click",function(){
            //If selecting is not desabled
            if(!disableSelect){
                //If the tile is already selected
                if(tile.classList.contains("selected")){
                    //Then remove the selection
                    tile.classList.remove("selected");
                    selectedTile = null;
                }else{
                    //Deselected all other tiles for 
                    for(let i=0;i<81;i++){
                        qsa(".tile")[i].classList.remove('selected');
                    }
                    //Add selection & updated variable 
                    tile.classList.add("selected");
                    selectedTile = tile;
                    updateMove()
                }
            }
         });
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

function updateMove(){
    //If a tile and the number is selected
    if(selectedTile && selectedTile){
        //Set the to the currect number
        selectedTile.textContent = selectedNum.textContent;
        //If the number matches the curresponding key in the selected number
        if(checkCorrect(selectedTile)){
            //Deselect the tiles 
            selectedTile.classList.remove("selected");
            selectedNum.classList.remove("selected");
            //clear the selected variable
            selectedNum = null;
            selectedTile = null;
            //if the number is not match the sollutin key
        }else{
            //Desable selectiing the new number
            disableSelect = true;
            //Make the tile return red
            selectedTile.classList.add("incorrect");
            //Run in one second
            setTimeout(function() {
                //subtract lives one
                lives--;
                //if no livs is left
                if(lives === 0) {endGame();}
                else{
                    //if lives is not equal to 0
                    //update
                    id("lives").textContent = "Lives Remaining: +lives";
                    //Renable selecting numbers
                    disableSelect = false;
                }
                //Restore tile color remove selected from both
                selectedTile.classList.remove("incorrect");
                selectedTile.classList.remove("selected");
                selectedNum.classList.remove("selected");
                //clear the tiles and clear selected variables variables
                selectedTile.textContent = "";
                selectedTile = null;
                selectedNum = null;
            }, 1000);
        }
    }
}

function endGame(){
    //Desable moves and stop the timer
    disableSelect =  true;
    clearTimeout(timer);
    //display win or loss message
    if(lives === 0 || timeRemaining === 0){
      id("lives").textContent = "You Lost The Game !";
    }else{
        id("lives").textContent = "You Won The Game !";
    }
}

function checkCorrect(tile){
    //Set sollution select in difficulty selection
    let solution;
    if(id('diff-1').checked) solution = easy[1];
    else if(id('diff-2').checked) solution = medium[1];
    else  solution = hard[1];
    //if tiles number is equalto solution's number
    if(solution.charAt(tile.id)===tile.textContent) return true;
    else return false;
}

function clearPrevious(){
    // access all of the tiles
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