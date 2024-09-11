import React, { useState } from 'react';
import { GameScoreboard } from './game-scoreboard.component';
import { Game } from './game.component';
import { GameSeriesContext } from '../context/game-series.context';
import { GameContextProvider } from '../context/game.Context';
export const GameSeries = () => {
    let initialState = {
        games: 0,
        X: 0,
        O: 0,
        draw: 0
    };
    const [state, setState] = useState(initialState)

    let handleGameResult = (winner, XMs, OMs, isStalemate) => {
        console.log('handle Game Result is called');
        let newState = { ...state };

        if (winner) {
            newState[winner]++;
            newState.games++;
        } else if (isStalemate) {
            newState.draw++;
            const condition = XMs > OMs;
            newState = drawScore(newState, condition, 'X');
            newState = drawScore(newState, !condition, 'O');
            newState.games++;
        }
        setState(newState);
    }

    let drawScore = (state, condition, player) => {
        if (condition) state[player] += 0.5;
        else {
            state[player] += 0.25;
        }
        return state;
    };


    return (
        <GameSeriesContext.Provider value={{ state, handleGameResult }}>
            <div className='game-series-component'>
                <GameScoreboard />

                <Game onGameResult={handleGameResult} />


            </div>
        </GameSeriesContext.Provider>

    );
}
