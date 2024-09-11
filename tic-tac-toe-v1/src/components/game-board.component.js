import React from 'react';
import { Box } from './box.component';
import { useGameContext } from '../context/game.Context';
import { GameContext } from '../context/game.Context';
  

export const GameBoard=()=>{
    const {state}  = React.useContext(GameContext);
   const {cells} = state;
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


