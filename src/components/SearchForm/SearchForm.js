import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import Octicon from 'react-octicon'
import Autocomplete from 'react-autocomplete'

import searchTerms from './SearchTerms.json'
import './SearchForm.css'

/**
* @description SearchForm Class component. Controls the search input and the autocmplete for the input, displaying a selection of available search terms (loaded from a json file).
*/
class SearchForm extends Component {
  static propTypes = {
    /** The current search query for book Search.  */
    searchTerm: PropTypes.string,
    /** Callback function when the forms is submitted (or when an autompletele item is selected) */
    onBookSearch: PropTypes.func.isRequired
  }
  state = {
    /** Text value state  for the textbox form  */
    inputVal: ""
  }

  componentWillReceiveProps = nextProps => {
    if (this.state.location !== nextProps.location) {
      this.setState({inputVal: nextProps.searchTerm})
    }
  }

  /**
  * @description This function is called when a user selects an autocomplete item.
  * @param {inputVal} inputVal - The string value of the autocomplete item.
  */
  onSelect = (inputVal) => {
    this.setState({inputVal})
    this.bookSearch(inputVal)
  }

  /**
  * @description This function is called when the search form is submitted.
  * @param {Object} evt - onSubmit event Object.
  */
  onSubmit = (evt) => {
    evt.preventDefault()
    this.bookSearch(this.state.inputVal)
  }

  /**
  * @description This function passes a callback event when there is a book Search event.
  * @param {string} str - Search query string value.
  */
  bookSearch = (str) => {
    this.props.onBookSearch(str)
  }

  /**
  * @description This function will render the SearchForm.
  */
  render() {
    return (<div className="search-form">
      <Link to='/' className="close-search">
        <Octicon name="chevron-left" mega />Close
      </Link>
      <div className="autocomplete-wrapper">
        <form onSubmit={this.onSubmit}>
          <Autocomplete items={searchTerms.entry.map(e => ({"id": e, "label": e}))} shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1} getItemValue={item => item.label} renderItem={(item, highlighted) => <div key={item.id} style={{
                padding: '5px 0px 0px 15px',
                backgroundColor: highlighted
                  ? '#eee'
                  : 'transparent'
              }}>
              {item.label}
            </div>}
            value={this.state.inputVal} 
            onChange={e => this.setState({inputVal: e.target.value})}
            onSelect={this.onSelect}
            inputProps={{
              "placeholder" : "Search by title or author",
              "size" : 10
            }} menuStyle={{
              background: 'rgb(250, 250, 250)',
              maxHeight: '300px',
              position: 'fixed',
              overflow: 'auto',
              padding: '10px 0px 0px 0px',
              borderWidth: '0px 1px 1px 1px',
              borderStyle: 'solid',
              borderColor: '#cccccc',
              borderRadius: '0px 0px 5px 5px',
              zIndex: '100'
            }}/>
        </form>
      </div>
    </div>)
  }
}
export default withRouter(SearchForm)
