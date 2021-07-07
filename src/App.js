import React, { Component, ReactDOM } from "react";
import BroswerRouter from "react-router-dom/BroswerRouter";

import { CardList } from "./components/card-list/card-list.components";
import { SearchBox } from "./components/search-box/search-box.components";

import "./App.css";

ReactDOM.render(
  <BroswerRouter basename={process.env.PUBLIC_URL}>
    <App />
  </BroswerRouter>
);

class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchField: "",
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => this.setState({ monsters: users }));
  }

  handleChange = (e) => this.setState({ searchField: e.target.value });
  render() {
    const { monsters, searchField } = this.state;
    const filteredMonster = monsters.filter((monster) =>
      monster.name.toLowerCase().includes(searchField.toLocaleLowerCase())
    );
    return (
      <div className="App">
        <h1>Monster Rolodex</h1>
        <SearchBox
          placeholder="search monster"
          handleChange={this.handleChange}
        />
        <CardList monsters={filteredMonster} />
      </div>
    );
  }
}

export default App;
