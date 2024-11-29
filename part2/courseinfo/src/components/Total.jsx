const Total = ({parts}) => {
  const sumOfExercises =
    parts
      .map((part) => part.exercises)
      .reduce((partialSum, num) => partialSum + num)
  return(
    <p>
      <strong>total of {sumOfExercises} exercises</strong>
    </p>
  )
}

export default Total