import React, { Component } from 'react';
import ScrollView, { ScrollElement } from "./scroller";
import './App.css';

const items = [
  "Jason",
  "Joel",
  "John",
  "Jake",
  "Jordan"
]

class App extends Component {

  scrollTo = (name) => {
    this._scroller.scrollTo(name)
  }
  render() {
    return (
      <div>
        {
          items.map((name) => <button onClick={() => this.scrollTo(name)}>{name}</button>)
        }
        <ScrollView ref={(scroller) => this._scroller = scroller}>
          <div className="scroller">
            {
              items.map((name) => {
                return (
                  <ScrollElement name={name}>
                    <div className="item">
                      {name}
                    </div>
                  </ScrollElement>
                )
              })
            }
          </div>
        </ScrollView>
      </div>
    );
  }
}

export default App;
