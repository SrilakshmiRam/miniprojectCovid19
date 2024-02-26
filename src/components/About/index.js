import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import Footer from '../Footer'

import FaqsItem from '../FaqsItem'

import './index.css'

class About extends Component {
  state = {faqsList: [], isLoading: true}

  componentDidMount() {
    this.getAboutDetails()
  }

  getAboutDetails = async () => {
    const url = 'https://apis.ccbp.in/covid19-faqs'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const filteredArray = data.faq
      this.setState({
        faqsList: filteredArray,
        isLoading: false,
      })
    } else {
      console.log('no data')
    }
  }

  renderLoaderView = () => (
    <div testid="aboutRouteLoader" className="loader-container">
      <Loader type="Oval" color="#007BFF" height="50" width="50" />
    </div>
  )

  renderAboutSuccessView = () => {
    const {faqsList} = this.state
    return (
      <>
        <h1 className="about-heading">About</h1>
        <p className="updatedDate-text">Last update on march 28th 2021.</p>
        <p className="description">
          Covid-19 vaccines be ready for distribution
        </p>
        <ul className="faqs-list" testid="faqsUnorderedList">
          {faqsList.map(eachItem => (
            <FaqsItem
              key={eachItem.qno}
              answer={eachItem.answer}
              question={eachItem.question}
            />
          ))}
        </ul>
      </>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="about-container">
        <Header />
        {isLoading ? (
          this.renderLoaderView()
        ) : (
          <>
            {this.renderAboutSuccessView()}
            <Footer />
          </>
        )}
      </div>
    )
  }
}

export default About
