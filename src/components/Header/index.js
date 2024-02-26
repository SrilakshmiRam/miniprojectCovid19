import {Link, withRouter} from 'react-router-dom'

import {Component} from 'react'
import {IoMdCloseCircle} from 'react-icons/io'

import {GiHamburgerMenu} from 'react-icons/gi'

import './index.css'

class Header extends Component {
  state = {showMenubar: false}

  onClickMenubar = () => {
    this.setState(prevState => ({showMenubar: !prevState.showMenubar}))
  }

  onClickClose = () => {
    this.setState({
      showMenubar: false,
    })
  }

  onClickLogoText = () => {
    const {history} = this.props
    history.replace('/')
    console.log('ram')
  }

  render() {
    const {showMenubar} = this.state

    return (
      <>
        <nav className="header-container">
          <h1 className="covid19-text" onClick={this.onClickLogoText}>
            COVID19<span className="india-text">INDIA</span>
          </h1>
          <ul className="nav-items">
            <Link to="/" className="nav-link">
              <li>
                <button type="button" className="home-text">
                  Home
                </button>
              </li>
            </Link>
            <Link to="/about" className="nav-link">
              <li>
                <button type="button" className="about-text">
                  About
                </button>
              </li>
            </Link>
          </ul>
          <GiHamburgerMenu className="menuBar" onClick={this.onClickMenubar} />
        </nav>

        {showMenubar && (
          <div className="mobile-view">
            <div className="nav-list-items">
              <Link to="/" className="nav-link">
                <button type="button" className="mobieview-text">
                  Home
                </button>
              </Link>
              <Link to="/about" className="nav-link">
                <button type="button" className="mobieview-text">
                  About
                </button>
              </Link>
            </div>
            <IoMdCloseCircle
              className="closeIcon"
              onClick={this.onClickClose}
            />
          </div>
        )}
      </>
    )
  }
}

export default withRouter(Header)
