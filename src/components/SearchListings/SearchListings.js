import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import SearchForm from '../SearchForm'
import Shelf from '../Shelf'

import './SearchListings.css'

/**
* @description SearchListings Class component. Displays book search result shelf and searchForm.
*/
class SearchListings extends Component {
  static propTypes = {
    /** Book Search Object. Contains the search terms and Array of books Search Results  */
    bookSearch: PropTypes.shape({
      searchTerm: PropTypes.string,
      searchResults: PropTypes.array
    }),
    /** Callback function when book changes shelf */
    onShelfChange: PropTypes.func.isRequired,
    /** Callback function when the searchForm is submitted */
    onBookSearch: PropTypes.func.isRequired,
    /** Callback function when book info button is clicked */
    onInfoClick: PropTypes.func.isRequired
  }

  state = {
    /** emptyResults state, toggled when the search result for the books is empty */
    emptyResults: false
  }
  /**
  * @description This function is toggling the emtpy result state whever the component will recevie props.
  * @param {object} nextProps - next prop for SearchListings
  */
  componentWillReceiveProps = nextProps => {
    if(nextProps.bookSearch.searchTerm !== "" &&
      nextProps.bookSearch.searchResults.length === 0)
      this.setState({emptyResults: true})
    else
      this.setState({emptyResults: false})
  }

  /**
  * @description This function will render the SearchListings.
  */
  render(){
    const { bookSearch, onShelfChange, onBookSearch, onInfoClick } = this.props
    const { emptyResults } =  this.state

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

export default withRouter(SearchListings)
