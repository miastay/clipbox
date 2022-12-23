import './style/app.scss';
import { useState, useEffect } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Nav from './component/nav';
import ClipPage from './page/clippage';

import { saveBoardToLocalStorage, getBoardFromLocalStorage, getBoardsFromLocalStorage } from './api';


function App() {

    const [boardLocked, setBoardLocked] = useState(false);
    const [currentBoard, setCurrentBoard] = useState(JSON.parse(getBoardsFromLocalStorage()[Object.keys(getBoardsFromLocalStorage())[0]]));

    function saveBoard() {
        console.log(Object.keys(getBoardsFromLocalStorage())[0])
        console.log(currentBoard)
        saveBoardToLocalStorage(currentBoard);
    }

    return (
        (
        <>
        <Router>
        <Nav locked={boardLocked} setLocked={setBoardLocked} saveBoard={saveBoard}/>
        <Routes>
            <Route exact path="/" element={<ClipPage locked={boardLocked} board={currentBoard} setBoard={setCurrentBoard}/>}/>
            <Route path="*" element={<div>404</div>}/>
        </Routes>
        </Router>
        </>)
    );
}

export default App;
