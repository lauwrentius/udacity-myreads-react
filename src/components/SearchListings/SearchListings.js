import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import SearchForm from '../SearchForm'
import Shelf from '../Shelf'
import * as BooksAPI from '../../utils/BooksAPI'

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
    // bookResults: [],
    emptyResults: false,
    err: ""
  }
  componentWillMount = () =>{
    // let searchStr = this.props.location.search.substring(1)
    // if(searchStr.length !== 0)
    //   this.bookSearch(searchStr)
    // else
    //   this.setState({bookResults: [], emptyResults: false})
  }
  componentWillReceiveProps = nextProps => {
    // console.log(this.props.location, "!==",nextProps.location)
    // if (this.props.location !== nextProps.location) {
    // let searchStr = nextProps.location.search.substring(1)
    // this.bookSearch(searchStr)
    // }
  }

  // onBookSearch = (str, evt) => {
  //   this.props.history.push('/search?'+str)
  // }

  // bookSearch = (str) =>{
  //   str = decodeURI(str)
  //   if(str.trim() === ""){
  //     this.setState({bookResults: [], emptyResults: false})
  //     return
  //   }
  //   console.log("SEARCH",str,"TERMS");
  //   BooksAPI.search(str)
  //     .then(res => {
  //       console.log("RES", res);
  //       if(res.error){
  //         this.setState({bookResults: [], emptyResults: true,
  //           err: "Query not found"})
  //         return
  //       }
  //       let bookResults = res.filter(
  //         book => !this.props.books.find( e => e.id === book.id))
  //
  //       if(res.length === 0)
  //         this.setState({bookResults, emptyResults: true, err: ""})
  //       else
  //         this.setState({bookResults, emptyResults: false})
  //     }).catch(res => {
  //       this.setState({bookResults: [], emptyResults: true,
  //         err: "Query not found"})
  //     })
  // }

  render(){
    const { bookSearch, onShelfChange, onBookSearch, onInfoClick } = this.props
    const { bookResults, emptyResults, err } = this.state

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
            <strong>Sorry, No books were found.</strong><br />
            {err}
          </p>
        </div>
      </div>
    )
  }
}

export default withRouter(SearchListings);
// searchVal={searchVal}
