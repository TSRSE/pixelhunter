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
colorInput.onchange = () => changeColor();

let currentColor = '#FFFFFF';
function changeColor(){
    currentColor = colorInput.value;
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

function drawing(e){
    if(e.type === 'mousedown'){
        console.log(`MousePressed: ${mouseDown} | Type: `, e.type);
    }
    
    if(e.type === 'mouseover' && !mouseDown) {return;}
    e.target.style.backgroundColor = currentColor;
}

function toggleButtons(array, idName){
    array.forEach(element => 
    {
        if(element.classList.contains('active')) { element.classList.remove('active'); }
        if(element.id == idName) {element.classList.add('active');}
    });
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
            if(btngridtoggle.classList.contains('active')){
                pixel.style.border="1px solid #d9d9d9";
            }
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