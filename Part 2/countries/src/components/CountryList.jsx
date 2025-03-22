const CountryInfo = ({ country }) => {
  return (
    <>
      <h2>{country.name.common}</h2>
      <p>
        {"Capital: " + country.capital}
        <br />
        {"Area: " + country.area}
      </p>

      <h3>Languages</h3>

      <ul>
        {Object.keys(country.languages).map((languageKey) => (
          <li key={languageKey}>{country.languages[languageKey]}</li>
        ))}
      </ul>

      <img src={country.flags.png} />
    </>
  );
};

const CountryListEntry = ({ country, handleShowClick }) => {
  return (
    <>
      {" "}
      <li>
        {country.name.common}
        <button onClick={() => handleShowClick(country)}>show</button>
      </li>
    </>
  );
};

const CountryList = ({ list, handleShowClick }) => {
  if (list.length > 10) return "Too many matches, specify another filter";
  else if (list.length > 1)
    return (
      <ul>
        {list.map((country) => (
          <CountryListEntry
            key={country.cca2}
            country={country}
            handleShowClick={handleShowClick}
          ></CountryListEntry>
        ))}
      </ul>
    );
  else if (list.length == 1) {
    const country = list[0];
    return <CountryInfo country={country}></CountryInfo>;
  }
};

export default CountryList;
