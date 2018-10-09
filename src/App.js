import React, {Component} from 'react';
import {Header} from './components/header/Header'
import {Weather} from "./components/weather/Weather";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            city: null
        };
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(event) {
        event.preventDefault();
        this.setState({city: event.target.search.value});
    }

    render() {
        return (
            <div className="app">
                <Header handleSearch={this.handleSearch} />
                <Weather city={this.state.city} />
            </div>
        );
    }
}

export default App;
