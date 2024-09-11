import React from "react";

export let GameContext = React.createContext();

export let useGameContext = ()=>React.useContext(GameContext);

const reducer = (state,action)=>{

}

export const GameContextProvider=(children)=>{
    // const gameRef = useRef(new TicTacToeGame());
    // const game = gameRef.current;
    // const globalState= {
    //         ...game,
    //         next: game.currentPlayer,
    //         isOver: game.isOver,
    //         winningPlayer: game.winningPlayer,
    //         isStalemate: game.isStalemate,
    //         timers: { O: 0, X: 0 },
    //         message: game.isOver
    //             ? game.winningPlayer
    //                 ? `'${game.winningPlayer}' Wins`
    //                 : 'Stalemate'
    //             : `Next Player '${game.currentPlayer}'`,
    //         moves: game.moves, // If moves are required for GameMoves component
    //     };

    // let [state,dispactch] = React.useReducer(reducer,globalState);
    
    // const contextData = {state,dispactch};
    // <GameContext.Provider values={contextData}>
    //     <children/>
    // </GameContext.Provider>
}


