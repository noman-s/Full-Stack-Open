const Content = ({header, text, stats}) => 
  <>
    <h1>{header}</h1>
    {text}
    <br />
    has {stats} votes
    <br />
  </>

export default Content