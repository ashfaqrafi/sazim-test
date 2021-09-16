import React from "react";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";

export default function CountryList({
  countries,
}: {
  countries: any;
}): JSX.Element {
  const [filter, setFilter] = React.useState("");
  const [sortType, setSortType] = React.useState("");

  const sorted = countries.sort((a: { name: string }, b: { name: any }) => {
    const isReversed = sortType === "asc" ? 1 : -1;
    return isReversed * a.name.localeCompare(b.name);
  });

  const searchFilter = (event: any) => {
    setFilter(event.target.value);
  };
  const lowercasedFilter = filter.toLowerCase();
  const filteredData = sorted?.filter((item: any) => {
    return Object.keys(item).some(
      (key) =>
        typeof item[key] === "string" &&
        item[key].toLowerCase().includes(lowercasedFilter)
    );
  });

  const onSort = (sortType: React.SetStateAction<string>) => {
    setSortType(sortType);
  };

  return (
    <div style={{ marginTop: "3rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <div>List of countries</div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ position: "relative", marginRight: "1rem" }}>
            <input
              type="text"
              placeholder="Filter"
              name="namePrefix"
              style={{ padding: "0.35rem" }}
              onChange={searchFilter}
            />
            <div style={{ position: "absolute", top: "5px", right: "5px" }}>
              <BsSearch size="16" />
            </div>
          </div>
          <div style={{ width: "8rem" }}>
            <div className="btn-group">
              <button
                type="button"
                className="btn dropdown-toggle sort-button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {sortType === "asc"
                  ? "Ascending"
                  : sortType === "desc"
                  ? "Descending"
                  : "Select"}
              </button>
              <ul className="dropdown-menu sort-button">
                <li>
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={() => onSort("asc")}
                  >
                    Ascending
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={() => onSort("desc")}
                  >
                    Descending
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="country-list-items">
        {countries ? (
          filteredData.map((item: any, index: number) => (
            <div key={index}>
              <Link
                style={{ display: "block" }}
                to={`/regions?countryCode=${item.code}&countryName=${item.name}`}
              >
                {item.name}
              </Link>
            </div>
          ))
        ) : (
          <p>No countries found</p>
        )}
      </div>
      <div
        style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
      >
        {countries && countries.length > 10 ? (
          <button className="secondary-button">Load More</button>
        ) : (
          <p>There are no more countries</p>
        )}
      </div>
    </div>
  );
}
