export function saveBoardToLocalStorage(board) {
    let newBoards = null;
    let newBoard = JSON.stringify(board);
    if(window.localStorage.getItem('boards')?.[board.name]) {
        newBoards = window.localStorage.getItem('boards')[board.name];
        newBoards[board.name] = newBoard;
    } else {
        newBoards = {}
        newBoards[board.name] = newBoard;
    }
    console.log(newBoards);
    newBoards = JSON.stringify(newBoards);
    console.log(newBoards);
    window.localStorage.setItem('boards', newBoards);
}

export function getBoardFromLocalStorage(name) {
    return JSON.parse(window.localStorage.getItem('boards'))[name];
}

export function getBoardsFromLocalStorage() {
    if(!window.localStorage.getItem('boards')) {
        saveBoardToLocalStorage({'name': 'Untitled', 'data': {'clips': []}})
    }
    return JSON.parse(window.localStorage.getItem('boards'));
}