import './index.css'

const TopDistricts = props => {
  const {
    isClicked,
    isClickActive,
    isClickRecovered,
    isClickDeceased,
    distDetails,
  } = props
  const {eachDist, confirmed, active, recovered, deceased} = distDetails
  const renderConfirmedCasesDistricts = () => (
    <li className="dist-item">
      <p className="cases-text">{confirmed}</p>
      <p className="district-name">{eachDist}</p>
    </li>
  )

  const renderActiveCasesDistricts = () => (
    <li className="dist-item">
      <p className="cases-text">{active}</p>
      <p className="district-name">{eachDist}</p>
    </li>
  )

  const renderRecoveredCasesDistricts = () => (
    <li className="dist-item">
      <p className="cases-text">{recovered}</p>
      <p className="district-name">{eachDist}</p>
    </li>
  )

  const renderDeceasedCasesDistricts = () => (
    <li className="dist-item">
      <p className="cases-text">{deceased}</p>
      <p className="district-name">{eachDist}</p>
    </li>
  )

  return (
    <>
      {isClicked && renderConfirmedCasesDistricts()}
      {isClickActive && renderActiveCasesDistricts()}
      {isClickRecovered && renderRecoveredCasesDistricts()}
      {isClickDeceased && renderDeceasedCasesDistricts()}
    </>
  )
}

export default TopDistricts
