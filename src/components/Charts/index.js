import {Component} from 'react'

import Loader from 'react-loader-spinner'

import {LineChart, XAxis, YAxis, Tooltip, Line, BarChart, Bar} from 'recharts'

import './index.css'

class Charts extends Component {
  state = {chartsData: [], isLoader: true}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const {stateCd} = this.props
    const apiUrl = 'https://apis.ccbp.in/covid19-timelines-data'
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    const dataObject = Object.keys(data[stateCd].dates)
    const stateData = dataObject.map(eachDate => ({
      eachDate,
      confirmed: data[stateCd].dates[eachDate].total.confirmed,
      recovered: data[stateCd].dates[eachDate].total.recovered,
      deceased: data[stateCd].dates[eachDate].total.deceased,
      tested: data[stateCd].dates[eachDate].total.tested,
      active:
        data[stateCd].dates[eachDate].total.confirmed -
        (data[stateCd].dates[eachDate].total.recovered +
          data[stateCd].dates[eachDate].total.deceased),
    }))

    this.setState({
      chartsData: stateData,
      isLoader: false,
    })
  }

  renderLoaderView = () => (
    <div className="loader-container" testid="timelinesDataLoader">
      <Loader type="Oval" color="#007BFF" height="50" width="50" />
    </div>
  )

  getbarchart = () => {
    const {chartsData} = this.state
    const {isClickActive, isClickRecovered, isClicked} = this.props

    const maxChartsData = chartsData.slice(Math.max(chartsData.length - 10, 0))

    let color
    let cases
    if (isClicked === true) {
      color = '#9A0E31'
      cases = 'confirmed'
    } else if (isClickActive === true) {
      color = '#0A4FA0'
      cases = 'active'
    } else if (isClickRecovered === true) {
      color = '#216837'
      cases = 'recovered'
    } else {
      color = '#474C57'
      cases = 'deceased'
    }

    return (
      <div className="barchart-container" testid="lineChartsContainer">
        <BarChart
          width={700}
          margin={{
            top: 20,
          }}
          height={300}
          barSize={55}
          data={maxChartsData}
        >
          <XAxis
            dataKey="eachDate"
            axisLine={false}
            stroke={color}
            interval={0}
            tickLine={0}
            style={{
              fontSize: '10px',
              fontFamily: 'Roboto',
            }}
            dy={10}
          />
          <Tooltip />
          <Bar
            dataKey={cases}
            fill={color}
            label={{position: 'top', fill: color}}
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </div>
    )
  }

  getGraphsData = (caseList, color) => {
    const {chartsData} = this.state

    return (
      <div testid="lineChartsContainer">
        <LineChart
          width={500}
          height={250}
          data={chartsData}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}
        >
          <XAxis
            dataKey="eachDate"
            style={{
              fontFamily: 'Roboto',
              fontWeight: 500,
              fontSize: '10px',
            }}
            dy={5}
          />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey={caseList} stroke={color} />
        </LineChart>
      </div>
    )
  }

  render() {
    const {isLoader} = this.state

    return (
      <div className="graph-charts-list">
        {isLoader ? (
          this.renderLoaderView()
        ) : (
          <>
            {this.getbarchart()}
            <h1 className="daily-trends-heading">Daily Spread Trends</h1>
            <div className="confirmed-cases-graph">
              <p className="covid-confirmed">Confirmed</p>
              {this.getGraphsData('confirmed', '#FF073A')}
            </div>
            <div className="active-cases-graph">
              <p className="covid-active">Active</p>
              {this.getGraphsData('active', '#007BFF')}
            </div>
            <div className="recovered-cases-graph">
              <p className="covid-recovered">Recovered</p>
              {this.getGraphsData('recovered', '#27A243')}
            </div>
            <div className="deceased-cases-graph">
              <p className="covid-deceased">Deceased</p>
              {this.getGraphsData('deceased', '#6C757D')}
            </div>
            <div className="tested-cases-graph">
              <p className="covid-tested">Tested</p>
              {this.getGraphsData('tested', ' #9673B9')}
            </div>
          </>
        )}
      </div>
    )
  }
}

export default Charts
