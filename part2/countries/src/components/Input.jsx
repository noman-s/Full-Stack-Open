const Input = ({text, value, handleInput}) => 
  <div>
    {text}
    <input 
      value={value}
      onChange={handleInput}/>
  </div>


export default Input