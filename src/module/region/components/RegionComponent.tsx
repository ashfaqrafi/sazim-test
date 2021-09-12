import React from "react";
import RegionList from "./RegionList";
import queryString from "query-string";
import { Link } from "react-router-dom";
import axios from "axios";

export default function RegionComponent() {
  const [regionData, setRegionData] = React.useState({
    data: [],
    metadata: { totalCount: 1 },
    links: [],
  });
  const [regions, setRegions] = React.useState<any>([]);
  const parsed = queryString.parse(window.location.search);
  const countryCode = parsed.countryCode;
  const countryName = parsed.countryName;

  React.useEffect(() => {
    const options = {
      method: "GET",
      url: `https://wft-geo-db.p.rapidapi.com/v1/geo/countries/${countryCode}/regions`,
      headers: {
        "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
        "x-rapidapi-key": "1c8bec90d8msh4fe16494e72b79ep16f4c4jsn4f21e6d6fea7",
      },
    };

    axios
      .request(options as {})
      .then(function (response) {
        setRegionData(response.data);
        setRegions(response.data.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [countryCode, regions]);

  return (
    <div
      style={{
        marginTop: "30px",
        position: "relative",
        minHeight: "calc(100vh - 250px)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p>Country Selected: {countryName}</p>
        <p>
          Total number of regions: {regionData?.metadata?.totalCount || "N/A"}
        </p>
      </div>
      <div>
        {regions && regions.length > 0 ? (
          <div>
            <RegionList regions={regions} />
          </div>
        ) : (
          <p>No Regions Found</p>
        )}
      </div>
      <div style={{ position: "absolute", bottom: 0, right: 0 }}>
        <button className="primary-button">
          <Link to={`/countries`}>Go back to Countries</Link>
        </button>
      </div>
    </div>
  );
}
