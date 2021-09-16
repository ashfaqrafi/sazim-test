import React from "react";
import "styled-components/macro";
import { toast } from "react-toastify";
import { useFormik, Field, FormikProvider } from "formik";
import axios from "axios";

export default function AdvancedFilter({
  close,
  countryCode,
  regioncode,
}: {
  close: () => void;
  countryCode: any;
  regioncode: any;
}): JSX.Element {
  const [filteredData, setFilteredData] = React.useState([]);
  const [selectedTypes, setSelectedTypes] = React.useState("");
  const [selectedSort, setSelectedSort] = React.useState("");

  console.log({ filteredData });

  const formik = useFormik({
    initialValues: {
      keyword: "",
      offset: "",
      limit: "",
      types: "",
      sort: "",
      minPopulation: "",
    },

    onSubmit: async (values, actions) => {
      try {
        actions.setSubmitting(true);
        const reqbody: any = {
          keyword: values.keyword,
          offset: values.offset,
          limit: values.limit,
          types: selectedTypes,
          sort: selectedSort,
          minPopulation: values.minPopulation,
        };

        const options = {
          method: "GET",
          url: `https://wft-geo-db.p.rapidapi.com/v1/geo/countries/${countryCode}/regions/${regioncode}/cities`,
          params: reqbody,
          headers: {
            "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
            "x-rapidapi-key":
              "1c8bec90d8msh4fe16494e72b79ep16f4c4jsn4f21e6d6fea7",
          },
        };

        axios
          .request(options as {})
          .then(function (response) {
            setFilteredData(response.data.data);
            toast.success("Filtered Successfully");
            actions.setSubmitting(false);
            close();
          })
          .catch(function (error) {
            console.error(error);
            toast.error("Failed to perform filter");
          });
      } catch (err) {
        console.log(err);
        actions.setSubmitting(false);
        toast.error("Failed to perform filter");
      }
    },
  });

  return (
    <FormikProvider value={formik}>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <input
              id="keyword"
              name="keyword"
              type="text"
              placeholder="Keyword"
              onChange={formik.handleChange}
              value={formik.values.keyword}
            />
          </div>
          <div className="row mb-4">
            <div className="col">
              <input
                id="offset"
                name="offset"
                type="number"
                placeholder="Offset"
                onChange={formik.handleChange}
                value={formik.values.offset}
              />
            </div>
            <div className="col">
              <input
                id="limit"
                name="limit"
                type="number"
                placeholder="Limit"
                onChange={formik.handleChange}
                value={formik.values.limit}
              />
            </div>
          </div>

          <div className="row mb-4">
            <div className="col">
              <div style={{ marginRight: "10px" }}>
                <label style={{ width: "100%" }}>
                  <label htmlFor="types">Type</label>
                  <Field
                    as="select"
                    name="types"
                    className="form-select"
                    maxLength={80}
                    onChange={(e: any) => {
                      setSelectedTypes(e.target.value);
                      formik.setFieldValue("types", e.target.value);
                    }}
                  >
                    <option value="">Select</option>
                    <option value="CITY">CITY</option>
                    <option value="ADM2">ADM2</option>
                  </Field>
                </label>
              </div>
            </div>
            <div className="col">
              <div style={{ marginRight: "10px" }}>
                <label style={{ width: "100%" }}>
                  <label htmlFor="sort">Sort by</label>
                  <Field
                    as="select"
                    name="sort"
                    className="form-select"
                    maxLength={80}
                    onChange={(e: any) => {
                      setSelectedSort(e.target.value);
                      formik.setFieldValue("sort", e.target.value);
                    }}
                  >
                    <option value="">Select</option>
                    <option value="name">Name</option>
                    <option value="elevation">Elevation</option>
                    <option value="population">Population</option>
                  </Field>
                </label>
              </div>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col">
              <input
                id="minPopulation"
                name="minPopulation"
                type="number"
                placeholder="Min Population"
                onChange={formik.handleChange}
                value={formik.values.minPopulation}
              />
            </div>
          </div>

          <div className="d-flex justify-content-end mt-4">
            <button
              className="close-button me-3"
              onClick={() => {
                close();
              }}
            >
              Close
            </button>
            <button
              disabled={formik.isSubmitting}
              className="filter-button"
              type="submit"
            >
              Filter
            </button>
          </div>
        </form>
      </div>
    </FormikProvider>
  );
}
