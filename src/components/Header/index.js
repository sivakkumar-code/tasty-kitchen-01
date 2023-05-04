import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiFillCloseCircle} from 'react-icons/ai'
import Cookies from 'js-cookie'

import './index.css'

class Header extends Component {
  state = {isHamburgerClicked: false, selected: 'Home'}

  componentDidMount() {
    const {match} = this.props
    const {url} = match
    if (url === '/') {
      this.setState({selected: 'Home'})
    } else {
      this.setState({selected: 'Cart'})
    }
  }

  onLogoutBtnClick = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  onHamburgerBtnClick = () =>
    this.setState(prevState => ({
      isHamburgerClicked: !prevState.isHamburgerClicked,
    }))

  onCloseBtnClick = () => this.setState({isHamburgerClicked: false})

  render() {
    const {isHamburgerClicked, selected} = this.state
    const cartListItems = JSON.parse(localStorage.getItem('cartData'))
    console.log(cartListItems.length)

    return (
      <header className="header">
        <nav className="nav-desktop-container">
          <ul className="desktop-ul-container">
            <li>
              <Link to="/" className="nav-link">
                <img
                  src="https://res.cloudinary.com/dmhszvxi1/image/upload/v1681138972/Tasty_Kitchens/tasty_kitchens_logo_svg_qrs64z.svg"
                  alt="website logo"
                  className="nav-website-logo"
                />
              </Link>
            </li>
            <li className="tasty-kitchen-list nav-logo-title">
              <h1 className="nav-logo-title">Tasty Kitchens</h1>
            </li>
            <li className="nav-link-list">
              <Link
                to="/"
                className={`nav-link nav-options ${
                  selected === 'Home' ? 'nav-selected' : ''
                }`}
              >
                Home
              </Link>
            </li>
            <li className="nav-link-list">
              <Link
                to="/cart"
                className={`nav-link nav-options ${
                  selected === 'Cart' ? 'nav-selected' : ''
                }`}
              >
                Cart
              </Link>
              {cartListItems.length !== 0 ? (
                <span className="cart-item-count">{cartListItems.length}</span>
              ) : (
                ''
              )}
            </li>
            <li>
              <button
                type="button"
                className="nav-logout-btn"
                onClick={this.onLogoutBtnClick}
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
        <nav className="nav-mobile-container">
          <ul className="nav-mobile-ul-container">
            <li>
              <Link to="/" className="nav-link">
                <img
                  src="https://res.cloudinary.com/dmhszvxi1/image/upload/v1681138972/Tasty_Kitchens/tasty_kitchens_logo_svg_qrs64z.svg"
                  alt="website logo"
                  className="nav-website-logo-mobile"
                />
              </Link>
            </li>
            <li className="tasty-kitchen-list nav-logo-title-mobile">
              <h1 className="nav-logo-title-mobile">Tasty Kitchens</h1>
            </li>
            <li>
              <button
                type="button"
                className="hamburger-btn"
                onClick={this.onHamburgerBtnClick}
              >
                <GiHamburgerMenu className="hamburger-icon" />
              </button>
            </li>
          </ul>
        </nav>
        {isHamburgerClicked && (
          <div className="drop-down-container">
            <ul className="mobile-drop-down-ul-container">
              <li className="mobile-li-nav">
                <Link
                  to="/"
                  className={`nav-link nav-options ${
                    selected === 'Home' ? 'nav-selected' : ''
                  }`}
                >
                  Home
                </Link>
              </li>
              <li className="mobile-li-nav">
                <Link
                  to="/cart"
                  className={`nav-link nav-options ${
                    selected === 'Cart' ? 'nav-selected' : ''
                  }`}
                >
                  Cart
                </Link>
                {cartListItems.length !== 0 ? (
                  <span className="cart-item-count">
                    {cartListItems.length}
                  </span>
                ) : (
                  ''
                )}
              </li>

              <li className="mobile-li-nav">
                <button
                  type="button"
                  className="nav-logout-btn"
                  onClick={this.onLogoutBtnClick}
                >
                  Logout
                </button>
              </li>
              <li className="mobile-close-btn-container">
                <button
                  type="button"
                  className="close-btn"
                  onClick={this.onCloseBtnClick}
                >
                  <AiFillCloseCircle className="close-icon" />
                </button>
              </li>
            </ul>
          </div>
        )}
      </header>
    )
  }
}

export default withRouter(Header)
