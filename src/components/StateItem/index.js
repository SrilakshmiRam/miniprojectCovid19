import './index.css'

const StateItem = props => {
  const {statsDetails} = props
  const {
    confirmedCases,
    active,
    recoveredCases,
    deceasedCases,
    stateName,
    population,
  } = statsDetails

  return (
    <li className="stat-item">
      <p className="state">{stateName}</p>
      <p className="confirmed-text">{confirmedCases}</p>
      <p className="active-text">{active}</p>
      <p className="recovered-text">{recoveredCases}</p>
      <p className="deceased-text">{deceasedCases}</p>
      <p className="population-text">{population}</p>
    </li>
  )
}

export default StateItem
