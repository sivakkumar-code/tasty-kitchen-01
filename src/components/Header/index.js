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

    return (
      <header className="header">
        <nav className="nav-desktop-container">
          <div className="nav-website-logo-container">
            <Link to="/" className="nav-link">
              <img
                src="https://res.cloudinary.com/dmhszvxi1/image/upload/v1681138972/Tasty_Kitchens/tasty_kitchens_logo_svg_qrs64z.svg"
                alt="website logo"
                className="nav-website-logo"
              />
            </Link>
            <h1 className="nav-logo-title">Tasty Kitchens</h1>
          </div>
          <ul className="desktop-ul-nav-container">
            <li className="desktop-li-nav">
              <Link to="/" className="nav-link">
                <p
                  className={`nav-options ${
                    selected === 'Home' ? 'nav-selected' : ''
                  }`}
                >
                  Home
                </p>
              </Link>
            </li>
            <li className="desktop-li-nav">
              <Link to="/cart" className="nav-link">
                <p
                  className={`nav-options ${
                    selected === 'Cart' ? 'nav-selected' : ''
                  }`}
                >
                  Cart
                </p>
              </Link>
            </li>

            <li className="desktop-li-nav">
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
          <div className="nav-website-logo-container">
            <Link to="/" className="nav-link">
              {' '}
              <img
                src="https://res.cloudinary.com/dmhszvxi1/image/upload/v1681138972/Tasty_Kitchens/tasty_kitchens_logo_svg_qrs64z.svg"
                alt="website logo"
                className="nav-website-logo-mobile"
              />
            </Link>

            <h1 className="nav-logo-title-mobile">Tasty Kitchens</h1>
          </div>
          <button
            type="button"
            className="hamburger-btn"
            onClick={this.onHamburgerBtnClick}
          >
            <GiHamburgerMenu className="hamburger-icon" />
          </button>
        </nav>
        {isHamburgerClicked && (
          <div className="drop-down-container">
            <ul className="desktop-ul-nav-container">
              <li className="desktop-li-nav">
                <Link to="/" className="nav-link">
                  <p
                    className={`nav-options ${
                      selected === 'Home' ? 'nav-selected' : ''
                    }`}
                  >
                    Home
                  </p>
                </Link>
              </li>
              <li className="desktop-li-nav">
                <Link to="/cart" className="nav-link">
                  <p
                    className={`nav-options ${
                      selected === 'Cart' ? 'nav-selected' : ''
                    }`}
                  >
                    Cart
                  </p>
                </Link>
              </li>

              <li className="desktop-li-nav">
                <button
                  type="button"
                  className="nav-logout-btn"
                  onClick={this.onLogoutBtnClick}
                >
                  Logout
                </button>
              </li>
            </ul>
            <button
              type="button"
              className="close-btn"
              onClick={this.onCloseBtnClick}
            >
              <AiFillCloseCircle className="close-icon" />
            </button>
          </div>
        )}
      </header>
    )
  }
}

export default withRouter(Header)
