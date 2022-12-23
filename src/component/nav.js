import { useState, useEffect } from 'react';

import Logo from '../clipbox-logo.png';
import '../style/nav.scss';

const Nav = ({children, locked, setLocked, saveBoard}) => {

    return (
        <div className={'nav'}>
            <img src={Logo} className={'logo'} onClick={() => window.open('/', '_self')}></img>
            <div className={'item'}><button className={`${locked ? 'locked' : ''}`} onClick={() => setLocked(!locked)}>Lock Clips to Board</button></div>
            <div className={'item'}><button className={''} onClick={() => saveBoard()}>Save Board</button></div>
        </div>
    )
}

export default Nav;
