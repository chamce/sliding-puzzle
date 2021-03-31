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
      win: false
    }
    this.tileClicked = this.tileClicked.bind(this);
  }

  shuffle() {
    
  }

  checkWin() {
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

  move(clicked, empty) {
    let arr = this.state.board;
    let temp = arr[clicked];
    arr[clicked] = arr[empty];
    arr[empty] = temp;
    this.setState({ board: arr });
    this.checkWin();
  }

  tileClicked(clickedIndex) {
    let i = 0;
    for (let tile of this.state.board) {
      if (!tile.blank === true) {
        i++;
      } else {
        break;
      }
    }
    let emptyIndex = i;
    let clickedRow = Math.floor(clickedIndex / 4);
    let clickedCol = clickedIndex % 4;
    let emptyRow = Math.floor(emptyIndex / 4);
    let emptyCol = emptyIndex % 4;
    if (clickedRow === emptyRow && Math.abs(clickedCol - emptyCol) === 1) {
      this.move(clickedIndex, emptyIndex);
    } else if (clickedCol === emptyCol && Math.abs(clickedRow - emptyRow) === 1) {
      this.move(clickedIndex, emptyIndex);
    }
  }

  render() {
    return (
      <>
        <div className='container text-center fs-1'>
          <div className='row'>
            <h1>Sliding Puzzle</h1>
            {this.state.board.map((tile, index) => <Tile tile={tile} key={index} index={index} clickHandler={this.tileClicked}></Tile>)}
            <h2>{this.state.win ? 'Win!' : ''}</h2>
          </div>
        </div>
      </>
    );
  }
}

export default App;
