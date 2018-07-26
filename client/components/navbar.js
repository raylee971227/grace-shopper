import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Dropdown, Menu} from 'semantic-ui-react'

const options = [
  {key: 1, text: 'Edit Account', value: 1},
  {key: 2, text: 'Orders', value: 2},
  {key: 3, text: 'Log Out', value: 3}
]

const Navbar = ({handleClick, isLoggedIn}) => (
  <div id="navbar-container">
    <h1>Isomers</h1>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <div className="ui menu">
            <Link to="/" className="item">
              Home
            </Link>
            <Link to="/products" className="item">
              Products
            </Link>
            <Link to="/about-us" className="item">
              About Us
            </Link>
            <div className="right menu">
              <Link to="/cart" className="item">
                Cart
              </Link>
              <Menu compact>
                <Dropdown text='My Account' options={options} simple item />
              </Menu>
              <a href="#" className="item" onClick={handleClick}>
                Logout
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <div className="ui menu">
            <Link to="/" className="item">
              Home
            </Link>
            <Link to="/products" className="item">
              Products
            </Link>
            <Link to="/about" className="item">
              About
            </Link>
            <div className="right menu">
              <Link to="/cart" className="item">
                Cart
              </Link>
              <Link to="/login" className="item">
                Login
              </Link>
              <Link to="/sign-up" className="item">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
