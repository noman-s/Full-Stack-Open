import { useState } from 'react'
import ShowButton from './ShowButton'

const SearchResults = ({results, filter, SingleResultComponent}) => {
  if (!filter) return(null)

  if (results.length > 10) 
    return(<div>Too many matches. specify another filter</div>)

  if (results.length === 1) {
    return(<SingleResultComponent result={results[0]}/>)
  }

  return(
    results.map(element => 
      <div key={element.name.common}>
        {element.name.common}
        <ShowButton element={element} SingleResultComponent={SingleResultComponent} />
      </div>)
  )
}

export default SearchResults