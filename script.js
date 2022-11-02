/* 1. create board (grid)
2. make option to choose x or o
3. make choice appear when grid square is selected
4. stop game when 3 of the same symbols are in a row(not sure on this part!)
5. alert winner
6. return to blank grid
optional extras - best out of 3 selector? that would also keep track of each round*/

function makeBoard(num){
    for (i = 0; i < num; i++){
        let grid = document.getElementById("grid");
        let div = document.createElement("div");
        div.id = `grid ${i}`
        grid.appendChild(div); 
    }
}
window.addEventListener("load", makeBoard(9)); 
