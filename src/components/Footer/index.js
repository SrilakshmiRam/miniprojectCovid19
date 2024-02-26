import {VscGithubAlt} from 'react-icons/vsc'

import {FiInstagram} from 'react-icons/fi'

import {FaTwitter} from 'react-icons/fa'

import './index.css'

export default function Footer() {
  return (
    <div className="footer-container">
      <h1 className="covid19-text">
        COVID19<span className="india-text">INDIA</span>
      </h1>
      <p className="footer-text">
        we stand with everyone fighting on the front lines
      </p>
      <div className="logo-icons-container">
        <VscGithubAlt className="icon-logo" />
        <FiInstagram className="icon-logo" />
        <FaTwitter className="icon-logo" />
      </div>
    </div>
  )
}
