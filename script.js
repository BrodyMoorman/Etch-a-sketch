const container = document.getElementById("grid-container");
let currentGridSize = 16;
let currentGridButton = document.querySelector(".dimbtn.active")
let colorMode = "black"
let selectedColor = "#ff0000";




makeRows(16);
createCellSelectors();
setActiveColor(document.getElementById("black"))
function createCellSelectors(){
const cells = document.querySelectorAll(".grid-item");

cells.forEach(cell => {
    cell.addEventListener("mouseover", (e)=>{
      
      if(colorMode === "rainbow"){
        let currentColor = generateRandomColor()
        e.target.style.backgroundColor = currentColor
      }
      if (colorMode === "black"){
        e.target.style.backgroundColor = "black"
      }
      if (colorMode === "color"){
        e.target.style.backgroundColor = selectedColor
      }
    })
    
});
}
const dimensionButtons = document.querySelectorAll(".dimbtn")
dimensionButtons.forEach(button => {
  button.addEventListener("click",(e)=>{
    const dimension = e.target.dataset.dimension;
    clearGrid();
    makeRows(dimension);
    createCellSelectors();
    currentGridSize = dimension;
    currentGridButton.classList.remove("active");
    e.target.classList.add("active");
    currentGridButton = e.target;
    

  })
})
const clearButton = document.getElementById("clear-btn");
clearButton.addEventListener("click",()=>{
  clearGrid();
  makeRows(currentGridSize);
  createCellSelectors();
})

const rainbowButton = document.getElementById("rainbow")
  rainbowButton.addEventListener("click",()=>{
    colorMode = "rainbow"
    setActiveColor(rainbowButton);
  });

const blackButton = document.getElementById("black")
blackButton.addEventListener("click",()=>{
  colorMode = "black"
  setActiveColor(blackButton);
  
})

const colorButton = document.getElementById("select-color")
colorButton.addEventListener("click", ()=>{
  colorMode = "color"
  setActiveColor(colorButton)
})

const colorWell = document.getElementById("color-well")
colorWell.addEventListener("input",(e)=>{
  selectedColor = e.target.value;
})

function generateRandomColor(){
  const randomColor = Math.floor(Math.random()*16777215).toString(16);
  return "#" + randomColor
}

function makeRows(length) {
  container.style.setProperty('--grid-rows', length);
  container.style.setProperty('--grid-cols', length);
  for (c = 0; c < (length * length); c++) {
    let cell = document.createElement("div");
    container.appendChild(cell).className = "grid-item";
  };
};

function clearGrid(){
  container.innerHTML = '';
}

function setActiveColor(activeButton){
  const colorButtons = document.querySelectorAll(".color-btn")
  colorButtons.forEach(button => {
    button.classList.remove("active")
  })
  activeButton.classList.add("active")
}