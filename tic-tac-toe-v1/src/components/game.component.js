import React, { useState, useRef, useEffect, useContext } from 'react';
import { Status } from './status-component.component';
import { GameBoard } from './game-board.component';
import { RestartButton } from './restart-button.component';
import { GameMoves } from './game-moves.component';
import { TicTacToeGame } from '../services/tic-tac-toe-game.service';
import { Timer } from './timer.component';
import { GameSeriesContext } from '../context/game-series.context';
import { GameContext } from '../context/game.Context';
import { useTimerContext } from '../context/timer.comtext';

export const Game = () => {
    const { handleGameResult: onGameResult } = useContext(GameSeriesContext);
    console.log(useTimerContext());
    const gameRef = useRef(new TicTacToeGame());
    const playerChange = useRef(null);
    const gameResultSubmitted = useRef(false);

    const timers = {
        O: useRef(null),
        X: useRef(null),
    };

    const fetchGameState = () => {
        const game = gameRef.current;
        const state = {
            ...game,
            next: game.currentPlayer,
            isOver: game.isOver,
            winningPlayer: game.winningPlayer,
            isStalemate: game.isStalemate,
            timers: { O: 0, X: 0 },
            message: game.isOver
                ? game.winningPlayer
                    ? `'${game.winningPlayer}' Wins`
                    : 'Stalemate'
                : `Next Player '${game.currentPlayer}'`,
            moves: game.moves,
        };
        return state;
    };

    const [state, setState] = useState(fetchGameState);

    useEffect(() => {
        if (state.isOver && !gameResultSubmitted.current) {
            const OMs = timers.O.current.ms;
            const XMs = timers.X.current.ms;
            onGameResult(state.winningPlayer, XMs, OMs, state.isStalemate);
            gameResultSubmitted.current = true; 
        }
    }, [state.isOver, state.winningPlayer, state.isStalemate, onGameResult]);

    const start = () => {
        const game = gameRef.current;
        const OMs = timers.O.current.ms;
        const XMs = timers.X.current.ms;

        if (playerChange.current) {
            clearInterval(playerChange.current);
        }

        if (!state.isOver) {
            setState((prevState) => ({ ...prevState, isRunning: true }));

            playerChange.current = setInterval(() => {
                game.changePlayer();
                setState(fetchGameState());

                if (game.isOver) {
                    clearInterval(playerChange.current);
                    timers.O.current.stop();
                    timers.X.current.stop();
                    setState((prevState) => ({
                        ...prevState,
                        isRunning: false,
                        next: '-',
                        timers: { X: XMs, O: OMs },
                    }));
                }
            }, 5000);
        } else {
            setState((prevState) => ({ ...prevState, isRunning: false }));
        }
    };

    const handleMove = (id) => {
        const game = gameRef.current;
        if (!game.move(id)) return;

        setState({
            ...fetchGameState(),
            restarted: false,
        });

        if (!state.isOver) {
            start();
        }
    };

    const reStart = () => {
        gameRef.current = new TicTacToeGame();
        gameResultSubmitted.current = false; 
        setState(fetchGameState());
    };

    return (
        <GameContext.Provider value={{ state, handleMove, reStart }}>
            <div className='body'>
                <button onClick={start} className='restart-component'>
                    Start
                </button>
                <div className='game-component'>
                    <Status message={state.message} />
                    {state.isOver && <RestartButton onRestart={reStart} />}
                    <GameBoard />
                    <div>
                        <div className='same-row'>
                            <Timer
                                ref={timers.X}
                                name='X'
                                timerCondition={state.isRunning && state.next === 'X'}
                                restarted={state.restarted}
                            />
                            <Timer
                                ref={timers.O}
                                name='O'
                                timerCondition={state.isRunning && state.next === 'O'}
                                restarted={state.restarted}
                            />
                        </div>
                    </div>
                    <GameMoves moves={state.moves} />
                </div>
            </div>
        </GameContext.Provider>
    );
};
