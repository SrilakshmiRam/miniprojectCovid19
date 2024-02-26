import './index.css'

const StateCards = props => {
  const {totalActive, totalConfirmed, totalDeceased, totalRecovered} = props

  return (
    <div className="stats-container">
      <div className="container" testid="countryWideConfirmedCases">
        <p className="confirmed">Confirmed</p>
        <img
          src="https://res.cloudinary.com/ddiyemmt3/image/upload/v1707399165/check-mark_1_cdo1qt.png"
          alt="country wide confirmed cases pic"
        />
        <p className="confirmed-cases">{totalConfirmed}</p>
      </div>
      <div className="container" testid="countryWideActiveCases">
        <p className="active">Active</p>
        <img
          src="https://res.cloudinary.com/ddiyemmt3/image/upload/v1707399189/protection_1_rbhkro.png"
          alt="country wide active cases pic"
        />
        <p className="active-cases">{totalActive}</p>
      </div>
      <div className="container" testid="countryWideRecoveredCases">
        <p className="recovered">Recovered</p>
        <img
          src="https://res.cloudinary.com/ddiyemmt3/image/upload/v1707399226/Vector_tjvsn8.png"
          alt="country wide recovered cases pic"
        />
        <p className="recovered-cases">{totalRecovered}</p>
      </div>
      <div className="container" testid="countryWideDeceasedCases">
        <p className="deceased">Deceased</p>
        <img
          src="https://res.cloudinary.com/ddiyemmt3/image/upload/v1707399204/Corona_Virus_Symptoms_Shortness_of_breath_xffxip.png"
          alt="country wide deceased cases pic"
        />
        <p className="deceased-cases">{totalDeceased}</p>
      </div>
    </div>
  )
}

export default StateCards
