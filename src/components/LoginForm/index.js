import './index.css'

const LoginForm = props => {
  const {
    PassIdAttr,
    UserIdAttr,
    username,
    password,
    errMsg,
    readUsername,
    readPassword,
    sendLoginRequest,
  } = props

  return (
    <form className="login-form-main" onSubmit={e => sendLoginRequest(e)}>
      <div className="login-input-container">
        <label htmlFor={UserIdAttr} className="login-label">
          USERNAME
        </label>
        <input
          type="text"
          placeholder="Enter User Name"
          id={UserIdAttr}
          className="login-input-ele"
          value={username}
          onChange={e => readUsername(e)}
        />
      </div>
      <div className="login-input-container">
        <label htmlFor={PassIdAttr} className="login-label">
          PASSWORD
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          id={PassIdAttr}
          className="login-input-ele"
          value={password}
          onChange={e => readPassword(e)}
        />
        {errMsg.length !== 0 && <p className="login-error-msg">{errMsg}</p>}
      </div>
      <button type="submit" className="login-btn">
        Login
      </button>
    </form>
  )
}

export default LoginForm
