import { useState } from 'react'

import Content from './Content'
import Button from './Button'


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length))

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max)
  }

  const handleNextAnecdoteClick = () => {
    const newIndex = getRandomInt(anecdotes.length)
    setSelected(newIndex)
  }

  const handleVoteClick = () => {
    const newVotes = [...votes]
    ++newVotes[selected]
    setVotes(newVotes)
  }

  const getMostVotedIndex = () => {
    const maxValue = Math.max(...votes)
    const index = votes.indexOf(maxValue)
    return index
  }

  return (
    <div>
      <Content 
        header="Anecdote of the day"
        text={anecdotes[selected]}
        stats={votes[selected]} />
      <Button text="vote" handleClick={() => handleVoteClick()} />
      <Button text="next anecdote" handleClick={() => handleNextAnecdoteClick()} />
      <Content 
        header="Anecdote with most votes"
        text={anecdotes[getMostVotedIndex()]}
        stats={votes[getMostVotedIndex()]} />
    </div>
  )
}

export default App