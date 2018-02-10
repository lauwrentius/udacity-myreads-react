import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import SearchForm from '../SearchForm'
import Shelf from '../Shelf'

import './SearchListings.css'
class SearchListings extends Component {
  static propTypes = {
    bookSearch: PropTypes.shape({
      searchTerm: PropTypes.string,
      searchResults: PropTypes.array
    }),
    onShelfChange: PropTypes.func,
    onBookSearch: PropTypes.func,
    onInfoClick: PropTypes.func
  }

  state = {
    emptyResults: false
  }
  componentWillMount = () =>{
  }
  componentWillReceiveProps = nextProps => {
    if(nextProps.bookSearch.searchTerm !== "" &&
      nextProps.bookSearch.searchResults.length === 0)
      this.setState({emptyResults: true})
    else
      this.setState({emptyResults: false})
  }


  render(){
    const { bookSearch, onShelfChange, onBookSearch, onInfoClick } = this.props
    const { emptyResults } =  this.state
    // console.log(this.props)

    return(
      <div className="search-listings">
        <SearchForm
            searchTerm={bookSearch.searchTerm}
            onBookSearch={onBookSearch}>
        </SearchForm>
        <Shelf
          id="none"
          title="Search Result"
          books={bookSearch.searchResults}
          onShelfChange={onShelfChange}
          onInfoClick={onInfoClick}>
        </Shelf>
        <div className={"emptyResults "+(emptyResults?"":"hidden")}>
          <p>
            <strong>Sorry, No books were found.</strong>
          </p>
        </div>
      </div>
    )
  }
}

export default withRouter(SearchListings);
// searchVal={searchVal}
