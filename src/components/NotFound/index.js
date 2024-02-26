import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="notfound-container">
    <img
      src="https://res.cloudinary.com/ddiyemmt3/image/upload/v1707202758/Group_7484_yxb1cf.png"
      alt="not-found-pic"
      className="notfound-image"
    />
    <h1 className="notfound-heading">PAGE NOT FOUND</h1>
    <p className="notfound-text">
      we are sorry, the page you requested could not be found
      <br />
      Please go back to the homepage
    </p>
    <Link to="/" className="nav-link">
      <button className="home-button" type="button">
        Home
      </button>
    </Link>
  </div>
)

export default NotFound
