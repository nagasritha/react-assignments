import React from 'react';
import { Box } from './box.component';
import { GameContext } from '../context/game.Context';


  

export const GameBoard=()=>{
    const {state,handleMove:onCellClick}  = React.useContext(GameContext);
    const {cells,winner}=state;
    return(
        <div className = 'game-board-component' >
        {
            cells.map((value, index) => <Box
                key={index} id={index}
                value={value}

            />)
        }
        </div>
    )
}


