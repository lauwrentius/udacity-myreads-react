import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Octicon from 'react-octicon'

import './ShelfSelectBtn.css'

/**
* @description ShelfSelectBtn component. Dropdown button cto change shelf.
*/
class ShelfSelectBtn extends Component {
  static propTypes = {
      /** The current shelf value. */
      val: PropTypes.string.isRequired,
      /** Callback function when a book/s changes shelf */
      onShelfChange: PropTypes.func.isRequired
  }

  /** Available dropdown options for the select shelf */
  shelfOptions = [
    {value: "", label: "Move to...", isDisabled: true },
    {value: "currentlyReading", label: "Currently Reading", isDisabled: false },
    {value: "wantToRead", label: "Want to Read", isDisabled: false },
    {value: "read", label: "Read", isDisabled: false },
    {value: "none", label: "None", isDisabled: false },
  ]

  /**
  * @description This function will render the Book Shelf.
  */
  render(){
    const { val, onShelfChange } = this.props
    return (
      <div className="select-shelf-btn">
        <Octicon name="triangle-down" />
        <select value={val}
          onChange={ evt => onShelfChange(evt.target.value) }>
          {this.shelfOptions.map((option,i) =>
            <option key={i}
              value={option.value}
              disabled={option.isDisabled}>
              {option.label}
            </option>
          )}
        </select>
      </div>
    )
  }
}
export default ShelfSelectBtn;
