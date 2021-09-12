import { Route, Routes } from "react-router-dom";
import React from "react";
import CountryComponent from "../components/CountryComponent";

export class CountryRoute extends React.Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<CountryComponent />} />
      </Routes>
    );
  }
}
