import { Route, Routes } from "react-router-dom";
import React from "react";
import CitiesComponent from "../components/CitiesComponent";

export class CitiesRoute extends React.Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<CitiesComponent />} />
      </Routes>
    );
  }
}
