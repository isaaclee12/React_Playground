import React from 'react';
// import Square from './tic_tac_toe';
// import Board from './tic_tac_toe';
// import Game from './tic_tac_toe';
import ReactDOM from 'react-dom/client';

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
    // Constructor for vars, creates array w/ values of ea. square + bool
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(),
            xIsNext: true,
        };
    }


    // Handle clicks to change value of squares
    // & switch turn
    handleClick(i) {
        // Make a variable that's a copy of squares
        const squares = this.state.squares.slice();

        // Ignore click if someone has won or
        // if the square is filled/has a non-null value
        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        // Set symbol to mark square w/ based on if x is next or not
        squares[i] = this.state.xIsNext ? 'X' : 'O';

        this.setState({
            squares: squares,
            // Flip xIsNext to alternate state
            xIsNext: !this.state.xIsNext,
        });
    }

    // Container for squares and their states
    renderSquare(i) {
        return <Square
            value = {this.state.squares[i]}
            onClick={() => this.handleClick(i)}
        />;
    }

    render() {
        // Calculate the games winner
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X': 'O');
        }

        // Generate the board of 9 buttons
        return (
            <div>
                <div className="status">{status}</div>
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
    // xIsNext = bool for turn tracking
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            xIsNext: true,
        };
    }

    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
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