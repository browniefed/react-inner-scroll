import React, { Component } from "react";
import "./App.css";
import ScrollView, { ScrollElement } from "./scroller";

import items from "./data";

class App extends Component {
  scrollTo = (name) => {
    this._scroller.scrollTo(name);
  }
  render() {
    return (
      <div className="app">
        {
          items.map(({name}) => <button onClick={() => this.scrollTo(name)}>{name}</button>)
        }
        <ScrollView ref={scroller => this._scroller = scroller}>
          <div className="scroller">
            {items.map(({ name, image }) => {
              return (
                <ScrollElement name={name}>
                  <div className="item">
                    <img src={image} />
                    {name}
                  </div>
                </ScrollElement>
              );
            })}
          </div>
        </ScrollView>
      </div>
    );
  }
}

export default App;
