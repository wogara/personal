var numSquares = 6;

var colors = generateRandomColors(numSquares);
var colorDisplay = document.getElementById("colorDisplay");
var squares = document.querySelectorAll(".square");
var message = document.getElementById("message");
var pickedColor = pickColor();
var reset = document.getElementById("reset");
var h1 = document.querySelector("h1");
var modeButtons = document.querySelectorAll(".mode");
colorDisplay.textContent = pickedColor;


function resetFunc(){


	colors = generateRandomColors(numSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	for (var i = 0; i < squares.length;i++){
		if (colors[i]){
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		}else{
			squares[i].style.display = "none";
		}
		
	}

	message.textContent = "";
	reset.textContent = "new colors";
	h1.style.backgroundColor = "steelblue";

}


for (var i = 0; i < modeButtons.length;i++){
	modeButtons[i].addEventListener("click",function(){
		modeButtons[0].classList.remove("selected");
		modeButtons[1].classList.remove("selected");
		this.classList.add("selected");
		if (this.textContent === "easy"){
			console.log("here");
			numSquares = 3;
		}else{
			numSquares = 6;
		}
		resetFunc();
	})
}



// easy.addEventListener("click",function(){
// 	easy.classList.add("selected");
// 	hard.classList.remove("selected");
// 	numSquares = 3;
// 	colors = generateRandomColors(numSquares);
// 	pickedColor = pickColor();
// 	colorDisplay.textContent = pickedColor;
// 	for (var i = 0; i < squares.length;i++){
// 		if (colors[i]){
// 			squares[i].style.backgroundColor = colors[i];
// 		}else{
// 			squares[i].style.display = "none";
// 		}
// 	}
// })


// hard.addEventListener("click",function(){
// 	hard.classList.add("selected");
// 	easy.classList.remove("selected");
// 	numSquares = 6;
// 	colors = generateRandomColors(numSquares);
// 	pickedColor = pickColor();
// 	colorDisplay.textContent = pickedColor;
// 	for (var i = 0; i < squares.length;i++){
// 		squares[i].style.backgroundColor = colors[i];
// 		squares[i].style.display = "block";
// 	}
// })


reset.addEventListener("click",function(){
	// colors = generateRandomColors(numSquares);
	// pickedColor = pickColor();
	// colorDisplay.textContent = pickedColor;
	// for (var i = 0; i < squares.length;i++){
	// 	squares[i].style.backgroundColor = colors[i];
	// }
	// message.textContent = "";
	// reset.textContent = "new colors";
	resetFunc();
});

for (var i = 0; i < squares.length; i++){
	squares[i].style.backgroundColor = colors[i];
	squares[i].addEventListener("click",function(){
		var clickedColor = this.style.backgroundColor;
		if (clickedColor === pickedColor){
			message.textContent = "correct";
			changeColors(pickedColor);
			h1.style.backgroundColor = pickedColor;
			reset.textContent = "play again?";
		}else{
			message.textContent = "try again";
			this.style.backgroundColor = "#242424";
		}
	})
}

function changeColors(color){
	for (var i = 0; i < squares.length;i++){
		squares[i].style.backgroundColor = color;
	}
}

function pickColor(){
	var number = Math.floor(Math.random()*colors.length);
	return colors[number];
}

function generateRandomColors(x){
	var arr = [];

	for (var i = 0; i < x; i++){
		arr[i] = randomColor();
	}
	return arr;
}

function randomColor(){
	var r = Math.floor(Math.random()*256);
	var g = Math.floor(Math.random()*256);
	var b = Math.floor(Math.random()*256);
	return "rgb("+r+", "+g+", "+b+")";

}
