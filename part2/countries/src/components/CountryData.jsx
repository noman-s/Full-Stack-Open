import WeatherData from "./WeatherData";

const CountryData = ({ result }) => {
  const languages = Object.values(result.languages);

  return (
    <div>
      <h2>{result.name.common}</h2>
      <div>Capital: {result.capital[0]}</div>
      <div>Area: {result.area}</div>
      <h3>Languages</h3>
      <ul>
        {languages.map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={result.flags.png}></img>
      <WeatherData city={result.capital[0]} country={result.cca2} />
    </div>
  );
};

export default CountryData;
