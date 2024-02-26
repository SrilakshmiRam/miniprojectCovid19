import {Link} from 'react-router-dom'

import {BiChevronRightSquare} from 'react-icons/bi'
import './index.css'

const SearchVarients = props => {
  const {varientDetails} = props
  const {stateCode, stateName} = varientDetails

  return (
    <Link to={`/state/${stateCode}`} className="nav-link">
      <li className="searchstate-item">
        <p className="state-name">{stateName}</p>
        <div className="code-container">
          <span className="state-code">{stateCode}</span>
          <BiChevronRightSquare className="searchvarient-icon" />
        </div>
      </li>
    </Link>
  )
}

export default SearchVarients
