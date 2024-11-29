import Input from "./Input"

const PhonebookForm = (props) =>
  <form onSubmit={props.handleSubmit}>
    <Input 
      text="name:"
      value={props.newName} 
      handleInput={(event) => props.handleInput(event, props.setNewName)} />
    <Input 
      text="number:" 
      value={props.newNumber} 
      handleInput={(event) => props.handleInput(event, props.setNewNumber)} />
    <div>
      <button type="submit">add</button>
    </div>
  </form>

export default PhonebookForm