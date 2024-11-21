import StatisticLine from "./StatisticLine"

const Statistics = (props) => {
  if (props.total === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return(
    <table>
      <tbody>
        <StatisticLine text="good" value={props.good} />
        <StatisticLine text="neutral" value={props.neutral} />
        <StatisticLine text="bad"  value={props.bad} />
        <StatisticLine text="total" value={props.total} /> 
        <StatisticLine text="average" value={props.average} />
        <StatisticLine text="positive" value={props.positive + ' %'} /> 
      </tbody>
    </table>
  )
}

export default Statistics