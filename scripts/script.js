let DEFAULT_COLOR = "#FFFFFF";
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
            DEFAULT_COLOR = value;
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
        element.style.backgroundColor = DEFAULT_COLOR;
    });
}

function convertRgbToHex(rgb) {
    // This will choose the correct separator, if there is a "," in your value it will use a comma, otherwise, a separator will not be used.
    var separator = rgb.indexOf(",") > -1 ? "," : " ";
  
    // This will convert "rgb(r,g,b)" into [r,g,b] so we can use the "+" to convert them back to numbers before using toString 
    rgb = rgb.substr(4).split(")")[0].split(separator);
  
    // Here we will convert the decimal values to hexadecimal using toString(16)
    var r = (+rgb[0]).toString(16),
      g = (+rgb[1]).toString(16),
      b = (+rgb[2]).toString(16);
  
    if (r.length == 1)
      r = "0" + r;
    if (g.length == 1)
      g = "0" + g;
    if (b.length == 1)
      b = "0" + b;
  
    // The return value is a concatenation of "#" plus the rgb values which will give you your hex
    return "#" + r + g + b;
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
    if(e.type === 'mousedown'){ console.log(`MousePressed: ${mouseDown} | Type: `, e.type); }

    if(e.type ==='mousedown' && MODE === 'fill'){fill(gridArray); return;}
    if(e.type === 'mousedown' && pickingColor) 
    {
        pickColor(e); 
        pickingColorToggle();
        return;
    }

    if(e.type === 'mouseover' && !mouseDown) {return;}
    
    e.target.style.backgroundColor = currentColor;
    
}

function toggleButtons(array, idName){
    array.forEach(element => 
    {
        if(element.classList.contains('active')) { element.classList.remove('active'); }
        if(element.id == idName) {element.classList.add('active'); MODE = element.id;}
    });
    changeColor(currentColor);
}

function eventSubscriber(array){
    console.log('subbed!');
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

    for (let index = 0; index < value; index++) {
        for (let index = 0; index < value; index++) {
            let pixel = document.createElement('div');
            pixel.style.background="#505050";
            if(btngridtoggle.classList.contains('active')){ pixel.style.border="1px solid #d9d9d9"; }
            pixel.addEventListener("mouseover", drawing);
            pixel.addEventListener("mousedown", drawing);
            gridArray.push(pixel);
            grid.appendChild(pixel);
        }
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