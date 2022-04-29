import React from 'react';
// import Square from './tic_tac_toe';
// import Board from './tic_tac_toe';
// import Game from './tic_tac_toe';
import './main.css';
import ReactDOM from 'react-dom/client';

/*
* NOTES:
* props = parameter sent into the child component
* state = something private and inherent to the currect/parrent component
* most functions should be handled/floated up to the parent-most component
* list items need unique keys for react to work with it
* if items are ordered, then you can use the index
* if not, each unordered item needs a unique key
* */

// Function component that sends in a value on click.
// Basically just an encapsulated function for changing square/child values
function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {

    // Container for squares and their states
    renderSquare(i) {
        return <Square
            value = {this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
        />;
    }

    render() {
        // Generate the board of 9 buttons
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    // Establish everything.
    // History = array of array of square-states
    // stepNumber = counts which step we're on
    // xIsNext = bool for turn tracking
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
        };
    }

    // Handles clicks to change value of squares + switches turn
    // and stores history, we use concat b/c it doesn't mutate the OG
    handleClick(i) {
        // Sets our place in history to a previous spot, allows us to change future
        const history = this.state.history.slice(0, this.state.stepNumber + 1);

        // Use latest history
        const current = history[history.length - 1];

        // Make a variable that's a copy of squares
        const squares = current.squares.slice();

        // Ignore click if someone has won or
        // if the square is filled/has a non-null value
        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        // Set symbol to mark square w/ based on if x is next or not
        squares[i] = this.state.xIsNext ? 'X' : 'O';

        this.setState({
            // Add each array of squares to the main history array on click
            history: history.concat([{
                squares: squares,
            }]),
            // Set step to our current history. if history changes, we change history's length
            stepNumber: history.length,

            // Flip xIsNext to alternate state
            xIsNext: !this.state.xIsNext,
        });
    }

    // Jumps to a step if displaying old move
    jumpTo(step) {
        this.setState({
            // This only updates these two state vars, leaves history alone
           stepNumber: step,
            // set x to next if step is even, else o
           xIsNext: (step % 2) === 0,
        });
    }

    // Renders the game
    render() {
        // Get history
        const history = this.state.history;

        // Use latest history
        const current = history[this.state.stepNumber];

        // Calculate the games winner
        const winner = calculateWinner(current.squares);

        // Map history to moves
        const moves = history.map((step, move) => {

            // Label of button depends on move number
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';

            // Send html printing the buttons
            return (
                // element w/ key for react to work w/ it
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            )
        });



        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X': 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    {/*creates the board*/}
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    {/*prints status of game*/}
                    <div>{status}</div>
                    {/*prints all the moves in the map*/}
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
// ========================================

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<Game />);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <p>test</p>
    <Game />
  </React.StrictMode>
);