import React, { useContext } from 'react';
import { GameContext } from '../context/game.Context';

export const Box = ({ value, id }) => {
    let {handleMove:onCellClick,state} = useContext(GameContext);
    let{winner} = state;

    let clickHandler = winner|| value ? null : () => onCellClick(id);

    const style = {
        border: '0px',
        borderLeft: [0, 3, 6].includes(id) ? '0px' : '1px solid gray',
        borderTop: id > 2 ? '1px solid gray' : '0px',
        borderRight: [2, 5, 8].includes(id) ? '0px' : '1px solid gray',
        borderBottom: id < 6 ? '1px solid gray' : '0px',
        cursor: winner || value ? 'not-allowed' : 'pointer',
        backgroundColor: winner && winner.includes(id) ?'lightgreen':''
    }


    return (
        <button style={style} onClick={clickHandler}
            className='box-component'>
            {value}
        </button>
    )
}
