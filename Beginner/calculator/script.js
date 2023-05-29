const literalsEls = document.getElementsByClassName("literals");
const expressionEl = document.getElementById("expression");
const equalEl = document.querySelector(".equal"); // queryselector takes only one element
const solutionEl = document.querySelector(".solution");
const reset = document.querySelector(".reset");
const clear = document.querySelector(".clear");

for (var i = 0; i < literalsEls.length; i++) {
  literalsEls[i].addEventListener("click", (e) => {
    const el = e.target; //assigns the event target (the element that was clicked) to the constant variable el.
    expressionEl.value += el.innerHTML; // expressionEl.value = expressionEl.value+el.innerHTMl it appends
    //we don't use innerHTML for input tag(<input/>)
  });
}

function calculateSolution() {
  const expressions = expressionEl.value
    .replaceAll("×", "*")
    .replaceAll("−", "-")
    .replaceAll("•", ".");
  const solution = eval(expressions);

  solutionEl.innerHTML = Number.isInteger(solution)
    ? solution.toFixed(0)
    : solution.toFixed(2); //evaluate math expression & display 2 digit after decimal
  expressionEl.value = solutionEl.innerHTML;
}
equalEl.addEventListener("click", calculateSolution);
reset.addEventListener("click", () => {
  expressionEl.value = "";
  solutionEl.innerHTML = "";
});
clear.addEventListener("click", () => {
  expressionEl.value = expressionEl.value.slice(0, -1);
  //The slice() method extracts a section of a string and returns it as a new string,
  //the numbers 0 and -1 represent the start and stop positions
});
