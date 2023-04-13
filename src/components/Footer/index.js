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
      <div className="footer-social-container">
        <FaPinterestSquare
          className="social-icons"
          testId="pintrest-social-icon"
        />
        <FaInstagram className="social-icons" testId="instagram-social-icon" />
        <FaTwitter className="social-icons" testId="twitter-social-icon" />
        <FaFacebookSquare
          className="social-icons"
          testId="facebook-social-icon"
        />
      </div>
    </footer>
  )
}
