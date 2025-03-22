import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import InputForm from "./components/InputForm";
import Notification from "./components/Notification";
import Error from "./components/Error";
import SearchField from "./components/SearchField";
import personService from "./services/person";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({
    name: "enter Name",
    number: "enter Number",
  });
  const [searchName, setSearchName] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    console.log("effect");
    personService.getAll().then((returnedPeople) => setPersons(returnedPeople));
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    if (persons.find((person) => person.name === newPerson.name)) {
      checkUpdatePerson();
    } else {
      personService.create(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNotificationMessage("New person added: " + newPerson.name);
        setTimeout(() => setNotificationMessage(null), 5000);
      });
    }
    setNewPerson({
      name: "enter Name",
      number: "enter Number",
    });
  };

  const checkUpdatePerson = () => {
    if (
      confirm(
        `${newPerson.name} is already added to phonebook, replace the old number with a new one?`
      )
    )
      return updatePerson();
  };

  const updatePerson = () => {
    const personId = persons.find(
      (person) => person.name === newPerson.name
    ).id;

    personService
      .update(personId, newPerson)
      .then((returnedPerson) => {
        setPersons(
          persons.map((person) =>
            person.id === personId ? returnedPerson : person
          )
        );
      })
      .catch((e) => {
        console.log(newPerson.name);
        setErrorMessage(
          "Person " + newPerson.name + " has already been deleted"
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

  const removePerson = (id) => {
    personService.remove(id).then((returnedPerson) => {
      setPersons(persons.filter((person) => person.id !== returnedPerson.id));
    });
  };

  const handleNewPersonChange = (event, key) => {
    setNewPerson({ ...newPerson, [key]: event.target.value });
  };

  const handleSearchNameChange = (event) => {
    let searchValue = event.target.value;
    setSearchName(searchValue);
  };

  const personsToShow =
    searchName === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(searchName.toLowerCase())
        );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification content={notificationMessage}></Notification>
      <Error content={errorMessage}></Error>
      <SearchField
        searchName={searchName}
        handleSearchNameChange={handleSearchNameChange}
      ></SearchField>
      <InputForm
        newPerson={newPerson}
        addPerson={addPerson}
        handleNewPersonChange={handleNewPersonChange}
      ></InputForm>
      <Persons persons={personsToShow} removePerson={removePerson}></Persons>
    </div>
  );
};

export default App;
