import { Component } from "react";
import { Navigate } from "react-router";
import { Routes, Route } from "react-router-dom";
import { Main } from "../module/core/Main";
import "../App.css";

class App extends Component {
  render() {
    return (
      <Routes>
        <Navigate to="/countries" />
        <Route path="/*" element={<Main />} />
      </Routes>
    );
  }
}

export default App;
