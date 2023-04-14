import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'

import './index.css'

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-website-logo-container">
        <img
          src="https://res.cloudinary.com/dmhszvxi1/image/upload/v1681282010/Tasty_Kitchens/desktop_website_logo_white_xu6740.png"
          alt="website-footer-logo"
          className="footer-website-logo"
        />
        <h1 className="footer-logo-title">Tasty Kitchens</h1>
      </div>
      <p className="footer-typo">
        The only thing we are serious about is food. Contact us on
      </p>
      <ul className="footer-social-container">
        <li className="icon-container">
          <FaPinterestSquare
            className="social-icons"
            testid="pintrest-social-icon"
          />
        </li>
        <li className="icon-container">
          <FaInstagram
            className="social-icons"
            testid="instagram-social-icon"
          />
        </li>
        <li className="icon-container">
          <FaTwitter className="social-icons" testid="twitter-social-icon" />
        </li>
        <li className="icon-container">
          <FaFacebookSquare
            className="social-icons"
            testid="facebook-social-icon"
          />
        </li>
      </ul>
    </footer>
  )
}
