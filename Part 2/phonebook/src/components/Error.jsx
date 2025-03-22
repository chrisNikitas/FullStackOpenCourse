const Error = ({ content }) => {
  const errorStyle = {
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };
  if (content === null) return;
  else return <div style={errorStyle}>{content}</div>;
};
export default Error;
