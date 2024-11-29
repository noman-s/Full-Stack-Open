import { useEffect, useState } from "react";

import Input from "./components/Input";
import SearchResults from "./components/SearchResults";
import CountryData from "./components/CountryData";
import countriesService from "./services/countries";

function App() {
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState([]);
  const [fullCountryList, setFullCountryList] = useState(null);

  useEffect(() => {
    countriesService.getAll().then((countries) => {
      setFullCountryList(countries);
    });
  }, []);

  const handleInput = (event) => {
    if (fullCountryList) {
      setFilter(event.target.value);
      setCountries(
        fullCountryList.filter((country) =>
          country.name.common
            .toLowerCase()
            .includes(event.target.value.toLowerCase()),
        ),
      );
    }
  };

  return (
    <>
      <h1>Countries Database</h1>
      <Input
        text="Find countries"
        value={filter}
        handleInput={(event) => handleInput(event)}
      />
      <SearchResults
        results={countries}
        filter={filter}
        SingleResultComponent={CountryData}
      />
    </>
  );
}

export default App;
