import { useState } from "react";

const Title = () => <h2>give feedback</h2>;

const Button = (props) => {
  return <button onClick={props.onClick}>{props.label}</button>;
};

const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const calculateAverage = () => {
    return (good - bad) / (good + bad + neutral);
  };

  const calculatePositive = () => {
    return (good * 100) / (good + bad + neutral) + " %";
  };
  return (
    <>
      <h2>statistics</h2>
      {good + neutral + bad === 0 ? (
        <p>No feedback given </p>
      ) : (
        <table>
          <tbody>
            <StatisticsLine text={"good"} value={good} />
            <StatisticsLine text={"neutral"} value={neutral} />
            <StatisticsLine text={"bad"} value={bad} />
            <StatisticsLine text={"good"} value={good} />
            <StatisticsLine text={"average"} value={calculateAverage()} />
            <StatisticsLine text={"positive"} value={calculatePositive()} />
          </tbody>
        </table>
      )}
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClickGood = () => {
    setGood(good + 1);
  };

  const handleClickNeutral = () => {
    setNeutral(neutral + 1);
  };

  const handleClickBad = () => {
    setBad(bad + 1);
  };

  return (
    <>
      <Title></Title>
      <Button onClick={handleClickGood} label={"good"}></Button>
      <Button onClick={handleClickNeutral} label={"neutral"}></Button>
      <Button onClick={handleClickBad} label={"bad"}></Button>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </>
  );
};

export default App;
