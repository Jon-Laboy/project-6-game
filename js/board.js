//create board w/ 100 div's styled with css class 'grid' 
let board = $('#board');

function createBoard(gridsNum) {
    for (i = 0; i < gridsNum; i++) {
        let gridDiv = document.createElement("div");
        gridDiv.id = i; 
        gridDiv.classList.add("grid");
        board.append(gridDiv);
    };
};
createBoard(100);


