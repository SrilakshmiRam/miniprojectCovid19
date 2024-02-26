import './index.css'

const FaqsItem = props => {
  const {answer, question} = props
  return (
    <li className="faq-item">
      <p className="question-text">{question}</p>
      <p className="answer-text">{answer}</p>
    </li>
  )
}

export default FaqsItem
