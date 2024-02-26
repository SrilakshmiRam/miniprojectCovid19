import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'

import {FcGenericSortingDesc, FcGenericSortingAsc} from 'react-icons/fc'
import Loader from 'react-loader-spinner'

import Footer from '../Footer'

import Header from '../Header'

import SearchVarients from '../SearchVarients'

import StateItem from '../StateItem'

import StateCards from '../StateCards'

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

class Home extends Component {
  state = {
    searchInput: '',
    dataList: [],
    isLoader: true,
    totalConfirmed: 0,
    totalActive: 0,
    totalRecovered: 0,
    totalDeceased: 0,
  }

  componentDidMount() {
    this.getStateWiseData()
  }

  getStateWiseData = async () => {
    const url = 'https://apis.ccbp.in/covid19-state-wise-data'
    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      let confirmedCase = 0
      let activeCase = 0
      let recoveredCase = 0
      let deceasedCase = 0

      statesList.forEach(eachState => {
        if (data[eachState.state_code]) {
          const {total} = data[eachState.state_code]
          confirmedCase += total.confirmed ? total.confirmed : 0
          recoveredCase += total.recovered ? total.recovered : 0
          deceasedCase += total.deceased ? total.deceased : 0
        }
      })

      activeCase += confirmedCase - (deceasedCase + recoveredCase)

      const updatedData = statesList.map(eachState => ({
        stateCode: eachState.state_code,
        stateName: eachState.state_name,
        confirmedCases: Object.keys(data)
          .filter(state => state === eachState.state_code)
          .map(each => data[each].total.confirmed),
        deceasedCases:
          data[Object.keys(data).filter(each => each === eachState.state_code)]
            .total.deceased,
        recoveredCases:
          data[Object.keys(data).filter(each => each === eachState.state_code)]
            .total.recovered,
        active:
          data[Object.keys(data).filter(each => each === eachState.state_code)]
            .total.confirmed -
          (data[Object.keys(data).filter(each => each === eachState.state_code)]
            .total.deceased +
            data[
              Object.keys(data).filter(each => each === eachState.state_code)
            ].total.recovered),
        population:
          data[Object.keys(data).filter(each => each === eachState.state_code)]
            .meta.population,
      }))

      this.setState({
        dataList: updatedData,
        isLoader: false,
        totalConfirmed: confirmedCase,
        totalActive: activeCase,
        totalDeceased: deceasedCase,
        totalRecovered: recoveredCase,
      })
    } else {
      console.log('no data')
    }
  }

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  renderLoaderView = () => (
    <div testid="homeRouteLoader" className="loader-container">
      <Loader type="Oval" color="#007BFF" height="50" width="50" />
    </div>
  )

  onClickSortAsc = () => {
    const {dataList} = this.state
    const sort = dataList.sort((sortA, sortB) => {
      const a = sortA.stateName.toUpperCase()
      const b = sortB.stateName.toUpperCase()
      return a > b ? 1 : -1
    })
    this.setState({
      dataList: sort,
    })
  }

  onClickSortDesc = () => {
    const {dataList} = this.state
    const sort = dataList.sort((sortA, sortB) => {
      const a = sortA.stateName.toUpperCase()
      const b = sortB.stateName.toUpperCase()
      return a < b ? 1 : -1
    })
    this.setState({
      dataList: sort,
    })
  }

  renderCovid19StatsBasedOnState = () => {
    const {dataList} = this.state

    return (
      <div className="states-data-list" testid="stateWiseCovidDataTable">
        <div className="table-header">
          <div className="table-cell">
            <div className="state-icons-container">
              <p className="states-title">States/UT</p>
              <div className="icons-container">
                <button
                  type="button"
                  className="icon-button"
                  testid="ascendingSort"
                  onClick={this.onClickSortAsc}
                >
                  <FcGenericSortingAsc className="asc-icon" />
                </button>
                <button
                  type="button"
                  className="icon-button"
                  testid="descendingSort"
                  onClick={this.onClickSortDesc}
                >
                  <FcGenericSortingDesc className="desc-icon" />
                </button>
              </div>
            </div>
            <p className="cases-title">Confirmed</p>
            <p className="cases-title">Active</p>
            <p className="cases-title">Recovered</p>
            <p className="cases-title">Deceased</p>
            <p className="cases-title">Population</p>
          </div>
          <hr className="separation" />
        </div>
        <ul className="states-data">
          {dataList.map(eachItem => (
            <StateItem statsDetails={eachItem} key={eachItem.stateCode} />
          ))}
        </ul>
      </div>
    )
  }

  renderSearchStatesListView = () => {
    const {searchInput} = this.state
    const updatedStatesList = statesList.map(eachState => ({
      stateCode: eachState.state_code,
      stateName: eachState.state_name,
    }))

    const filteredList = updatedStatesList.filter(eachItem =>
      eachItem.stateName.toLowerCase().startsWith(searchInput.toLowerCase()),
    )

    return (
      <ul
        testid="searchResultsUnorderedList"
        className="searchvarients-container"
      >
        {filteredList.map(eachItem => (
          <SearchVarients varientDetails={eachItem} key={eachItem.stateCode} />
        ))}
      </ul>
    )
  }

  render() {
    const {
      searchInput,
      isLoader,
      totalConfirmed,
      totalActive,
      totalDeceased,
      totalRecovered,
    } = this.state
    return (
      <div className="home-container">
        <Header />
        {isLoader ? (
          this.renderLoaderView()
        ) : (
          <>
            <div className="search-container">
              <BsSearch className="search-icon" />
              <input
                type="search"
                placeholder="Enter the name"
                className="input-search"
                onChange={this.onChangeSearchInput}
              />
            </div>
            {searchInput === '' ? null : this.renderSearchStatesListView()}
            <StateCards
              totalConfirmed={totalConfirmed}
              totalActive={totalActive}
              totalDeceased={totalDeceased}
              totalRecovered={totalRecovered}
            />
            {this.renderCovid19StatsBasedOnState()}
            <Footer />
          </>
        )}
      </div>
    )
  }
}

export default Home
