const container = document.getElementById("grid-container");
let currentGridSize = 16;
let currentGridButton = document.querySelector(".dimbtn.active")
let colorMode = "black"




makeRows(16);
createCellSelectors();
setActiveColor(document.getElementById("black"))
function createCellSelectors(){
const cells = document.querySelectorAll(".grid-item");

cells.forEach(cell => {
    cell.addEventListener("mouseover", (e)=>{
      let currentColor = generateRandomColor()
      if(colorMode === "rainbow"){
        e.target.style.backgroundColor = currentColor
      }
      if (colorMode === "black"){
        e.target.style.backgroundColor = "black"
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