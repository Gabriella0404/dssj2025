const range = document.getElementById("age-range");
const output = document.getElementById("age-value");
// range points to input while output points to the floating value for the slider//
//Live update function ->//
function updateOutput() {
  const min = parseInt(range.min);
  const max = parseInt(range.max);
  const val = parseInt(range.value);
  //live update output age//
  output.textContent = val;
  const percent = (val - min) / (max - min);
  const offset = percent * range.offsetWidth; //To convert the value percentage into a position relative to the sliders width//
  output.style.left = `${offset}px`
  //To move the output bubble horizontally//
}
range.addEventListener('input', updateOutput);
updateOutput();

