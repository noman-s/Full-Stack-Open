import { useState } from 'react'
import Button from './Button'
import Header from './Header'
import Statistics from './Statistics'

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)
  
  const addGoodFeedback = () => {
    setGood(good + 1)
    setTotal(total + 1)
    setAverage((good - bad + 1)/(total + 1))
    setPositive((good + 1)/(total +1)*100)
  }

  const addNeutralFeedback = () => {
    setNeutral(neutral + 1)
    setTotal(total + 1)
    setAverage((good - bad)/(total + 1))
    setPositive((good)/(total +1)*100)
  }

  const addBadFeedback = () => {
    setBad(bad + 1)
    setTotal(total + 1)
    setAverage((good - bad - 1)/(total + 1))
    setPositive((good)/(total +1)*100)
  }

  return (
    <div>
      <Header header="feedback" />
      <Button text="good" handleClick={() => addGoodFeedback()} />
      <Button text="neutral" handleClick={() => addNeutralFeedback()} />
      <Button text="bad" handleClick={() => addBadFeedback()} />
      <Header header="statistics" />
      <Statistics 
        good={good} 
        neutral={neutral}
        bad={bad} 
        total={total} 
        average={average} 
        positive={positive} />
    </div>
  )
}

export default App
