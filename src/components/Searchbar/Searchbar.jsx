import PropTypes from 'prop-types'
import React, { Component } from 'react'

export class Searchbar extends Component {
  static propTypes = {}

    render() {
        const { submitHandler } = this.props;
    return (
        <header class="searchbar">
            <form class="form" onSubmit={submitHandler}>
                <button type="submit" class="button">
                    <span class="button-label">Search</span>
                </button>

                <input
                    name="search"
                    class="input"
                    type="text"
                    autocomplete="off"
                    autofocus
                    placeholder="Search images and photos"
                />
            </form>
        </header>
    )
  }
}

export default Searchbar