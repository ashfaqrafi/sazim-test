import { Route, Routes } from "react-router-dom";
import React from "react";
import RegionComponent from "../components/RegionComponent";

export class RegionsRoute extends React.Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<RegionComponent />} />
      </Routes>
    );
  }
}
