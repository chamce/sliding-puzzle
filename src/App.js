import React, { Component } from 'react';
import './App.css';
import Tile from './Tile.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [
        { number: 0, blank: false },
        { number: 1, blank: false },
        { number: 2, blank: false },
        { number: 3, blank: false },
        { number: 4, blank: false },
        { number: 5, blank: false },
        { number: 6, blank: false },
        { number: 7, blank: false },
        { number: 8, blank: false },
        { number: 9, blank: false },
        { number: 10, blank: false },
        { number: 11, blank: false },
        { number: 12, blank: false },
        { number: 13, blank: false },
        { number: 14, blank: false },
        { number: 15, blank: true }
      ],
      empty: { index: 15 },
      win: false,
      n: 4
    }
    this.tileClicked = this.tileClicked.bind(this);
    this.shuffle = this.shuffle.bind(this);
  }

  componentDidMount() {
    this.shuffle();
  }

  shuffle() {
    let n = this.state.n;
    for (let i = 0; i < 5; i++) {
      // gather row and col information of empty
      let emptyI = this.state.empty.index;
      let emptyRow = Math.floor(emptyI / n);
      let emptyCol = emptyI % n;
      // array of indexes of possible clicks
      let possible = [];
      // find indexes of possible clicks
      for (let i = 0; i < this.state.board.length; i++) {
        let row = Math.floor(i / n), col = i % n;
        if (row === emptyRow && Math.abs(col - emptyCol) === 1) {
          possible.push(i);
        } else if (col === emptyCol && Math.abs(row - emptyRow) === 1) {
          possible.push(i);
        }
      }
      // randomly choose possible click
      let random = Math.floor(Math.random() * possible.length);
      let clickedI = possible[random];
      this.move(clickedI, emptyI);
    }
  }

  checkWin() {
    // check if tile numbers are same as indexes
    let i = 0;
    for (let tile of this.state.board) {
      if (tile.number !== i) {
        this.setState({ win: false });
        return;
      }
      i++;
    }
    this.setState({ win: true });
  }

  move(clickedI, emptyI) {
    // temporary board to switch clicked and empty positions
    let board = this.state.board;
    let t = board[clickedI];
    board[clickedI] = board[emptyI];
    board[emptyI] = t;
    // temporary empty object for changing index
    let empty = this.state.empty;
    empty.index = clickedI;
    this.setState({ board });
    this.setState({ empty });
    // check win after every move
    this.checkWin();
  }

  tileClicked(clickedI) {
    let n = this.state.n;
    // I: index, R: row, C: col
    let emptyI = this.state.empty.index;
    let clickedR = Math.floor(clickedI / n);
    let clickedC = clickedI % n;
    let emptyR = Math.floor(emptyI / n);
    let emptyC = emptyI % n;
    if (clickedR === emptyR && Math.abs(clickedC - emptyC) === 1) {
      this.move(clickedI, emptyI);
    } else if (clickedC === emptyC && Math.abs(clickedR - emptyR) === 1) {
      this.move(clickedI, emptyI);
    }
  }

  render() {
    return (
      <>
        <div className='container'>
          <div className='row text-center fs-1'>
            <h1>Sliding Puzzle</h1>
            {this.state.board.map((tile, index) => <Tile tile={tile} key={index} index={index} clickHandler={this.tileClicked}></Tile>)}
          </div>
          <div className='row'>
            <div className='col text-center fs-1'>
              <h2 className='mt-1'>{this.state.win ? 'Win!' : ''}</h2>
              <button type='button' className={'btn btn-primary btn-lg ' + (this.state.win ? '' : 'd-none')} onClick={this.shuffle}>Reset</button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
