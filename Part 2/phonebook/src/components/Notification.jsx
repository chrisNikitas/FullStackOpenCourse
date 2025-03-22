const Notification = ({ content }) => {
  const notificationStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };
  if (content === null) return;
  else return <div style={notificationStyle}>{content}</div>;
};
export default Notification;
