import { useState, useEffect } from 'react';


const Clip = ({source, sourceWidth, sourceHeight, boardLocked, deleteClip, updateClip, identifier, sourceX, sourceY, sourceLayer, getTopLayer}) => {

    const [x, setX] = useState(sourceX);
    const [y, setY] = useState(sourceY);
    const [src, setSrc] = useState(source);
    const [layer, setLayer] = useState(sourceLayer);

    const [id, setId] = useState(identifier);
    let obj = ({'src': src, 'width': sourceWidth, 'height': sourceHeight, 'x': sourceX, 'y': sourceY, 'identifier': id, 'layer': sourceLayer});

    const [w, setW] = useState(sourceWidth);
    const [h, setH] = useState(sourceHeight);
    const [originalWidth, setOriginalWidth] = useState(sourceWidth);
    const [originalHeight, setOriginalHeight] = useState(sourceHeight);

    const [forceAspectRatio, setForceAspectRatio] = useState(true);

    let scaling = false;
    let minWidth = 25, minHeight = 25;

    const [elem, setElem] = useState(null);
    const [active, setActive] = useState(false);

    let dX = 0, dY = 0;

    let pos3 = 0, pos4 = 0;

    useEffect(() => {
        document.addEventListener('keyup', (e) => {
            if(e.key === 'Enter') {
                console.log('entered');
                setActive(false);
            }
            if(e.key === 'Shift') {
                setForceAspectRatio(true);
            }
            if(e.key === 'Backspace' && active) {
                deleteClip(src);
            }
        });
        document.addEventListener('keydown', (e) => {
            if(e.key === 'Shift') {
                setForceAspectRatio(false);
            }
        })
    }, [])

    function openSource() {
        window.open(src);
    }

    function dragMouseDown(e) {

        if(boardLocked) return false;
        if(e.ctrlKey) {
            openSource();
            return false;
        }
        console.log(e)

        dX = 0; dY = 0;

        e = e || window.event;
        e.preventDefault();
        setElem(e.target);
        setActive(true);
        pos3 = x;
        pos4 = y;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;

        let newLayer = getTopLayer();
        setLayer(newLayer);
    }

    function elementDrag(e) {

        e = e || window.event;
        e.preventDefault();

        dX += e.movementX;
        dY += e.movementY;

        let newW = w, newH = h;

        if(!scaling) {
            setX(x + dX);
            setY(y + dY);
        } else {
            if(forceAspectRatio) {
                newW = Math.max(w + dX, minWidth);
                newH = (originalHeight / (originalWidth * 1.0)) * Math.max(w + dX, minWidth);
                setW(newW);
                setH(newH);
            } else {
                newW = Math.max(w + dX, minWidth);
                newH = Math.max(h + dY, minHeight);
                setW(newW);
                setH(newH);
            }
        }
        let newLayer = layer;
        obj = ({'src': src, 'width': newW, 'height': newH, 'x': (x + dX), 'y': (y + dY), 'layer': newLayer, 'identifier': id});
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
        if(scaling) {
            scaling = false;
        }
        if(w != obj.w || h != obj.h || x != obj.x || y != obj.y || layer != obj.layer) {
            obj = ({'src': src, 'width': w, 'height': h, 'x': x, 'y': y, 'layer': layer, 'identifier': id});
            updateClip(obj);
        }
    }

    function finishEdit() {
        setActive(false);
    }

    return (
        <div onMouseDown={(e) => dragMouseDown(e)} className={`clip${(active && !boardLocked) ? ' active' : ''}`} style={{left: `${x}px`, top: `${y}px`, width: `${w}px`, height: `${h}px`, zIndex: `${layer}`}}>
            {(active && !boardLocked) && <div className={'scaler'} onMouseDown={() => scaling = true}></div>}
            <img src={src}></img>
        </div>
    )
}

export default Clip;
