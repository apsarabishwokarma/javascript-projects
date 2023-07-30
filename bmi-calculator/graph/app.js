const gauge = new RadialGauge({
  renderTo: "bmiGauge",

  width: 600,
  height: 350,

  units: "BMI",

  minValue: 10,
  maxValue: 40,

  value: 20,

  majorTicks: ["10", "15", "18.5", "25", "30", "35", "40"],

  minorTicks: 2,

  strokeTicks: true,

  highlights: [
    {
      from: 10,
      to: 18.5,
      color: "#d62828",
    },
    {
      from: 18.5,
      to: 25,
      color: "#008c3a",
    },
    {
      from: 25,
      to: 30,
      color: "#f4d000",
    },
    {
      from: 30,
      to: 35,
      color: "#d67c7c",
    },
    {
      from: 35,
      to: 40,
      color: "#b30000",
    },
  ],

  colorPlate: "#fff",
  borderShadowWidth: 0,
  borders: false,

  needleType: "arrow",
  needleWidth: 3,
  needleCircleSize: 10,

  needleCircleOuter: true,
  needleCircleInner: false,

  animationDuration: 1500,
  animationRule: "linear",

  valueBox: true,

  valueTextShadow: false,
  colorMajorTicks: "#000",
  colorMinorTicks: "#666",

  colorNumbers: "#000",
  colorNeedle: "#555",
  colorNeedleEnd: "#555",
}).draw();

const bmiValue = document.getElementById("bmiValue");
const bmiStatus = document.getElementById("bmiStatus");

document.getElementById("calculateBtn").addEventListener("click", calculateBMI);

function calculateBMI() {
  const height = parseFloat(document.getElementById("height").value);

  const weight = parseFloat(document.getElementById("weight").value);

  if (!height || !weight || height <= 0 || weight <= 0) {
    alert("Please enter valid height and weight");
    return;
  }

  const heightMeter = height / 100;

  const bmi = weight / (heightMeter * heightMeter);

  const roundedBMI = bmi.toFixed(1);

  bmiValue.innerText = roundedBMI;

  gauge.value = roundedBMI;

  if (bmi < 18.5) {
    bmiStatus.innerText = "(Underweight)";
    bmiStatus.style.color = "#d62828";
  } else if (bmi < 25) {
    bmiStatus.innerText = "(Normal)";
    bmiStatus.style.color = "green";
  } else if (bmi < 30) {
    bmiStatus.innerText = "(Overweight)";
    bmiStatus.style.color = "#e0a800";
  } else {
    bmiStatus.innerText = "(Obesity)";
    bmiStatus.style.color = "#b30000";
  }
}
