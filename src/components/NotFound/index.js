import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="not-found-bg-container">
    <div className="not-found-main-container">
      <img
        src="https://res.cloudinary.com/dmhszvxi1/image/upload/v1681130286/Tasty_Kitchens/page_not_found_image_khx7ac.png"
        alt="not found"
        className="not-found-img"
      />
      <h1 className="not-found-title">Page Not Found</h1>
      <p className="not-found-para">
        We are sorry, the page you requested could not be found. Please go back
        to the homepage
      </p>
      <Link to="/" className="nav-link">
        <button type="button" className="btn-common-orange">
          Home Page
        </button>
      </Link>
    </div>
  </div>
)

export default NotFound
