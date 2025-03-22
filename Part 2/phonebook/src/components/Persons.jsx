const Person = ({ person, removePerson }) => {
  return (
    <li>
      {person.name} {person.number}
      <button onClick={() => removePerson(person.id)}>X</button>
    </li>
  );
};

const Persons = ({ persons, removePerson }) => {
  return (
    <>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <Person
            key={person.id}
            person={person}
            removePerson={removePerson}
          ></Person>
        ))}
      </ul>
    </>
  );
};

export default Persons;
