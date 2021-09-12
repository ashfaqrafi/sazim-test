import React from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
// import moment from "moment";
const timeout = 30000;

export default function CityCard({
  item,
  visible,
  getSelectedCity,
}: {
  item: any;
  visible: any;
  getSelectedCity: any;
}): JSX.Element {
  const [showMeta, setShowMeta] = React.useState(false);
  const [showTimeZone, setShowTimeZone] = React.useState("");

  const handleClick = React.useCallback(() => {
    setShowMeta(true);
    setTimeout(() => {
      setShowMeta(false);
    }, timeout);
  }, []);

  React.useEffect(() => {
    const options = {
      method: "GET",
      url: `https://wft-geo-db.p.rapidapi.com/v1/geo/cities/${item.id}`,
      headers: {
        "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
        "x-rapidapi-key": "1c8bec90d8msh4fe16494e72b79ep16f4c4jsn4f21e6d6fea7",
      },
    };

    axios
      .request(options as {})
      .then(function (response) {
        setShowTimeZone(response?.data?.data?.timezone);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [item.id, showTimeZone]);

  return (
    <div
      className="card"
      style={{
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        paddingBottom: "1rem",
        marginBottom: "1rem",
        marginRight: "1rem",
      }}
    >
      <div className="card-body">
        <h5 className="card-title">{item.name}</h5>
      </div>
      {visible && showMeta ? (
        <div>
          <p>Longitude: {item.longitude}</p>
          <p>Latitude: {item.latitude}</p>
          <p>Population: {item.population}</p>
          <p>Time: {showTimeZone ?? "N/A"}</p>
        </div>
      ) : (
        <div
          onClick={() => {
            handleClick();
            getSelectedCity(item.id);
          }}
          style={{ cursor: "pointer" }}
        >
          <FaPlus size="18" />
        </div>
      )}
    </div>
  );
}
