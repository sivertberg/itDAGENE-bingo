import React, { Component } from 'react';
import BingoCell from './components/BingoCell';
import Radio from './components/Radio';
import './App.css';

class App extends Component {

  constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
  }

  state = {
      text: []
  };

  componentDidMount() {
      this.generateBoard();
      document.title = "Tinderbingo"
  }

  handleChange = (value) => {
    console.log(value)
    this.generateBoard(value);
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
                  this.setState({
                      text: pickedText
                  });

              }
          }
      };
      rawFile.send(null);
  };

  render() {
    return (
      <div className="App">
          <header className="App-header">
            <span className="logo">
              <span role="img" aria-label="flame">🔥</span>
              <span> Tinderbingo!</span>
            </span>
            <div style={{display: "flex", flexDirection: "row", marginTop: 5}}>
              <Radio text={"Menn"} name={"gender"} value={"m"} checked={true} handleChange={this.handleChange}/>
              <Radio text={"Kvinner"} name={"gender"} value={"f"} handleChange={this.handleChange}/>
              <Radio text={"Begge"} name={"gender"} value={"b"} handleChange={this.handleChange}/>
            </div>
          </header>
          <div className="bingoBoard">
              {
                this.state.text.map((item, key) => {
                    return <BingoCell key={key} content={item}/>;
                })
              }
          </div>
      </div>
    );
  }
}

export default App;
