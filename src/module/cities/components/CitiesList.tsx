import React from "react";
import useTimeout from "../../../common/useTimeout";
import { Modal } from "../../../common/Modal";
import { ToggleState } from "../../../common/Toggle";
import { BsSearch } from "react-icons/bs";
import AdvancedFilter from "./AdvancedFilter";
import CityCard from "./CityCard";

export default function CitiesList({
  cities,
  countryCode,
  regioncode,
}: {
  cities: any;
  countryCode: any;
  regioncode: any;
}): JSX.Element {
  const [filter, setFilter] = React.useState("");
  const [sortType, setSortType] = React.useState("");
  const [selectedCity, setSelectedCity] = React.useState<any | null>(null);

  console.log(selectedCity);

  const sorted = cities.sort((a: { name: string }, b: { name: any }) => {
    const isReversed = sortType === "asc" ? 1 : -1;
    return isReversed * a.name.localeCompare(b.name);
  });

  const searchFilter = (event: any) => {
    setFilter(event.target.value);
  };
  const lowercasedFilter = filter.toLowerCase();
  const filterData = sorted?.filter((item: any) => {
    return Object.keys(item).some(
      (key) =>
        typeof item[key] === "string" &&
        item[key].toLowerCase().includes(lowercasedFilter)
    );
  });

  const onSort = (sortType: React.SetStateAction<string>) => {
    setSortType(sortType);
  };

  const getSelectedCity = (selectedCity: any) => {
    setSelectedCity(selectedCity);
  };

  const [visible, setVisible] = React.useState(true);

  const hide = () => setVisible(false);

  useTimeout(hide, 30000);

  return (
    <div style={{ marginTop: "3rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <div style={{ fontSize: "18px" }}>List of cities</div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ marginRight: "1rem" }}>
            <ToggleState
              render={({ isOpen, open, close }) => {
                return (
                  <>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        isOpen ? close() : open();
                      }}
                    >
                      Advanced Filter
                    </button>
                    <Modal
                      isActive={isOpen}
                      modalContentWidth={"30%"}
                      header={() => "Advanced Filter"}
                      close={() => close()}
                      renderBody={() => {
                        return (
                          <AdvancedFilter
                            close={() => close()}
                            countryCode={countryCode}
                            regioncode={regioncode}
                          />
                        );
                      }}
                    ></Modal>
                  </>
                );
              }}
            />
          </div>

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
      <div>
        <div>
          <div className="row">
            {cities ? (
              filterData.map((item: any, index: number) => (
                <div className="col-lg-3" key={index}>
                  <CityCard
                    item={item}
                    visible={visible}
                    getSelectedCity={getSelectedCity}
                  />
                </div>
              ))
            ) : (
              <p>No cities found</p>
            )}
          </div>
        </div>
      </div>
      <div
        style={{ marginTop: "30px", display: "flex", justifyContent: "center" }}
      >
        {cities && cities.length > 10 ? (
          <button className="secondary-button">Load More</button>
        ) : (
          <p>There are no more cities</p>
        )}
      </div>
    </div>
  );
}
