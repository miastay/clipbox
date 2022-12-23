import { useState, useEffect } from 'react';
import Clip from '../component/clip';

import '../style/app.scss';

const ClipPage = ({locked, board, setBoard}) => {

    const [currentBoard, setCurrentBoard] = useState(board ? board : {'name': 'Untitled', 'data': {'clips': []}})
    const [clips, setClips] = useState(board?.data?.clips || []);

    let tempName = currentBoard.name;

    async function paste(item) {
        console.log('pasting')
        if(item.src) {
            let oldClips = [...clips];
            oldClips.push(item)
            setClips([...oldClips])
            console.log(clips)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', (e) => {
            if(e.target.contentEditable === 'true') return;
            console.log('focusing')
            document.querySelector('#capture').focus();
        });
        document.addEventListener('keydown', (e) => {
            if(e.key === 'Enter' && e.target.contentEditable === 'true') {
                e.target.blur();
                if(e.target.id === 'boardName') {
                    let updatedBoard = currentBoard;
                    updatedBoard.name = e.target.innerText;
                    setBoard(updatedBoard);
                }
            }
        });
    })
    
    const handleInput = (event) => {
        console.log(event)
        if(event.code == "KeyV" && event.ctrlKey) {
            console.log('handling...')
            let elem = event.target.children[0];
            console.log(elem)
            event.target.innerHTML = '';
            let src = elem.src;
            let width = elem.width;
            let height = elem.height;
            paste({'src': src, 'width': width, 'height': height, 'x': 100, 'y': 100, 'identifier': clips.length, 'layer': (clips.length)})
        }
    }

    const deleteClip = (src) => {
        setClips([...clips.filter(x => x.src !== src)])
    }

    const updateClip = (clipobj) => {
        let oldClips = [...clips.filter(x => x.src !== clipobj.src)];
        oldClips.push(clipobj)
        setClips([...oldClips])
        updateBoard();
        console.log('updated')
    }

    const updateBoard = () => {
        let updatedBoard = currentBoard;
        console.log(updatedBoard)
        updatedBoard.data.clips = clips;
        setBoard(updatedBoard)
        console.log('upadted Board')
    }

    const getTopLayer = () => {
        let clipsBySortLayer = clips.sort((a, b) => a.layer < b.layer);
        return (clipsBySortLayer[0].layer + 1);
    }

    const getCharCount = () => {
        let count = 0;
        for(let clip of clips) {
            count += clip.src.length
        }
        return count;
    }

    return (
        <div className={'page'}>
            <div id={'boardName'} className={'board-name'} contentEditable="true">{tempName}</div>
            <span onClick={(e) => e.target.innerText = ('Count: ' + getCharCount())} className={'board-name'} style={{top: '5%'}}>Count: </span>
            <div>{clips && clips.map((item, index) => {
                return <Clip    key={index} 
                                identifier={item.identifier} 
                                source={item.src} 
                                sourceWidth={item.width} 
                                sourceHeight={item.height} 
                                sourceX={item.x} 
                                sourceY={item.y} 
                                sourceLayer={item.layer}
                                boardLocked={locked} 
                                deleteClip={deleteClip} 
                                updateClip={updateClip}
                                getTopLayer={getTopLayer}/>
            })}</div>
            <div className={'clipper'} id={'capture'} onKeyUp={(e) => handleInput(e)} contentEditable="true"></div>
        </div>
    )
}

export default ClipPage;
