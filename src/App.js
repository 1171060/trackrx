import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importing components
import SplashScreenHandler from "./components/SplashScreenHandler";
import Home from "./pages/home/Home";
import NavBar from "./components/NavBar/navBar";
import Groups from "./pages/groups/groups";
import HealthCareProvider from "./pages/careProvider/HealthCareProvider";
import ImportantUsage from "./components/disclaimers/importantUsage";
import Disclaimer from "./components/disclaimers/disclaimer";
import DataPrivacy from "./components/disclaimers/dataPrivacy";
import Footer from "./components/footer/footer";
import ConditionalHeader from "./components/ConditionalHeader";
import Settings from "./pages/settings/Settings";
import FooterNav from "./components/disclaimers/disclaimerNav";
import NotFoundPage from "./components/PageNotFound";

// Importing forms components
import MedsManager from "./pages/medsList/MedsManager";
import MedForm from "./js/medForm";
import GroupTrackForm from "./js/GroupTrackForm";
// import MedList from "./js/MedList";

// Importing CSS
import "./index.css";

import { openDatabase } from "./indexedDB";

function App() {
  useEffect(() => {
    openDatabase()
      .then((db) => {
        console.log("Database opened successfully:", db);
      })
      .catch((error) => {
        console.error("Error opening database:", error);
      });
  }, []);
  return (
    <div className="site-container">
      <BrowserRouter>
        <NavBar />
        <ConditionalHeader />
        <div className="content-wrap">
          <Routes>
            <Route path="/" element={<SplashScreenHandler />} />
            <Route path="/home" element={<Home />} />
            <Route path="/meds" element={<MedsManager />} />
            <Route path="/add-med" element={<MedForm />} />
            <Route path="/edit-med/:medId" element={<MedForm />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/healthcare" element={<HealthCareProvider />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/add-group" element={<GroupTrackForm />} />
            <Route path="/important" element={<ImportantUsage />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/data-privacy" element={<DataPrivacy />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <FooterNav />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
