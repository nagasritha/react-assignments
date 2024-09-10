import React from 'react';
import { GameContext } from '../context/game.Context';

const Move = ({ move }) => {
    return (<tr >
        <td>
            {move.moveCount}
        </td>
        <td>
            {move.position}
        </td>
        <td>
            {move.player}
        </td>
    </tr>
    );
}


export const GameMoves = () => {
    const {state} = React.useContext(GameContext);
    const {moves} = state;
    return (
        <div className='game-moves-component'>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Position</th>
                        <th>Player</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        moves.map(move => <Move 
                                    key={move.moveCount} 
                                    move={move}/>)
                    }



                </tbody>
            </table>
        </div>
    )
};