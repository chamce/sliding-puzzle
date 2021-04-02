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
      n: 4,
      moves: 0,
      file: '',
      imagePreviewUrl: ''
    }
    this.tileClicked = this.tileClicked.bind(this);
    this.shuffle = this.shuffle.bind(this);
  }

  componentDidMount() {
    // grid size
    let n = this.state.n;
    // temporary board array
    let board = [];
    // temporary empty object
    let empty = { index: n * n - 1 };
    // for every tile
    for (let i = 0; i < n * n; i++) {
      // if not last tile
      if (i < n * n - 1) {
        // set blank to false
        board.push({ number: i, blank: false });
        // if last tile
      } else {
        // set blank to true
        board.push({ number: i, blank: true });
      }
    }
    // set state of empty to temporary empty object
    this.setState({ empty });
    // set state of board to temporary board array, then shuffle
    this.setState({ board }, this.shuffle);
  }

  shuffle() {
    // grid size
    let n = this.state.n;
    // game can't be solved in odd num of moves; only allow shuffle to create odd num of moves
    let shuffles;
    // before shuffling, if moves even
    if (this.state.moves % 2 === 0) {
      // make moves odd
      shuffles = 3;
      // if moves odd
    } else {
      // keep odd
      shuffles = 4;
    }
    for (let i = 0; i < shuffles; i++) {
      // find row and col of empty tile
      let emptyI = this.state.empty.index;
      let emptyRow = Math.floor(emptyI / n);
      let emptyCol = emptyI % n;
      // array of indexes of possible clicks
      let possible = [];
      // find indexes of possible clicks
      for (let i = 0; i < this.state.board.length; i++) {
        // find row and col of index
        let row = Math.floor(i / n);
        let col = i % n;
        // if index adjacent to empty tile
        if (row === emptyRow && Math.abs(col - emptyCol) === 1) {
          // add to possible clicks array
          possible.push(i);
        } else if (col === emptyCol && Math.abs(row - emptyRow) === 1) {
          possible.push(i);
        }
      }
      // randomly pick element from possible clicks array
      let random = Math.floor(Math.random() * possible.length);
      let clickedI = possible[random];
      // move
      this.move(clickedI, emptyI);
    }
    // set state to re-render
    this.setState({ win: false });
  }

  checkWin() {
    let i = 0;
    // for every tile in board
    for (let tile of this.state.board) {
      // is tile identifier not same as index in board
      if (tile.number !== i) {
        // win is false
        this.setState({ win: false });
        // exit function
        return;
      }
      i++;
    }
    // otherwise must be a win
    this.setState({ win: true });
    this.setState({ moves: 0 });
  }

  move(clickedI, emptyI) {
    // temporary board
    let board = this.state.board;
    // switch clicked and empty indexes
    let t = board[clickedI];
    board[clickedI] = board[emptyI];
    board[emptyI] = t;
    // temporary empty object
    let empty = this.state.empty;
    // change empty index to previous clicked index
    empty.index = clickedI;
    // temporary moves variable
    let moves = this.state.moves + 1;
    // update state
    this.setState({ board });
    this.setState({ empty });
    this.setState({ moves });
  }

  tileClicked(clickedI) {
    // grid size
    let n = this.state.n;
    // given clicked index, find clicked row and col, and find empty row and col from empty index in state
    let emptyI = this.state.empty.index;
    let clickedR = Math.floor(clickedI / n);
    let clickedC = clickedI % n;
    let emptyR = Math.floor(emptyI / n);
    let emptyC = emptyI % n;
    // if clicked tile is adjacent to empty tile
    if (clickedR === emptyR && Math.abs(clickedC - emptyC) === 1) {
      // swap the tiles
      this.move(clickedI, emptyI);
      // check win after successful click
      this.checkWin();
    } else if (clickedC === emptyC && Math.abs(clickedR - emptyR) === 1) {
      this.move(clickedI, emptyI);
      this.checkWin();
    }
  }

  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    console.log('handle uploading-', this.state.file);
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  render() {
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }
    return (
      <>
        {/* set container to larger than board */}
        <div className='container text-center' style={{ width: '500px', height: '500px' }}>
          <div className='row'>
            <h1>Sliding Puzzle</h1>
          </div>
          {/* mx-auto to center because set width + height */}
          <div className='row mx-auto fs-1 border border-dark' style={{ width: '400px', height: '400px' }}>
            {/* map each tile object in board to tile component sending tile object, index, and tile clicked handler */}
            {this.state.board.map((tile, index) => <Tile tile={tile} key={index} index={index} clickHandler={this.tileClicked}></Tile>)}
          </div>
          <div className='row'>
            <div className='col'>
              {/* <div className="previewComponent">
                <form onSubmit={(e) => this._handleSubmit(e)}>
                  <input className="fileInput"
                    type="file"
                    onChange={(e) => this._handleImageChange(e)} >
                  </input>
                </form>
              </div> */}
              {/* button reads shuffle if not win */}
              <button type='button' image={this.state.file} className='btn btn-primary btn-lg mt-3' onClick={this.shuffle}>{this.state.win ? 'Reset' : 'Shuffle'}</button>
              {/* declare win if win */}
              <h2 className='mt-2'>{this.state.win ? 'Win!' : ''}</h2>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
