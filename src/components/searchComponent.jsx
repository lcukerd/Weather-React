import React, { Component } from 'react';
import Autocomplete from 'react-autocomplete';
import { queryAutoComplete } from './../API';

class Search extends Component {
    state = {

        // Place to searched for
        place: "",

        // Dynamic AutoComplete Suggestions 
        autoCompleteSuggestions: []

    }
    render() {
        return (<div>
            <Autocomplete
                getItemValue={(item) => item.label}
                items={this.state.autoCompleteSuggestions}
                renderItem={(item, isHighlighted) =>
                    <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                        {item.label}
                    </div>
                }
                value={this.state.place}
                onChange={(e) => this.queryPlace(e)}
                onSelect={(val) => this.setState({
                    place: val
                })}
            />
            <button onClick={this.search}>
                Search
                </button>
        </div>);
    }

    queryPlace = evt => {
        this.setState({
            place: evt.target.value
        });
        // Google Places AutoComplete API is paid as mentioned here: https://developers.google.com/places/web-service/usage-and-billing
        // APi not implemented, written text will taken as requested place for weather

        // queryAutoComplete(evt.target.value, this.handleSuggestions);
    };

    search = () => {
        this.props.onSearch(this.state.place);
    }


}

export default Search;