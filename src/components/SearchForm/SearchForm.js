import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import Octicon from 'react-octicon'
import Autocomplete from 'react-autocomplete'

import searchTerms from './SearchTerms.json'
import './SearchForm.css'

class SearchForm extends Component {
  static propTypes = {
    searchTerm: PropTypes.string,
    onBookSearch: PropTypes.func.isRequired
  }
  state = {
    inputVal: ""
  }

  componentWillReceiveProps = nextProps => {
    // let inputVal = decodeURI(nextProps.location.search.substring(1))

    if (this.state.location !== nextProps.location) {
      console.log(this.state.location,nextProps.location)
      // this.setState({inputVal: nextProps.searchTerm})
    }
  }

  onSelect = (inputVal) => {
    this.setState({ inputVal })
    this.bookSearch(inputVal)
  }
  onSubmit = (evt) => {
    evt.preventDefault()
    this.bookSearch(this.state.inputVal)
  }
  bookSearch = (str) => {
    this.props.onBookSearch(str)
  }

  render() {
    return (
      <div className="search-form">
        <Link to='/' className="close-search">
          <Octicon name="chevron-left" mega/>Close
        </Link>
        <div className="autocomplete-wrapper">
          <form onSubmit={this.onSubmit}>
          <Autocomplete
            items={ searchTerms.entry.map(e=>({"id": e, "label": e})) }
            shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
            getItemValue={item => item.label}
            renderItem={(item, highlighted) =>
              <div
                key={item.id}
                style={{ padding: '5px 0px 0px 15px', backgroundColor: highlighted ? '#eee' : 'transparent'}}
              >
                {item.label}
              </div>
            }
            value={this.state.inputVal}
            onChange={e => this.setState({ inputVal: e.target.value })}
            onSelect={this.onSelect}
            inputProps={{
              "placeholder": "Search by title or author",
              "size": 10
            }}
            menuStyle={{background: 'rgb(250, 250, 250)',maxHeight: '300px', position: 'fixed', overflow: 'auto', padding:'10px 0px 0px 0px', borderWidth: '0px 1px 1px 1px', borderStyle: 'solid', borderColor: '#cccccc', borderRadius: '0px 0px 5px 5px', zIndex: '100'
            }}
          />
        </form>
        </div>
      </div>
    )
  }
}

export default withRouter(SearchForm);

// <div>{JSON.stringify(this.state)}</div>
// <div>{JSON.stringify(this.props)}</div>

// <form onSubmit={this.onSubmit} className="search-form-input-wrapper">
//   <input type="text"
//     value={this.state.inputVal}
//     onChange={this.handleChange}
//     placeholder="Search by title or author"/>
// </form>
