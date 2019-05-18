import React, { Component } from 'react';
import Search from './searchComponent';
import Weather from './weatherComponent';
import Graph from './graphComponent';

// Main parent component
class App extends Component {
    state = {
        // Name of place to be searched for
        place: ""
    }

    // Only render Weather and Graph component when some place has been chosen
    render() {
        return (<React.Fragment>
            <Search key={1}
                value={this.state}
                onSearch={this.handleSearch} />
            {this.state.place != "" ?
                (<div>
                    <Weather key={2}
                        value={this.state.place} />

                    <Graph key={3}
                        value={this.state.place} />
                </div>) : (false)}
        </React.Fragment>);
    }

    // Detect click on search button and send required data to children
    handleSearch = (placeChosen) => {
        console.log("Searching for Place " + placeChosen);
        this.setState({
            place: placeChosen
        });
    };

}

export default App;