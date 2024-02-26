import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import Charts from '../Charts'
import Footer from '../Footer'
import TopDistricts from '../TopDistricts'
import './index.css'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

class SpecificState extends Component {
  state = {
    stateName: '',
    testedCount: 0,
    updatedDate: '',
    year: '',
    date: '',
    month: '',
    stateTotalData: {},
    totalConfirmed: '',
    totalRecovered: '',
    totalDeceased: '',
    totalActive: '',
    isLoader: true,
    stateCd: '',
    districtsData: [],
    isClicked: true,
    isClickActive: false,
    isClickRecovered: false,
    isClickDeceased: false,
  }

  componentDidMount() {
    this.getSpecificStateDetails()
  }

  getSpecificStateDetails = async () => {
    const apiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'
    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const {computedMatch} = this.props
      const {params} = computedMatch
      const {stateCode} = params
      const stateCd = stateCode
      const stateNameArr = statesList.filter(
        each => each.state_code === stateCd,
      )
      const stateTested = data[stateCd].total.tested
      const stateTotalData = data[stateCd]
      const confirmedCases = stateTotalData.total.confirmed
      const deceasedCases = stateTotalData.total.deceased
      const recoveredCases = stateTotalData.total.recovered
      const updatedDate = new Date(data[stateCd].meta.last_updated)
      const distArray = Object.keys(data[stateCd].districts)
      const distData = distArray.map(eachDist => ({
        eachDist,
        confirmed: data[stateCd].districts[eachDist].total.confirmed
          ? data[stateCd].districts[eachDist].total.confirmed
          : 0,
        deceased: data[stateCd].districts[eachDist].total.deceased
          ? data[stateCd].districts[eachDist].total.deceased
          : 0,
        recovered: data[stateCd].districts[eachDist].total.recovered
          ? data[stateCd].districts[eachDist].total.recovered
          : 0,
        active:
          data[stateCd].districts[eachDist].total.confirmed -
          (data[stateCd].districts[eachDist].total.deceased +
            data[stateCd].districts[eachDist].total.recovered)
            ? data[stateCd].districts[eachDist].total.confirmed -
              (data[stateCd].districts[eachDist].total.deceased +
                data[stateCd].districts[eachDist].total.recovered)
            : 0,
      }))

      const sortedData = distData.sort((sortA, sortB) => {
        const a = sortA.confirmed
        const b = sortB.confirmed
        return a < b ? 1 : -1
      })
      this.setState({
        districtsData: sortedData,
      })
      this.setState({
        stateName: stateNameArr[0].state_name,
        testedCount: stateTested,
        updatedDate,
        stateTotalData,
        year: updatedDate.getFullYear(),
        date: updatedDate.getDate(),
        month: updatedDate.getMonth(),
        totalConfirmed: confirmedCases,
        totalDeceased: deceasedCases,
        totalRecovered: recoveredCases,
        totalActive: confirmedCases - (recoveredCases + deceasedCases),
        isLoader: false,
        stateCd,
        districtsData: sortedData,
      })
    } else {
      console.log('no data')
    }
  }

  onClickConfirmed = () => {
    const {districtsData} = this.state
    this.setState({
      isClicked: true,
      isClickActive: false,
      isClickDeceased: false,
      isClickRecovered: false,
    })

    const sortedData = districtsData.sort((sortA, sortB) => {
      const a = sortA.recovered
      const b = sortB.recovered
      return a < b ? 1 : -1
    })
    this.setState({
      districtsData: sortedData,
    })
  }

  onClickActive = () => {
    const {districtsData} = this.state
    this.setState({
      isClickActive: true,
      isClicked: false,
      isClickDeceased: false,
      isClickRecovered: false,
    })
    const sortedData = districtsData.sort((sortA, sortB) => {
      const a = sortA.active
      const b = sortB.active
      return a < b ? 1 : -1
    })
    this.setState({
      districtsData: sortedData,
    })
  }

  onClickRecovered = () => {
    const {districtsData} = this.state
    this.setState({
      isClickRecovered: true,
      isClicked: false,
      isClickActive: false,
      isClickDeceased: false,
    })
    const sortedData = districtsData.sort((sortA, sortB) => {
      const a = sortA.recovered
      const b = sortB.recovered
      return a < b ? 1 : -1
    })
    this.setState({
      districtsData: sortedData,
    })
  }

  onClickDeceased = () => {
    const {districtsData} = this.state
    this.setState({
      isClickDeceased: true,
      isClickActive: false,
      isClickRecovered: false,
      isClicked: false,
    })
    const sortedData = districtsData.sort((sortA, sortB) => {
      const a = sortA.deceased
      const b = sortB.deceased
      return a < b ? 1 : -1
    })
    this.setState({
      districtsData: sortedData,
    })
  }

  renderStatsList = () => {
    const {
      stateTotalData,
      totalConfirmed,
      totalActive,
      totalDeceased,
      totalRecovered,
      isClicked,
      isClickActive,
      isClickDeceased,
      isClickRecovered,
    } = this.state
    const bgColor = isClicked ? 'bgColor-container' : 'container'
    const activebgColor = isClickActive ? 'active-container' : 'container'
    const recovered = isClickRecovered ? 'recovered-container' : 'container'
    const deceased = isClickDeceased ? 'deceased-container' : 'container'
    return (
      <ul className="stats-container">
        <li
          className={bgColor}
          testid="stateSpecificConfirmedCasesContainer"
          onClick={this.onClickConfirmed}
        >
          <p className="confirmed">Confirmed</p>
          <img
            src="https://res.cloudinary.com/ddiyemmt3/image/upload/v1707399165/check-mark_1_cdo1qt.png"
            alt="state specific confirmed cases pic"
          />
          <p className="confirmed-cases">{totalConfirmed}</p>
        </li>
        <li
          className={activebgColor}
          testid="stateSpecificActiveCasesContainer"
          onClick={this.onClickActive}
        >
          <p className="active">Active</p>
          <img
            src="https://res.cloudinary.com/ddiyemmt3/image/upload/v1707399189/protection_1_rbhkro.png"
            alt="state specific active cases pic"
          />
          <p className="active-cases">{totalActive}</p>
        </li>
        <li
          className={recovered}
          testid="stateSpecificRecoveredCasesContainer"
          onClick={this.onClickRecovered}
        >
          <p className="recovered">Recovered</p>
          <img
            src="https://res.cloudinary.com/ddiyemmt3/image/upload/v1707399226/Vector_tjvsn8.png"
            alt="state specific recovered cases pic"
          />
          <p className="recovered-cases">{totalRecovered}</p>
        </li>
        <li
          className={deceased}
          testid="stateSpecificDeceasedCasesContainer"
          onClick={this.onClickDeceased}
        >
          <p className="deceased">Deceased</p>
          <img
            src="https://res.cloudinary.com/ddiyemmt3/image/upload/v1707399204/Corona_Virus_Symptoms_Shortness_of_breath_xffxip.png"
            alt="state specific deceased cases pic"
          />
          <p className="deceased-cases">{totalDeceased}</p>
        </li>
      </ul>
    )
  }

  renderLoaderView = () => (
    <div className="loader-container" testid="stateDetailsLoader">
      <Loader type="Oval" color="#007BFF" height="50" width="50" />
    </div>
  )

  renderDistrictsData = () => {
    const {
      stateName,
      testedCount,
      month,
      date,
      year,
      stateCd,
      districtsData,
      isClickActive,
      isClickDeceased,
      isClickRecovered,
      isClicked,
    } = this.state

    const months = [
      'Jan',
      'Feb',
      'March',
      'April',
      'May',
      'Jun',
      'July',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]
    return (
      <>
        <div className="statename-container">
          <h1 className="specific-state-name">{stateName}</h1>
          <div>
            <p className="tested">tested</p>
            <p className="tested-count">{testedCount}</p>
          </div>
        </div>
        <p className="updated-date">
          Last update on {months[month - 1]} {date}st {year}
        </p>
        <div className="cards-container">{this.renderStatsList()}</div>
        <h1 className="top-districts">Top Districts</h1>
        <ul
          className="top-districts-list"
          testid="topDistrictsUnorderedList"
        >
          {districtsData.map(eachDistrict => (
            <TopDistricts
              distDetails={eachDistrict}
              key={eachDistrict.eachDist}
              isClickActive={isClickActive}
              isClicked={isClicked}
              isClickDeceased={isClickDeceased}
              isClickRecovered={isClickRecovered}
            />
          ))}
        </ul>

        <div testid="lineChartsContainer">
          <Charts
            stateCd={stateCd}
            isClickActive={isClickActive}
            isClicked={isClicked}
            isClickDeceased={isClickDeceased}
            isClickRecovered={isClickRecovered}
          />
        </div>
        <Footer />
      </>
    )
  }

  render() {
    const {isLoader} = this.state
    return (
      <div className="specific-state-container">
        <Header />
        {isLoader ? this.renderLoaderView() : this.renderDistrictsData()}
      </div>
    )
  }
}

export default SpecificState
