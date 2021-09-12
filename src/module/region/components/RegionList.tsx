import React from "react";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";

export default function RegionList({ regions }: { regions: any }): JSX.Element {
  const [filter, setFilter] = React.useState("");
  const [sortType, setSortType] = React.useState("");

  console.log(filter);

  const sorted = regions.sort((a: { name: string }, b: { name: any }) => {
    const isReversed = sortType === "asc" ? 1 : -1;
    return isReversed * a.name.localeCompare(b.name);
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
        <div style={{ fontSize: "18px" }}>List of regions</div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ position: "relative", marginRight: "1rem" }}>
            <input
              type="text"
              placeholder="Filter"
              name="namePrefix"
              style={{ padding: "0.35rem" }}
              onChange={(e: any) => {
                setFilter(e.target.value);
              }}
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
        {regions &&
          sorted.map((item: any, index: number) => (
            <div key={index}>
              <Link
                style={{ display: "block" }}
                to={`/cities?regionCode=${item.isoCode}&regionName=${item.name}&countryCode=${item.countryCode}`}
              >
                {item.name}
              </Link>
            </div>
          ))}
      </div>
      <div
        style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
      >
        {regions && regions.length > 10 ? (
          <button className="secondary-button">Load More</button>
        ) : (
          <p>There are no more regions</p>
        )}
      </div>
    </div>
  );
}
