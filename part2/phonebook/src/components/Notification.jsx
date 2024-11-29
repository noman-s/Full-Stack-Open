const Notification = ({ type, message }) => {
  if (message === null) {
    return null
  }
  
  const successfulNotificationStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const failureNotificationStyle = {
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
    <div 
      className={type} 
      style={type === "success" ? successfulNotificationStyle : failureNotificationStyle}>
      {message}
    </div>
  )
}

export default Notification