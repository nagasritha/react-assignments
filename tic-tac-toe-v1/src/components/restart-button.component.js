import React from 'react';
import { useGameContext } from '../context/game.Context';
export const RestartButton = () => {
    let {reStart:onRestart} = useGameContext();

    // if(!onRestart)
    //     return null; //do not display any ui

    let style = {}; //default style from css

    if (!onRestart) {

        onRestart = null;
        style = {
            backgroundColor: "gray",
            cursor: 'not-allowed',
        }
    }

    return (
        <button style={style}
            onClick={onRestart}
            className='restart-component'>
            Play Again!
        </button>
    )
}
