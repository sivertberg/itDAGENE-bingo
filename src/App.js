import React, { Component } from 'react';
import BingoCell from './components/BingoCell';
import Radio from './components/Radio';
import './App.css';
import logo from './github.svg';

class App extends Component {

  constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleCellChange = this.handleCellChange.bind(this);
  }

  state = {
      text: [],
      chosen_cells: [],
      bingo_id: 0,
      bingo_rows: [],
      bingo_cols: [],
      bingo_diagonal_down: false,
      bingo_diagonal_up: false,
      is_bingo: false
  };

  componentDidMount() {
      this.generateBoard();
      document.title = "Tinderbingo"
  }

  handleChange = (value) => {
      this.generateBoard(value);
  };

  handleCellChange = (value) => {
      let cells = this.state.chosen_cells;
      cells[value%4][Math.floor(value/4)] = !cells[value%4][Math.floor(value/4)];
      let bingo_rows = this.state.bingo_rows;
      let bingo_cols = this.state.bingo_cols;
      let bingo_diagonal_down = this.state.bingo_diagonal_down;
      let bingo_diagonal_up = this.state.bingo_diagonal_up;
      let is_bingo = false;
      console.log(this.state.chosen_cells);

      for (let i = 0; i < 4; i++) {
          if(!this.state.bingo_cols[i]) {
              let colBingo = true;
              for (let j = 0; j < 4; j++) {
                  if (!cells[i][j]) {
                      colBingo = false;
                  }
              }
              if(colBingo) {
                  console.log("col bingo!");
                  bingo_cols[i] = true;
                  console.log(bingo_cols);
                  is_bingo = true;
              }
          }
      }

      if (!bingo_diagonal_down) {
          let diagBingoDown = true;
          for (let i = 0; i < 4; i++) {

              if (!cells[i][i]) {
                  diagBingoDown = false;
              }
          }

          if(diagBingoDown) {
              console.log("diagonal bingo!");
              bingo_diagonal_down = true;
              is_bingo = true;
          }
      }

      if(!bingo_diagonal_up) {
          let diagBingoUp = true;
          for (let i = 0; i < 4; i++) {

              if (!cells[3-i][i]) {
                  diagBingoUp = false;
              }
          }

          if(diagBingoUp) {
              console.log("diagonal bingo!");
              bingo_diagonal_up = true;
              is_bingo = true;
          }
      }


      for (let i = 0; i < 4; i++) {
          if(!this.state.bingo_rows[i]) {
              let rowBingo = true;
              for (let j = 0; j < 4; j++) {
                  if (!cells[j][i]) {
                      rowBingo = false;
                  }
              }
              if (rowBingo) {
                  console.log("row bingo!");
                  bingo_rows[i] = true;
                  console.log(bingo_rows);
                  is_bingo = true;
              }
          }
      }

      this.setState({
          chosen_cells: cells,
          bingo_rows: bingo_rows,
          bingo_cols: bingo_cols,
          bingo_diagonal_down: bingo_diagonal_down,
          bingo_diagonal_up: bingo_diagonal_up,
          is_bingo: is_bingo
      });
  };

  static generatePicks(value = "b") {
      let picks = [];
      for (let i = 0; i < 16; i++) {

          let k = Math.floor(Math.random() * 103);

          if(value === "m") {
              while (k >= 87) {
                  k = Math.floor(Math.random() * 103);
              }
          }

          else if(value === "f") {
              while (68 < k && k < 87) {
                  k = Math.floor(Math.random() * 103);
              }
          }

          while(picks.indexOf(k) > -1) {
              k = Math.floor(Math.random() * 69);
          }
          picks[i] = k;
      }
      return picks;
  }

  generateBoard = (value = "b") => {
      let rawFile = new XMLHttpRequest();
      rawFile.open("GET", require("./bingo.txt"), false);
      rawFile.onreadystatechange = () => {
          if (rawFile.readyState === 4) {
              if (rawFile.status === 200 || rawFile.status === 0) {

                  let allText = rawFile.responseText;

                  let picks = App.generatePicks(value);

                  let pickedText = allText.split("\n").filter(
                      (item, key) => { return picks.indexOf(key) > -1 }
                  );

                  let matrix = [];
                  for(let i=0; i<4; i++) {
                      matrix[i] = [];
                      for(let j=0; j<4; j++) {
                          matrix[i][j] = false;
                      }
                  }

                  this.setState({
                      text: pickedText,
                      bingo_id: this.state.bingo_id+16,
                      chosen_cells: matrix,
                      bingo_rows: [],
                      bingo_cols: [],
                      bingo_diagonal_down: false,
                      bingo_diagonal_up: false,
                  });

              }
          }
      };
      rawFile.send(null);
  };

  render() {
    return (
      <div className="App">

          <div className="github">
              <a href={"https://github.com/Magssch/Tinder-bingo-web"}>
                  <img src={logo} style={{maxHeight: 50, maxWidth: "6vw"}} alt="Github" />
                  <br/>
                  <div>Regler</div>
              </a>
          </div>
          <header className="App-header">
            <span className="logo">
              <span role="img" aria-label="flame">🔥</span>
              <span> Tinderbingo</span>
            </span>
            <div className="categories">
              <Radio text={"Menn"} name={"gender"} value={"m"} checked={true} handleChange={this.handleChange}/>
              <Radio text={"Kvinner"} name={"gender"} value={"f"} handleChange={this.handleChange}/>
              <Radio text={"Begge"} name={"gender"} value={"b"} handleChange={this.handleChange}/>
            </div>
          </header>
          <div className="bingoBoard">
              {
                this.state.text.map((item, key = 0) => {
                    key++;
                    return <BingoCell key={this.state.bingo_id + key} id={key-1} content={item} handleCellChange={this.handleCellChange}/>;
                })
              }
          </div>

          <div className={this.state.is_bingo ? "popup show" : "popup"} onClick={() => this.setState({is_bingo: false})}>
              <div className="bingotext">
                  <span role="img" aria-label="flame">🔥</span>
                  <span>Bingo!</span>
                  <span role="img" aria-label="flame">🔥</span>
                  <p>(Trykk for å lukke)</p>
              </div>
          </div>
      </div>
    );
  }
}

export default App;
