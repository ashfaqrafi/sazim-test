import React from "react";
import CitiesList from "./CitiesList";
import queryString from "query-string";
import { Link } from "react-router-dom";
import axios from "axios";

export default function CitiesComponent() {
  const [cityData, setCityData] = React.useState({
    data: [],
    metadata: { totalCount: 1 },
    links: [],
  });
  const [cities, setCities] = React.useState<any>([]);
  const parsed = queryString.parse(window.location.search);

  const regioncode = parsed.regionCode;
  const countryCode = parsed.countryCode;
  const regionName = parsed.regionName;

  React.useEffect(() => {
    const options = {
      method: "GET",
      url: `https://wft-geo-db.p.rapidapi.com/v1/geo/countries/${countryCode}/regions/${regioncode}/cities`,
      headers: {
        "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
        "x-rapidapi-key": "1c8bec90d8msh4fe16494e72b79ep16f4c4jsn4f21e6d6fea7",
      },
    };

    axios
      .request(options as {})
      .then(function (response) {
        setCityData(response.data);
        setCities(response.data.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [countryCode, cities, regioncode]);

  return (
    <div
      style={{
        marginTop: "30px",
        position: "relative",
        minHeight: "calc(100vh - 250px)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p>Region Selected: {regionName}</p>
        <p>Total number of cities: {cityData?.metadata?.totalCount || "N/A"}</p>
      </div>
      <div>
        <div>
          <CitiesList
            cities={cities}
            countryCode={countryCode}
            regioncode={regioncode}
          />
        </div>
      </div>
      <div
        style={{ display: "flex", position: "absolute", bottom: 0, right: 0 }}
      >
        <button className="primary-button" style={{ marginRight: "1rem" }}>
          <Link to={`/countries`}>Go back to Countries</Link>
        </button>
        <button className="primary-button">
          <Link to={`/regions`}>Go back to Regions</Link>
        </button>
      </div>
    </div>
  );
}
