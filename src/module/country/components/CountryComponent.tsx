import React, { useState, useEffect } from "react";
import { Field, Formik, FormikHelpers } from "formik";
import CountryList from "./CountryList";
import axios from "axios";

function CountryComponent() {
  const [currency, setCurrency] = useState<any[]>([]);
  const [countries, setCountries] = useState<any[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState("");

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://wft-geo-db.p.rapidapi.com/v1/locale/currencies",
      headers: {
        "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
        "x-rapidapi-key": "1c8bec90d8msh4fe16494e72b79ep16f4c4jsn4f21e6d6fea7",
      },
    };

    axios
      .request(options as {})
      .then(function (response) {
        setCurrency(response.data.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [currency]);

  const initialValues = {
    currencyCode: "",
  };

  const _handleSubmit = (values: any, actions: FormikHelpers<any>) => {
    actions.setSubmitting(true);
    const options = {
      method: "GET",
      url: "https://wft-geo-db.p.rapidapi.com/v1/geo/countries",
      params: { currencyCode: selectedCurrency, limit: "10" },
      headers: {
        "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
        "x-rapidapi-key": "1c8bec90d8msh4fe16494e72b79ep16f4c4jsn4f21e6d6fea7",
      },
    };

    axios
      .request(options as {})
      .then(function (response) {
        setCountries(response.data.data);
      })
      .catch(function (error) {
        console.error(error);
      });
    actions.setSubmitting(false);
  };

  return (
    <div className="container">
      <Formik
        initialValues={initialValues}
        onSubmit={(values: any, actions: FormikHelpers<any>) => {
          _handleSubmit(values, actions);
        }}
      >
        {(formikBag) => (
          <form onSubmit={formikBag.handleSubmit}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                marginTop: "3rem",
              }}
            >
              <div style={{ marginRight: "10px" }}>
                <label>
                  <div>Select a currency</div>
                  <Field
                    as="select"
                    name="currencyCode"
                    className="form-select"
                    maxLength={80}
                    onChange={(e: any) => {
                      setSelectedCurrency(e.target.value);
                      formikBag.setFieldValue("currencyCode", e.target.value);
                    }}
                  >
                    <option value="">Select</option>
                    {currency &&
                      currency.map((item, index: number) => (
                        <option value={item.code} key={index}>
                          {item.code}
                        </option>
                      ))}
                  </Field>
                </label>
              </div>
              <div>
                <button
                  className="primary-button"
                  type="submit"
                  disabled={formikBag.isSubmitting}
                >
                  Find Countries
                </button>
              </div>
            </div>
          </form>
        )}
      </Formik>
      {countries && countries.length > 0 ? (
        <div>
          <CountryList countries={countries as any} />
        </div>
      ) : (
        <p style={{ marginTop: "1rem" }}>No countries found</p>
      )}
    </div>
  );
}

export default CountryComponent;
