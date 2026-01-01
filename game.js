// btns class, flex posistion, improve switch function

var drawboard = document.getElementById('tictactoe'),
    winnerset = document.getElementById('winnerset').children,
    gameBoard = document.getElementById('board'),
    play = document.getElementById('play'),
    winner = document.getElementById('winner'),
    res = document.getElementById('reset'),
    tiles = document.getElementsByClassName('tile'),
    signs = document.getElementsByClassName('sign'),
    opponent = document.getElementById("opponent"),
    settings = document.getElementById("settings"),
    humvscomp = document.getElementById("humvscomp"),
    xvso = document.getElementById("xvso"),
    options = document.getElementsByClassName("options"),
    btns = document.getElementsByClassName('btn'),
    sets = document.getElementsByClassName('sets'),
    welcome = document.getElementsByClassName('welcome'),
    chooses = document.getElementsByClassName('chooses'),
    destiny = document.getElementsByClassName('destiny'),
    human,
    computer,
    humVal,
    comVal,
    palyer1,
    player2,
    player1val,
    player2val,
    game,
    board = [0,0,0,0,0,0,0,0,0],
    round = 0,
    winningBoard = [
       [0, 1, 2], [3,4,5], [0,3,6],
       [6,7,8], [1,4,7], [2,5,8],
       [0,4,8], [2,4,6]     
    ];

HTMLElement.prototype.addClass = function(el) {
  this.classList.add(el);
}
HTMLElement.prototype.removeClass = function(el) {
  this.classList.remove(el);
}

function drawingWithDelay(element, newTime, newDelay) {    
  var time = newTime;
  if (element.hasChildNodes())  {                            
     var delay = 0,                                          
     child = element.childNodes;
     for(var d=0; d<child.length; d++) {                          
         if(child[d].nodeType == 1) {
          var length = Math.ceil(child[d].getTotalLength());
          child[d].style.strokeDasharray = length;
          child[d].style.strokeDashoffset = length;
          child[d].style.animation = 'dash '+time+'s ease-out  '+delay+ 's   forwards';
          delay +=  newDelay;
         }
      }
   } else {
      var length = Math.ceil(element.getTotalLength());
      element.style.strokeDasharray = length;
      element.style.strokeDashoffset = length;
      element.style.animation = 'dash 0.5s ease-out  forwards';
     }
}

function setPlayer(signNumber) {                        
    if (player1) {    
       board[signNumber] = player1val;
       var sign =  document.getElementById(player1val+signNumber); 
       drawingWithDelay(sign, 0.3, 0.3)                         
       updateScore(board, player1);
       player1 = false;
       player2 = true;
    } else {
       board[signNumber] = player2val;
       var sign =  document.getElementById(player2val+signNumber);
       drawingWithDelay(sign, 0.3, 0.3)
       updateScore(board, player2);
       player1 = true;
       player2 = false;   
    }
}

function set(index, player) { 
    if(game) {
       if(board[index] == 0) {
           if (computer) {
               if(player == human) {
                var sign =  document.getElementById(humVal+index);
                drawingWithDelay(sign, 0.3, 0.3);
                board[index] = humVal;
                updateScore(board, player);
                ai(); 
             }  else {
                board[index] = comVal;
                var sign =  document.getElementById(comVal+index);
                setTimeout(function() {
                  drawingWithDelay(sign, 0.3, 0.3);
                  }, 500);
                updateScore(board, player);  
                }
            }
        }
      }
}

function updateScore(board, player) {
if (computer) {
   if (player == computer) {
      if (checkWin(board, player)) {
        game = false;
        setTimeout(function() {
        drawTheWinnersLine(board); 
        winner.innerHTML ="<h1>You loose !</h1>";
        }, 1400);
      return;
      }
     }
   else if (player = human){
   if (player == human) {
      if (checkWin(board, player)) {
         game = false;
         drawTheWinnersLine(board);
         setTimeout(function() {
         winner.innerHTML ="<h1>You won !</h1>";
         }, 1000);
      return;
        }
      }
   }
}
else if (human){
    if (player == player1) {
      if (checkWin(board, player)) {
      game = false;
      drawTheWinnersLine(board); 
      setTimeout(function() {
      winner.innerHTML ="<h1>player1 won !</h1>";
        }, 1000);
      return;
      }
    }  else {
      if (checkWin(board, player)) {
         game = false;
         drawTheWinnersLine(board); 
         setTimeout(function() {
         winner.innerHTML ="<h1>player2 won !</h1>";
        }, 1000);
        return;
      }
    }
  }
  if (checkBoard(board)) {
      setTimeout(function() {
       winner.innerHTML= "<h1>Tie !</h1>";
      }, 1000);
      return;
  }
}

function drawTheWinnersLine(board) {
 for (var x = 0; x < 8; x++ ) {
    var arr=[];
    for (var y=0; y<3; y++) {
       arr.push(board[winningBoard[x][y]])   
    }
    var equals = arr.every(function(value, index, array){
    return (value === array[0] && isNaN(value) ) ? true : false});
    if (equals) {
      drawingWithDelay(winnerset[x], 1, 1)
    }
  }
}
 
function checkWin(board,player) {
  var value
  if (computer) {
  value = player == human ? humVal : comVal;
  }
  else if (human) {
  value = player == player1 ? player1val : player2val;
  }
  for (var x = 0; x < 8; x++ ) {
    var win = true;
    for(var y=0; y<3; y++) {
       if(board[winningBoard[x][y]] !=value)  {
         win = false;
         break;
       }
    }
    if(win) {
      return true;
    }
  }
  return false;
}

function checkBoard (board) {
for (var i = 0; i<board.length; i++) {
    if (board[i] == 0) {
      return false;
    }  
  }
return true;
}

for (var i=0; i < tiles.length; i++) {
tiles[i].addEventListener('click', claim);
}

function claim() {
  var i = Array.prototype.indexOf.call(tiles, this);
  if(game) { 
     if(board[i] == 0) {           
       if (human) {      
         setPlayer(i);
       }
       else if (computer) {
              set(i, human); 
              }
            }
          }
        }

function switchClass (elementsToHide, elementsToShow) {
for (var i =0; i< elementsToHide.length; i++){
   elementsToHide[i].addClass('disable');
}
  for (var j =0; j< elementsToShow.length; j++){
    if (j===0) {
     elementsToShow[j].addClass('fadeBounceIn');
    }
     if ( j > 0) {
       elementsToShow[j].addClass('fadeIn');
     }
       elementsToShow[j].removeClass('disable'); 
      }
}

switchClass (sets, welcome);
for (var i =0; i< btns.length ; i++){
   btns[i].addEventListener('click', function () {
    var elemnt = this.id;
    choose(elemnt);
   });
}

function choose(id) {
   if (id == 'play') {
   switchClass (sets, chooses);
   }
  else if (id == 'reset') {
   reset(); 
  }
else if (id == 'human') {
   human = true;
   computer = false;
   switchClass (sets, destiny);
}
else if (id == 'computer') {
   human = false;
   computer = true;
   switchClass (sets, destiny);
}
  else if (computer) {
    if (id == 'o' || id == 'x') {
      if (id == 'x') {
        humVal = 'x'
        comVal = 'o'
      }
      else {
        humVal = 'o'
        comVal = 'x'
      }  
      game = true;
      startGame();
    }  
  }
  else if (human){
    if (id == 'o' || id == 'x') {
      if (id == 'x') {
        player1val = 'x';
        player2val = 'o';   
    } else   {
      player2val = 'x';
      player1val = 'o';
    }
  }
    game = true;
    startGame();
  }
}

function startGame() {
  settings.addClass('disable');
  gameBoard.removeClass('disable');
  drawingWithDelay(drawboard, 0.5, 0.5);
  player1 = true;
}

function reset() {
  window.location = window.location;
  round = 0;
  for(var x= 0; x<9 ;x++) {
    board[x] = 0;
  }
  game = false;
}

function ai() {
  if (game) {
    var obj = minimax(board, 0 , computer);
  }
}

function minimax(actualBoard, depth, player) {
       if(checkWin(actualBoard, computer)) {
       return 10 - depth ;     
     } 
    else if(checkWin(actualBoard, human)) {
       return -10 + depth ;
     } 
   else if (checkBoard(actualBoard)) {
    return 0;
   }

  var max;
  if (player) {
    max = -Infinity
  }
  else{
  max = Infinity
  }
  var index = 0;

  for (var i =0; i<actualBoard.length; i++) {
      var copyBoard = actualBoard.slice();
      if(copyBoard[i] == 0) {
           var value = player == computer ? comVal : humVal ;
           copyBoard[i] = value;
           var minmaxScore = minimax(copyBoard, depth + 1, !player)
           if(player) {
              if(minmaxScore > max) {
                max = minmaxScore;
                index = i;
              }
           }
           else {
             if(minmaxScore < max) {
             max = minmaxScore;
             index = i;
             }
           }
           
    }
  }
  
 if (depth == 0) {
   set(index, computer);
 }
 return max;
}
