import React from 'react';
import { GameScoreboard } from './game-scoreboard.component';

export class GameTournament extends React.Component {
    state = {
        games: 0,
        X: 0,
        O: 0,
        draw: 0,
    }

    drawScore(object, condition, property) {
        let value = condition ? 0.5 : 0.25;
        object[property] += value;
        return object;
    }

    handleGameResult = (winner) => {
        const { XMs, OMS , isStalemate} = this.props; // Make sure these are passed from parent
        this.setState(prevState => {
            let newState = { ...prevState };

            if (winner) {
                newState[winner]++;
                newState.games++;
            } if(isStalemate) {
                newState.draw++;
                let condition = XMs > OMS;
                newState = this.drawScore(newState, condition, 'X');
                newState = this.drawScore(newState, !condition, 'O');
                newState.games++;
            }


            console.log('newState', newState);
            return newState;
        });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.winner !== this.props.winner || prevProps.isStalemate !== this.props.isStalemate) {
            this.handleGameResult(this.props.winner); // Pass the winner here
        }
    }

    render = () => {
        return (
            <div className='game-series-component'>
                <GameScoreboard {...this.state} />
            </div>
        );
    }
}
