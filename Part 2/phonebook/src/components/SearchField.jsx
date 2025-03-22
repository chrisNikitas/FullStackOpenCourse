const SearchField = ({ searchName, handleSearchNameChange }) => {
  return (
    <>
      search:
      <input value={searchName} onChange={handleSearchNameChange}></input>
    </>
  );
};

export default SearchField;
