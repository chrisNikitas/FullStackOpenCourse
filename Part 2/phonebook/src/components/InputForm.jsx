const InputForm = ({ newPerson, addPerson, handleNewPersonChange }) => {
  return (
    <form>
      <div>
        name:
        <input
          value={newPerson.name}
          onChange={(e) => handleNewPersonChange(e, "name")}
        />{" "}
        number:{" "}
        <input
          value={newPerson.number}
          onChange={(e) => handleNewPersonChange(e, "number")}
        />
      </div>
      <div>
        <button onClick={addPerson} type="submit">
          add
        </button>
      </div>
    </form>
  );
};

export default InputForm;
