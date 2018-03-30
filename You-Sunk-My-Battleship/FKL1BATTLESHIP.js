//////////////////////////////////////////////
// Fransisca K Larasati - CS 1520 PROJECT 1 //
// 	YOU SUNK MY BATTLESHIP 		    //
//////////////////////////////////////////////

//Grid specifications:
var rows = 10;
var cols = 10;
var squareSize = 50;

//Creating Player 1's Gameboard:
var gameBoardContainer = document.getElementById("gameboard");

// Creating div elements for each grid square, assigning unique ids, and set grid's coordinates, and show it using CSS.

for (i = 0; i < cols; i++) {
	for (j = 0; j < rows; j++) {
		var square = document.createElement("div");
		gameBoardContainer.appendChild(square);

		square.id = 's' + j + i;

		var topPosition = j * squareSize;
		var leftPosition = i * squareSize;

		square.style.top = topPosition + 'px';
		square.style.left = leftPosition + 'px';
	}
}

//Creating Player 2's Gameboard:
var gameBoardContainer1 = document.getElementById("gameboard1");

// Creating div elements for each grid square, assigning unique ids, and set grid's coordinates, and show it using CSS.

for (f = 0; f < cols; f++) {
	for (k = 0; k < rows; k++) {
		var square1 = document.createElement("div");
		gameBoardContainer1.appendChild(square1);

		square1.id = 'v' + k + f;

		var topPosition1 = (k) * (squareSize);
		var leftPosition1 = (f) * (squareSize);

		square1.style.top = topPosition1 + 'px';
		square1.style.left = leftPosition1 + 'px';
	}
}

//Creating Player 1's Ships Location Board:
var gameBoardContainer2 = document.getElementById("gb1");

// Creating div elements for each grid square, assigning unique ids, and set grid's coordinates, and show it using CSS.

for (f = 0; f < cols; f++) {
	for (k = 0; k < rows; k++) {
		var square2 = document.createElement("div");
		gameBoardContainer2.appendChild(square2);

		square2.id = 't' + k + f;

		var topPosition2 = (k) * (squareSize);
		var leftPosition2 = (f) * (squareSize);

		square2.style.top = topPosition2 + 'px';
		square2.style.left = leftPosition2 + 'px';
	}
}

//Creating Player 2's Ships Location Board:
var gameBoardContainer3 = document.getElementById("gb2");

// Creating div elements for each grid square, assigning unique ids, and set grid's coordinates, and show it using CSS.

for (f = 0; f < cols; f++) {
	for (k = 0; k < rows; k++) {
		var square3 = document.createElement("div");
		gameBoardContainer3.appendChild(square3);

		square3.id = 'l' + k + f;

		var topPosition3 = (k) * (squareSize);
		var leftPosition3 = (f) * (squareSize);

		square3.style.top = topPosition3 + 'px';
		square3.style.left = leftPosition3 + 'px';
	}
}

var gameBoard = [
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0]
				]

var gameBoard1 = [
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0]
				]

var regex1 = /[ABS][:(][A-J][1-9]0?-[A-J][1-9]0?\)?;\s?[ABS][:(][A-J][1-9]0?-[A-J][1-9]0?\)?;\s?[ABS][:(][A-J][1-9]0?-[A-J][1-9]0?\)?;?\s*/;

var player1 = prompt("Please enter Player 1's name: ", "<Player 1's Name>");
var place11 = prompt("Hey, "+player1+"! Please enter your ship placement: ", "<Player 1's Ship Placement>");

if(place11.match(regex1))
{
	alert("Placement Valid");
}else
{
	alert("Placement Invalid, Try Again!");
	place11 = prompt("Hey, "+player1+"! Please enter your ship placement: ", "<Player 1's Ship Placement>");
}
var player2 = prompt("Please enter Player 2's name: ", "<Player 2's Name>");
var place22 = prompt("Hey, "+player2+"! Please enter your ship placement: "," <Player 2's Ship Placement>");
if(place22.match(regex1))
{
	alert("Placement Valid");
}else
{
	alert("Placement Invalid, Try Again!");
	place22 = prompt("Hey, "+player2+"! Please enter your ship placement: ", "<Player 2's Ship Placement>");
}

var place1 = place11.replace(/\s/g, "");
place1 = place1.replace(/\)/gi, "");

var place2 = place22.replace(/\s/g, "");
place2 = place2.replace(/\)/gi, "");

var nameholder1 = document.getElementById("P1name");
var nameholder2 = document.getElementById("P2name");
var nh1 = document.createElement('div');
var nh2 = document.createElement('div');
nh1.innerHTML = player1;
nh2.innerHTML = player2;
nameholder1.appendChild(nh1);
nameholder2.appendChild(nh2);

var p1score = parseInt(24);
var p2score = parseInt(24);
var winscore = 0;

var p1A = 5;
var p1B = 4;
var p1S = 3;
var p2A = 5;
var p2B = 4;
var p2S = 3;

//Putting Player 1's ships:
//SHIP A:
var WHICH = 0;
WHICH = 1;
var colA = place1.charAt(2);
var colB = place1.charAt(5);
var rowA = parseInt(place1.charAt(3))-1;
var rowB = parseInt(place1.charAt(6))-1;
change();
putShip();

//SHIP B:
WHICH = 2;
colA = place1.charAt(10);
colB = place1.charAt(13);
rowA = parseInt(place1.charAt(11))-1;
rowB = parseInt(place1.charAt(14))-1;
change();
putShip();

//SHIP S:
WHICH = 3;
colA = place1.charAt(18);
colB = place1.charAt(21);
rowA = parseInt(place1.charAt(19))-1;
rowB = parseInt(place1.charAt(22))-1;
change();
putShip();

alert(player1+"'s ships have been put!");

//Putting Player 2's ships:
//SHIP A:
WHICH = 1;
var colA = place2.charAt(2);
var colB = place2.charAt(5);
var rowA = parseInt(place2.charAt(3))-1;
var rowB = parseInt(place2.charAt(6))-1;
change();
putShip1();

//SHIP B:
WHICH = 2;
colA = place2.charAt(10);
colB = place2.charAt(13);
rowA = parseInt(place2.charAt(11))-1;
rowB = parseInt(place2.charAt(14))-1;
change();
putShip1();

//SHIP S:
WHICH = 3;
colA = place2.charAt(18);
colB = place2.charAt(21);
rowA = parseInt(place2.charAt(19))-1;
rowB = parseInt(place2.charAt(22))-1;
change();
putShip1();
alert(player2+"'s ships have been put!");

showShip();
showShip1();
playGame();

gameBoardContainer.addEventListener("click", userClick, false);
gameBoardContainer1.addEventListener("click", userClick1, false);

function playGame()
{
		var game = 0;
		var wait = false;
		var OK1 = confirm("Click OK to begin "+player1+"'s turn!");
		while(game != 1)
		{
			if(OK1 == true)
			{
				document.getElementById("gameboard").style.visibility = "hidden";
				document.getElementById("gameboard1").style.visibility = "visible";
				document.getElementById("gb1").style.visibility = "visible";
				document.getElementById("gb2").style.visibility = "hidden";
				game = 1;
			}
		}
}

function playGame1()
{
		var OK2 = confirm("Click OK to begin "+player2+"'s turn!");
		if(OK2 == true)
		{
			document.getElementById("gameboard").style.visibility = "visible";
			document.getElementById("gb2").style.visibility = "visible";
			document.getElementById("gameboard1").style.visibility = "hidden";
			document.getElementById("gb1").style.visibility = "hidden";
		}
}

function showShip()
{
		var c = document.getElementById("gb1").childNodes;
		for(i = 0; i < cols; i++)
		{
			for(j = 0; j < rows; j++)
			{
				if(gameBoard[j][i] == 1)
				{
					c[(j+1)+(i*10)].style.backgroundImage = "url('A.JPG')";
					c[(j+1)+(i*10)].style.backgroundSize = "50px 50px";
				}else if(gameBoard[j][i] == 4)
				{
					c[(j+1)+(i*10)].style.backgroundImage = "url('B.JPG')";
					c[(j+1)+(i*10)].style.backgroundSize = "50px 50px";
				}else if(gameBoard[j][i] == 5)
				{
					c[(j+1)+(i*10)].style.backgroundImage = "url('S.JPG')";
					c[(j+1)+(i*10)].style.backgroundSize = "50px 50px";
				}
			}
		}
}

function showShip1()
{
		var d = document.getElementById("gb2").childNodes;
		for(i = 0; i < cols; i++)
		{
			for(j = 0; j < rows; j++)
			{
				if(gameBoard1[j][i] == 1)
				{
					d[(j+1)+(i*10)].style.backgroundImage = "url('A.JPG')";
					d[(j+1)+(i*10)].style.backgroundSize = "50px 50px";
				}else if(gameBoard1[j][i] == 4)
				{
					d[(j+1)+(i*10)].style.backgroundImage = "url('B.JPG')";
					d[(j+1)+(i*10)].style.backgroundSize = "50px 50px";
				}else if(gameBoard1[j][i] == 5)
				{
					d[(j+1)+(i*10)].style.backgroundImage = "url('S.JPG')";
					d[(j+1)+(i*10)].style.backgroundSize = "50px 50px";
				}
			}
		}
}

function userClick(e)
{
	if (e.target !== e.currentTarget) {
		var row = e.target.id.substring(1,2);
		var col = e.target.id.substring(2,3);

		if (gameBoard[row][col] == 0) {
			e.target.style.background = 'white';
			gameBoard[row][col] = 3;
			alert("You missed!");
			playGame();
		} else if (gameBoard[row][col] == 1 || gameBoard[row][col] == 4 || gameBoard[row][col] == 5){
			if(gameBoard[row][col] == 1)
			{
				p1A -= 1;
			}else if(gameBoard[row][col] == 4)
			{
				p1B -= 1;
			}else if(gameBoard[row][col] == 5)
			{
				p1S -= 1;
			}
			if(p1A == 0)
			{
				alert(player1+"'s Aircraft has been sunk!");
				p1A = -1;
			}else if(p1B == 0)
			{
				alert(player1+"'s Battleship has been sunk!");
				p1B = -1;
			}else if(p1S == 0)
			{
				alert(player1+"'s Submarine has been sunk!");
				p1S = -1;
			}
			e.target.style.background = 'red';
			gameBoard[row][col] = 2;
			alert("You hit the ship!");
			p1score -= 2;
			alert(p1score);
			if(p1score == 0)
			{
				alert(player2+" has won the game! Score = "+p2score);
				winscore = p2score;
				localStorage.setItem(player2, p2score.toString());
				alert(localStorage.getItem(player2));
				var still = confirm("Click OK to play again!");
				if (still == false)
				{
					alert("Goodbye!");
					quit = 1;
				}
			}else
			{
				alert("interval");
				setTimeout(playGame(), 10000);
			}

		}
		    else if (gameBoard[row][col] == 2 || gameBoard[row][col] == 3){
			alert("You've clicked this already!");
			playGame();
		}
    }
    e.stopPropagation();
}

function userClick1(e)
{
	if (e.target !== e.currentTarget) {
		var row = e.target.id.substring(1,2);
		var col = e.target.id.substring(2,3);

		if (gameBoard1[row][col] == 0) {
			e.target.style.background = 'white';
			gameBoard1[row][col] = 3;
			alert("You missed!");
			playGame1();

		} else if (gameBoard1[row][col] == 1 || gameBoard1[row][col] == 4 || gameBoard1[row][col] == 5) {
			if(gameBoard1[row][col] == 1)
			{
				p2A -= 1;
			}else if(gameBoard1[row][col] == 4)
			{
				p2B -= 1;
			}else if(gameBoard1[row][col] == 5)
			{
				p2S -= 1;
			}
			if(p2A == 0)
			{
				alert(player2+"'s Aircraft has been sunk!");
				p2A = -1;
			}else if(p2B == 0)
			{
				alert(player2+"'s Battleship has been sunk!");
				p2B = -1;
			}else if(p2S == 0)
			{
				alert(player2+"'s Submarine has been sunk!");
				p2S = -1;
			}
			e.target.style.background = 'red';
			gameBoard1[row][col] = 2;
			alert("You hit the ship!");
			p2score -= 2;
			alert(p2score);
			if(p2score == 0)
			{
				alert(player1+" has won the game! Score = "+p1score);
				winscore = p1score;
				localStorage.setItem(player1, p1score.toString());
				alert(localStorage.getItem(player1));
				var still1 = confirm("Click OK to play again!");
				if (still1 == false)
				{
					alert("Goodbye!");
					quit = 1;
				}
			}else
			{
				playGame1();
			}
		}
		else if (gameBoard1[row][col] == 2 || gameBoard1[row][col] == 3){
			alert("You've clicked this already!");
			playGame1();

		}
    }
    e.stopPropagation();
}

function nothing()
{
		alert("here");
	for(sth = 0; sth < 100; sth++)
	{
	}
}
function putShip()
{
	if(colA == colB)
	{
		if(rowA < rowB)
		{
			for(i = 0; i <= rowB; i++)
			{
				if(WHICH == 1)
				{
					gameBoard[rowA+i][colA] = 1;
				}else if(WHICH == 2)
				{
					gameBoard[rowA+i][colA] = 4;
				}else if(WHICH == 3)
				{
					gameBoard[rowA+i][colA] = 5;
				}
			}
		}else if(rowB < rowA)
		{
			for(i = rowB; i >= 0; i--)
			{
				if(WHICH == 1)
				{
					gameBoard[rowA+i][colA] = 1;
				}else if(WHICH == 2)
				{
					gameBoard[rowA+i][colA] = 4;
				}else if(WHICH == 3)
				{
					gameBoard[rowA+i][colA] = 5;
				}
			}
		}
	}else if(rowA == rowB)
	{
		if(colA < colB)
		{
			for(i = 0; i < colB; i++)
			{
				if(WHICH == 1)
				{
					gameBoard[rowA][colA+i] = 1;
				}else if(WHICH == 2)
				{
					gameBoard[rowA][colA+i] = 4;
				}else if(WHICH == 3)
				{
					gameBoard[rowA][colA+i] = 5;
				}
			}
		}else if(colB < colA)
		{
			var di = colA - colB;
			for(i = 0; i < colA; i++)
			{
				if(WHICH == 1)
				{
					gameBoard[rowA][colB+i] = 1;
				}else if(WHICH == 2)
				{
					gameBoard[rowA][colB+i] = 4;
				}else if(WHICH == 3)
				{
					gameBoard[rowA][colB+i] = 5;
				}
			}
		}
	}else if(colA != colB && rowA != rowB)
	{
		var Cstart = 0;
		var Cend = 0;
		var Rstart = 0;
		var Rend = 0;

		if(colA < colB)
		{
			Cstart = colA;
			Cend = colB;
		}else
		{
			Cstart = colB;
			Cend = colA;
		}
		if(rowA < rowB)
		{
			Rstart = rowA;
			Rend = rowB;
		}else
		{
			Rstart = rowB;
			Rend = rowA;
		}
		var dif = Cend-Cstart;
		alert(Cstart);
		alert(Cend);
		alert(Rstart);
		alert(Rend);
		for(i = 0; i <= dif; i++)
		{
			if(WHICH == 1)
			{
				gameBoard[Rstart+i][Cstart+i] = 1;
			}else if(WHICH == 1)
			{
				gameBoard[Rstart+i][Cstart+i] = 4;
			}else if(WHICH == 1)
			{
				gameBoard[Rstart+i][Cstart+i] = 5;
			}
		}
	}
}

function putShip1()
{
	if(colA == colB)
	{
		if(rowA < rowB)
		{
			for(i = 0; i <= rowB; i++)
			{
				if(WHICH == 1)
				{
					gameBoard1[rowA+i][colA] = 1;
				}else if(WHICH == 2)
				{
					gameBoard1[rowA+i][colA] = 4;
				}else if(WHICH == 3)
				{
					gameBoard1[rowA+i][colA] = 5;
				}
			}
		}else if(rowB < rowA)
		{
			for(i = rowB; i >= 0; i--)
			{
				if(WHICH == 1)
				{
					gameBoard1[rowA+i][colA] = 1;
				}else if(WHICH == 2)
				{
					gameBoard1[rowA+i][colA] = 4;
				}else if(WHICH == 3)
				{
					gameBoard1[rowA+i][colA] = 5;
				}
			}
		}
	}else if(rowA == rowB)
	{
		if(colA < colB)
		{
			for(i = 0; i < colB; i++)
			{
				if(WHICH == 1)
				{
					gameBoard1[rowA][colA+i] = 1;
				}else if(WHICH == 2)
				{
					gameBoard1[rowA][colA+i] = 4;
				}else if(WHICH == 3)
				{
					gameBoard1[rowA][colA+i] = 5;
				}
			}
		}else if(colB < colA)
		{
			var di = colA - colB;
			//for(i = di; i > 0; i--)
			for(i = 0; i < colA; i++)
			{
				if(WHICH == 1)
				{
					gameBoard1[rowA][colB+i] = 1;
				}else if(WHICH == 2)
				{
					gameBoard1[rowA][colB+i] = 4;
				}else if(WHICH == 3)
				{
					gameBoard1[rowA][colB+i] = 5;
				}
			}
		}
	}else if(colA != colB && rowA != rowB)
	{
		alert("TIDAK SAMA");
		var Cstart = 0;
		var Cend = 0;
		var Rstart = 0;
		var Rend = 0;

		if(colA < colB)
		{
			Cstart = colA;
			Cend = colB;
		}else
		{
			Cstart = colB;
			Cend = colA;
		}
		if(rowA < rowB)
		{
			Rstart = rowA;
			Rend = rowB;
		}else
		{
			Rstart = rowB;
			Rend = rowA;
		}
		var dif = Cend-Cstart;
		alert(Cstart);
		alert(Cend);
		alert(Rstart);
		alert(Rend);
		for(i = 0; i <= dif; i++)
		{
			if(WHICH == 1)
			{
				gameBoard1[Rstart+i][Cstart+i] = 1;
			}else if(WHICH == 1)
			{
				gameBoard1[Rstart+i][Cstart+i] = 4;
			}else if(WHICH == 1)
			{
				gameBoard1[Rstart+i][Cstart+i] = 5;
			}
		}
	}
}

function change() {
//COL A:
	if(colA == 'A'){
	   colA = parseInt('0');
	}else if(colA == 'B'){
	   colA = parseInt('1');
	}else if(colA == 'C'){
	   colA = parseInt('2');
	}else if(colA == 'D'){
	   colA = parseInt('3');
	}else if(colA == 'E'){
	   colA = parseInt('4');
	}else if(colA == 'F'){
	   colA = parseInt('5');
	}else if(colA == 'G'){
	   colA = parseInt('6');
	}else if(colA == 'H'){
	   colA = parseInt('7');
	}else if(colA == 'I'){
	   colA = parseInt('8');
	}else if(colA == 'J'){
	   colA = parseInt('9');
	}

//COL B:
	if(colB == 'A') {
	   colB = parseInt('0');
	}else if(colB == 'B'){
	   colB = parseInt('1');
	}else if(colB == 'C'){
	   colB = parseInt('2');
	}else if(colB == 'D'){
	   colB = parseInt('3');
	}else if(colB == 'E'){
	   colB = parseInt('4');
	}else if(colB == 'F'){
	   colB = parseInt('5');
	}else if(colB == 'G'){
	   colB = parseInt('6');
	}else if(colB == 'H'){
	   colB = parseInt('7');
	}else if(colB == 'I'){
	   colB = parseInt('8');
	}else if(colB == 'J'){
	   colB = parseInt('9');
	}
}
