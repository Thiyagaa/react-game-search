import React from "react";
import Table from "./Table.js"


class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      games: []
    };
    //this.props.childComponentLoaded=false;
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ query: e.target.value });
  }
  handleSearch() {
    var searchUrl = `http://localhost:9090/games?s=${this.state.query}`;
    fetch(searchUrl)
      .then(response => {
        return response.json();
      })
      .then(jsonData => {
        this.setState({ games: jsonData });
      });
  }
  render() {
    return (
      <div>
        <div>
          <input type="text"  value={this.state.query}  onChange={e=>{this.handleChange(e);}} />
          <button onClick={this.handleSearch}> Search </button>
        </div>
        {this.state.games ? (
          <Table items={this.state.games}/>
        ) : (
          <p></p>
        )}
        <div />
      </div>
    );
  }
}
export default Search;
