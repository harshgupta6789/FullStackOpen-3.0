const Notification = ({ message, color }) => {
  const notificationStyle = {
    color: color == null ? "green" : color,
  };
  if (message === null) {
    return null;
  }

  return (
    <div className="error" style={notificationStyle}>
      {message}
    </div>
  );
};

export default Notification;
