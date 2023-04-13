import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import LoginForm from '../LoginForm'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', errMsg: ''}

  readUsername = e => this.setState({username: e.target.value})

  readPassword = e => this.setState({password: e.target.value})

  loginSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 2})
    const {history} = this.props
    history.replace('/')
  }

  loginFailure = errMsg => this.setState({errMsg, username: '', password: ''})

  sendLoginRequest = async e => {
    e.preventDefault()
    const {username, password} = this.state
    const sendBody = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(sendBody),
    }
    const response = await fetch(url, options)
    const responseData = await response.json()
    console.log(responseData)
    if (response.ok) {
      this.loginSuccess(responseData.jwt_token)
    } else {
      this.loginFailure(responseData.error_msg)
    }
  }

  render() {
    const {username, password, errMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-responsive-container">
        <div className="login-bg-container-desktop">
          <div className="login-left-section">
            <div className="login-inputs-container">
              <div className="login-header">
                <div className="login-logo-text-container">
                  <img
                    src="https://res.cloudinary.com/dmhszvxi1/image/upload/v1681138972/Tasty_Kitchens/tasty_kitchens_logo_svg_qrs64z.svg"
                    alt="website logo"
                  />
                  <h1 className="login-logo-title">Tasty Kitchens</h1>
                </div>
                <h1 className="login-login-heading">Login</h1>
              </div>
              <div className="login-main">
                <LoginForm
                  PassIdAttr="password-input-desktop"
                  UserIdAttr="username-input-desktop"
                  username={username}
                  password={password}
                  errMsg={errMsg}
                  readUsername={this.readUsername}
                  readPassword={this.readPassword}
                  sendLoginRequest={this.sendLoginRequest}
                />
              </div>
            </div>
          </div>
          <div className="login-right-section">
            <img
              src="https://res.cloudinary.com/dmhszvxi1/image/upload/v1681130225/Tasty_Kitchens/desktop_login_page_image_pa3jgi.png"
              alt="website login"
              className="login-image"
            />
          </div>
        </div>

        <div className="login-bg-container-mobile">
          <div className="login-mobile-top-section">
            {/* <img
              src="https://res.cloudinary.com/dmhszvxi1/image/upload/v1681130225/Tasty_Kitchens/desktop_login_page_image_pa3jgi.png"
              alt="website login"
              className="login-image-tablet"
            /> */}
            <img
              src="https://res.cloudinary.com/dmhszvxi1/image/upload/v1681130236/Tasty_Kitchens/mobile_login_page_image_jkyv1q.png"
              alt="website login"
              className="login-image-mobile"
            />
            <h1 className="login-login-heading heading-mobile">Login</h1>
          </div>
          <div className="login-main-mobile">
            <LoginForm
              PassIdAttr="password-input-mobile"
              UserIdAttr="username-input-mobile"
              username={username}
              password={password}
              errMsg={errMsg}
              readUsername={this.readUsername}
              readPassword={this.readPassword}
              sendLoginRequest={this.sendLoginRequest}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Login
