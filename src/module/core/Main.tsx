import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import "styled-components/macro";
import { CountryRoute } from "../country/route";
import { RegionsRoute } from "../region/route";
import { CitiesRoute } from "../cities/route";

const MainContainer = styled.div`
  min-height: 100%;
  margin: 5rem;
`;

export const Main = (): JSX.Element => {
  return (
    <>
      <>
        <MainContainer>
          <div style={{ textAlign: "center" }}>
            <b style={{ fontSize: "24px" }}>GEO SOFTWARE</b>
          </div>
          <div>
            <div>
              <Routes>
                <Route path={"/countries*"} element={<CountryRoute />} />
                <Route path={"/regions*"} element={<RegionsRoute />} />
                <Route path={"/cities*"} element={<CitiesRoute />} />
              </Routes>
            </div>
          </div>
          <ToastContainer
            toastClassName={"toastContainer e-12"}
            hideProgressBar
            position="bottom-left"
            closeButton={false}
            autoClose={5000}
            bodyClassName={"toastBody"}
          />
        </MainContainer>
      </>
    </>
  );
};
