let DEFAULT_COLOR = "#505050";

let MODE = "brush";

var slider = document.getElementById('myRange');
var gridSize = document.getElementById('size');
let grid = document.getElementById('grid');
gridSize.textContent = `${slider.value*4}x${slider.value*4}`;

const btnbrush = document.getElementById('brush');
const btnmagic = document.getElementById('magic');
const btnfill = document.getElementById('fill');
const btneraise = document.getElementById('eraise');
const toggleButtonsArray = [ btnbrush, btnmagic, btnfill, btneraise ]

let mouseDown = false;
document.body.onmouseup = () => (mouseDown = false);
document.body.onmouseleave = () => (mouseDown = false);
document.body.onmousedown = () => (mouseDown = true);

let gridArray = [];
const btngridtoggle = document.getElementById('toggle-grid');
btngridtoggle.onclick = () => toggleGridView(gridArray);

const colorInput = document.getElementById('color-input');
colorInput.value = "#FFFFFF"
colorInput.onchange = () => changeColor(colorInput.value);

const btnclear = document.getElementById('clear');
btnclear.onclick = () => createGrid(slider.value*4);

let pickingColor = false;
const btncolorpick = document.getElementById('pick');
btncolorpick.onclick = () => pickingColorToggle();

let currentColor = colorInput.value;

function changeColor(value){
    switch (MODE) {
        case 'eraise':
            currentColor = DEFAULT_COLOR;
            break;
        case 'brush':
            currentColor = value;
            break;
        case 'fill':
            currentColor = value;
            break;
        case 'magic':
            currentColor = randomColor();
            break;
    }
}

function toggleGridView(gridArray){
    btngridtoggle.classList.contains('active') ? btngridtoggle.classList.remove('active') : btngridtoggle.classList.add('active')
    gridArray.forEach(element => {
        btngridtoggle.classList.contains('active') ? element.style.border="1px solid #d9d9d9" : element.style.border="0px";
    });
}

function clearGrid(){
    grid.innerHTML = '';
    gridArray = [];
}

function fill(array){
    array.forEach(element => {
        element.style.backgroundColor = currentColor;
    });
}

function convertRgbToHex(rgb) {
    var separator = rgb.indexOf(",") > -1 ? "," : " ";

    rgb = rgb.substr(4).split(")")[0].split(separator);
  
    var r = (+rgb[0]).toString(16),
      g = (+rgb[1]).toString(16),
      b = (+rgb[2]).toString(16);
  
    if (r.length == 1)
      r = "0" + r;
    if (g.length == 1)
      g = "0" + g;
    if (b.length == 1)
      b = "0" + b;
  
    return "#" + r + g + b;
  }

function randomColor(){
    return "#" + Math.floor(Math.random()*16777215).toString(16);
}

function pickingColorToggle(){
    pickingColor = !pickingColor;
    btncolorpick.classList.contains('active') ? btncolorpick.classList.remove('active') : btncolorpick.classList.add('active');
}

function pickColor(e){
        colorInput.value = convertRgbToHex(e.target.style.backgroundColor.toString());
        changeColor(colorInput.value);
}

function drawing(e){
    if(e.type === 'mouseover' && !mouseDown) {return;}
    if(/*e.type === 'mousedown' && */pickingColor) { pickColor(e); pickingColorToggle(); return; }
    if(/*e.type ==='mousedown' && */MODE === 'fill') {DEFAULT_COLOR = colorInput.value; fill(gridArray); return;}
    if(MODE === 'magic') {currentColor = randomColor();}

    e.target.style.backgroundColor = currentColor;
}

function toggleButtons(array, idName){
    array.forEach(element => 
    {
        if(element.classList.contains('active')) { element.classList.remove('active'); }
        if(element.id == idName) {element.classList.add('active'); MODE = element.id;}
    });
    changeColor(colorInput.value);
}

function eventSubscriber(array){
    array.forEach(element => 
    {
        element.onclick = () => updateMode(element.id);
    });
}

function updateMode(mode){
    toggleButtons(toggleButtonsArray, mode);
}

function createGrid(value){
    clearGrid();
    grid.style.gridTemplateColumns = `repeat(${value}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${value}, 1fr)`;

    for (let index = 0; index < value*value; index++) {
        let pixel = document.createElement('div');
        pixel.style.background = DEFAULT_COLOR;
        if(btngridtoggle.classList.contains('active')){ pixel.style.border="1px solid #d9d9d9"; }
        pixel.addEventListener("mouseover", drawing);
        pixel.addEventListener("mousedown", drawing);
        gridArray.push(pixel);
        grid.appendChild(pixel);
    }
}

slider.oninput = function(){
    gridSize.textContent = `${this.value*4}x${this.value*4}`;
    createGrid(this.value*4);
}

window.onload = () => {
    eventSubscriber(toggleButtonsArray);
    createGrid(slider.value*4);
}