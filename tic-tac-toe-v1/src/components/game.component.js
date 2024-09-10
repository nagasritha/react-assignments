// import React from 'react';
// import { Status } from './status-component.component';
// import { GameBoard } from './game-board.component';
// import { RestartButton } from './restart-button.component';
// import { GameMoves } from './game-moves.component';
// import { TicTacToeGame } from '../services/tic-tac-toe-game.service';
// import { Timer } from './timer.component';
// import { GameSeriesContext } from '../context/game-series.context';

// export const Game=()=>{
//     const {onGameResult} = React.useContext(GameSeriesContext);
//     let playerChange;
//     //const game = new TicTacToeGame();
//     // const timers = {
//     //     O: React.createRef(),
//     //     X: React.createRef()
//     // };
//     let game = new TicTacToeGame();
//     let fetchGameState=()=> {
//         let state = {
//             ...game,
//             next: game.currentPlayer,
//             isOver: game.isOver,
//             winningPlayer: game.winningPlayer,
//             isStalemate: game.isStalemate,
//             timers: { O: 0, X: 0 }
//         };

//         state.message = game.isOver
//             ? (game.winner ? `'${game.winningPlayer}' Wins` : `Stalemate`)
//             : `Next Player '${game.currentPlayer}'`;

//         return state;
//     }




//         let [state,setState] = React.useState(fetchGameState());

//         let timers = {
//             O: React.createRef(),
//             X: React.createRef()
//         };



//     let start = () => {
//         let OMs = timers.O.current.state.ms;
//         let XMs = timers.X.current.state.ms;

//         if (playerChange) {
//             clearInterval(playerChange);
//         }

//         if (!state.isOver) {
//             setState({ isRunning: true });

//             playerChange = setInterval(() => {
//                 game.changePlayer();
//                 setState({ ...fetchGameState });

//                 if (state.isOver) {
//                     clearInterval(playerChange);
//                     // this.timers.O.current.stop();
//                     // this.timers.X.current.stop();
//                     setState(
//                         { isRunning: false, next: '-', timers: { X: XMs, O: OMs } },
//                         () => onGameResult(state.winningPlayer, XMs, OMs, state.isStalemate)
//                     );
//                 }
//             }, 5000);
//         } else {
//             setState({ isRunning: false });
//         }
//     };

//     let handleMove = (id) => {
//         if (game.move(id) === false) return;

//         setState({ ...fetchGameState, restarted: false });

//         if (!state.isOver) {
//             start();
//         }
//     };

//     let reStart = () => {
//         game = new TicTacToeGame();
//         setState({ ...fetchGameState, restarted: true });
//     };


//         return (
//             <div className='body'>
//                 <button onClick={start} className='restart-component'>Start</button>
//                 <div className='game-component'>
//                     <Status message={state.message} />
//                     {game.isOver && <RestartButton onRestart={reStart} />}
//                     <GameBoard winner={state.winner} cells={state.cells} onCellClick={handleMove} />
//                     <div>
//                         <div className='same-row'>
//                             <Timer ref={timers.X} name='X' timerCondition={state.isRunning && state.next === 'X'} restarted={state.restarted} />
//                             <Timer ref={timers.O} name='O' timerCondition={state.isRunning && state.next === 'O'} restarted={state.restarted} />
//                         </div>
//                     </div>
//                     <GameMoves moves={state.moves} />
//                 </div>
//             </div>
//         );
//     };


import React, { useState, useRef, useEffect, useContext } from 'react';
import { Status } from './status-component.component';
import { GameBoard } from './game-board.component';
import { RestartButton } from './restart-button.component';
import { GameMoves } from './game-moves.component';
import { TicTacToeGame } from '../services/tic-tac-toe-game.service';
import { Timer } from './timer.component';
import { GameSeriesContext } from '../context/game-series.context';
import { GameContext } from '../context/game.Context';

export const Game = () => {
    const { handleGameResult: onGameResult } = useContext(GameSeriesContext);
    const gameRef = useRef(new TicTacToeGame()); // Use a ref to store the game instance across renders
    const playerChange = useRef(null); // Use ref to persist interval across renders
    const gameResultSubmitted = useRef(false); // Flag to track if the result has been submitted

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
            moves: game.moves, // If moves are required for GameMoves component
        };
        return state;
    };

    const [state, setState] = useState(fetchGameState);

    useEffect(() => {
        if (state.isOver && !gameResultSubmitted.current) {
            const OMs = timers.O.current.state.ms;
            const XMs = timers.X.current.state.ms;
            onGameResult(state.winningPlayer, XMs, OMs, state.isStalemate);
            gameResultSubmitted.current = true; // Mark that the result has been submitted
        }
    }, [state.isOver, state.winningPlayer, state.isStalemate, onGameResult]);

    const start = () => {
        const game = gameRef.current;
        const OMs = timers.O.current.state.ms;
        const XMs = timers.X.current.state.ms;

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
        <GameContext.Provider value={{state,handleMove}}>
            <div className='body'>
            <button onClick={start} className='restart-component'>
                Start
            </button>
            <div className='game-component'>
                <Status message={state.message} />
                {state.isOver && <RestartButton onRestart={reStart} />}
                <GameBoard/>
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
