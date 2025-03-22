import { useEffect, useState } from "react";
import axios from "axios";
import CountryList from "./components/CountryList";

function App() {
  const [countrySearch, setCountrySearch] = useState("");
  const [searchResults, setSearchResults] = useState("");
  const [allCountries, setAllCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setAllCountries(response.data);
      });
  }, []);

  const handleCountrySearchChange = (e) => {
    setCountrySearch(e.target.value);
    console.log(e.target.value);

    setSearchResults(
      allCountries.filter((country) => {
        return country.name.common.toLowerCase().includes(e.target.value);
      })
    );
  };

  const handleShowClick = (clickedItem) => {
    console.log(clickedItem);

    setSearchResults([clickedItem]);
  };

  return (
    <>
      Hey
      <form>
        <input
          value={countrySearch}
          onChange={handleCountrySearchChange}
        ></input>
      </form>
      <CountryList
        handleShowClick={handleShowClick}
        list={searchResults}
      ></CountryList>
    </>
  );
}

export default App;
