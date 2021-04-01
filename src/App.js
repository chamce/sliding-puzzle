import React, { Component } from 'react';
import './App.css';
import Tile from './Tile.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [],
      empty: {},
      win: false,
      n: 4
    }
    this.tileClicked = this.tileClicked.bind(this);
    this.shuffle = this.shuffle.bind(this);
  }

  componentDidMount() {
    let n = this.state.n;
    let board = [];
    let empty = { index: n * n - 1 };
    for (let i = 0; i < n * n; i++) {
      if (i < n * n - 1) {
        board.push({ number: i, blank: false });
      } else {
        board.push({ number: i, blank: true });
      }
    }
    this.setState({ empty });
    this.setState({ board }, this.shuffle);
  }

  shuffle() {
    let n = this.state.n;
    for (let i = 0; i < 20; i++) {
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
    this.setState({ win: false });
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
    this.checkWin();
  }

  render() {
    return (
      <>
        <div className='container text-center' style={{ width: '500px', height: '500px' }}>
          <div className='row'>
            <h1>Sliding Puzzle</h1>
          </div>
          <div className='row mx-auto fs-1' style={{ width: '400px', height: '400px' }}>
            {this.state.board.map((tile, index) => <Tile tile={tile} key={index} index={index} clickHandler={this.tileClicked}></Tile>)}
          </div>
          <div className='row'>
            <div className='col'>
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
