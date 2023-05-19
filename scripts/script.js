var slider = document.getElementById('myRange');
var gridSize = document.getElementById('size');
let grid = document.getElementById('grid');
gridSize.textContent = `${slider.value*4}x${slider.value*4}`;

function createGrid(value){
    grid.innerHTML = ''
    grid.style.gridTemplateColumns = `repeat(${value}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${value}, 1fr)` 

    for (let index = 0; index < value; index++) {
        for (let index = 0; index < value; index++) {
            let pixel = document.createElement('div');
            pixel.style.background="#505050"
            pixel.style.border="1px solid #FFF"
            grid.appendChild(pixel);
        }
    }
}

slider.oninput = function(){
    gridSize.textContent = `${this.value*4}x${this.value*4}`;
    createGrid(this.value*4);
}

window.onload = () => {
    createGrid(slider.value*4);
}