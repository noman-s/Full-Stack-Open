import { useState } from 'react'

const ShowButton = ({element, SingleResultComponent}) => {
  const [showSingleResult, setShowSingleResult] = useState(false)

  if (showSingleResult) {
    return(
      <>
        <button onClick={() => setShowSingleResult(!showSingleResult)} type="submit">
          unshow
        </button>
        <SingleResultComponent result={element}/>
      </>
    )
  }

  return(
    <button onClick={() => setShowSingleResult(!showSingleResult)} type="submit">
      show
    </button>
  )
}

export default ShowButton