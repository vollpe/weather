import React, {Component} from 'react';

class Header extends Component {

    render() {
        return <header className="app-header">
            <form className="search-form" role="search" onSubmit={this.props.handleSearch}>
                <div className="search-box">
                    <input type="search" name="search" id="search" placeholder="Type city name"/>
                    <button type="submit" className="search-button"><i className="fas fa-search"/></button>
                </div>
            </form>
            <div className="header-nav-menu">
                <button href="#" className="header-tab">Today</button>
                <button href="#" className="header-tab" disabled>Tomorrow</button>
                <button href="#" className="header-tab" disabled>10 days</button>
            </div>
        </header>
    }
}

export {Header};