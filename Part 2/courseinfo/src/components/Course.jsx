const Total = ({ parts }) => {
  return (
    <p>
      Number of exercises{" "}
      {parts.reduce(
        (accumulatedSum, part) => part.exercises + accumulatedSum,
        0
      )}
    </p>
  );
};

const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} part={part}></Part>
      ))}
    </>
  );
};

const Course = (props) => {
  let { course } = props;
  return (
    <div>
      <Header course={course.name}></Header>
      <Content parts={course.parts}></Content>
      <Total parts={course.parts}></Total>
    </div>
  );
};

export default Course;
