// take all input numbers buttons variable
let prevDisplay = document.querySelector("[data-previous-operand]");
let currentDisplay = document.querySelector("[data-current-operand]");

const numbers = [...document.querySelectorAll("[data-number]")];
const operand = [...document.querySelectorAll("[data-operation]")];
const clear = document.querySelector("[data-all-clear]");
const remove = document.querySelector("[data-delete]");
const result = document.querySelector("[data-equals]");

// Add all event listener
numbers.forEach((v) => {
	v.addEventListener("click", updateDisplay);
});

operand.forEach((v) => {
	v.addEventListener("click", addOperation);
});

result.addEventListener("click", finalResult);
clear.addEventListener("click", clearDisplay);
remove.addEventListener("click", deleteOne);
// End of event listeners

// Event Listeners functions
// For updating latest/current display
function updateDisplay(e) {
	currentDisplay.innerText += e.target.innerText;
}

// while click on +/-/*/÷
function addOperation(e) {
	console.log(e == "undefined");
	// this part is for when someone clicked - at first
	let currentNumber = currentDisplay.innerText;
	if (currentNumber.length == 0) {
		if (e.target.innerText == "-")
			currentDisplay.innerText += e.target.innerText;
		return;
	}
	/* In this part we calculate after each operation click and put the result and new clicked operation on small display called prevDisplay */
	// If this is our first operation click, no computation will happen
	if (prevDisplay.innerText == "") {
		prevDisplay.innerText =
			currentDisplay.innerText + " " + e.target.innerText;
		currentDisplay.innerText = "";
	} else {
		const operation = prevDisplay.innerText.split(" ")[1];
		const prev = prevDisplay.innerText.split(" ")[0];
		const current = currentDisplay.innerText;
		let res = compute(Number(prev), Number(current), operation);
		prevDisplay.innerText = res + " " + e.target.innerText;
		currentDisplay.innerText = "";
	}
}

// It will work on clicking equal buttons. But have to fulfilled the condition
function finalResult(e) {
	if (currentDisplay.innerText && prevDisplay.innerText) {
		const operation = prevDisplay.innerText.split(" ")[1];
		const prev = prevDisplay.innerText.split(" ")[0];
		const current = currentDisplay.innerText;
		let res = compute(Number(prev), Number(current), operation);
		currentDisplay.innerText = res;
		prevDisplay.innerText = "";
	}
}

// This is computation part. It will take arguments and return the result with a condition
function compute(prev, current, operand) {
	let res;
	switch (operand) {
		case "+":
			res = prev + current;
			break;
		case "-":
			res = prev - current;
			break;
		case "×":
			res = prev * current;
			break;
		case "÷":
			res = prev / current;
			break;
		default:
			break;
	}
	if (String(res).length > 16) return Number(res).toFixed(14);
	else return res;
}

// Clicking AC button, clear both current and prev
function clearDisplay() {
	prevDisplay.innerText = "";
	currentDisplay.innerText = "";
}

// Clicking delete button, it will only works on main display called currentDisplay
function deleteOne() {
	let arr = currentDisplay.innerText.split("");
	arr.pop();
	currentDisplay.innerText = arr.join("");
}

/////////////////
/////////////////
////////////////
// ////////////////

// const keyNums = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
// const keyOperand = ["+", "-", "*", "/"];

// window.addEventListener("keyup", keybutton);

// function keybutton(e) {
// 	if (keyNums.indexOf(e.key) != -1) {
// 		currentDisplay.innerText += e.key;
// 	} else if (keyOperand.indexOf(e.key) != -1) {
// 		addOperation();
// 	}
// }
