const DirectoryListing = ({name, number, onDelete}) =>
  <div>
    {name} {number}
    <button onClick={onDelete} type="submit">delete</button>
  </div>

export default DirectoryListing