import DirectoryListing from "./DirectoryListing";

const Directory = ({persons, filter, onDeleteListing}) =>
  <>
    {persons
      .filter((person) => 
        person.name
          .toLowerCase()
          .includes(filter.toLowerCase()))
      .map((person) => 
      <DirectoryListing
        key={person.id}
        name={person.name}
        number={person.number}
        onDelete={() => onDeleteListing(person) }/>
    )}   
  </>

export default Directory