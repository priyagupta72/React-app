import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DataTableComponent from "./components/DataTableComponent";
import RowDetailsPage from "./pages/RowDetailsPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DataTableComponent />} />
        <Route path="/row-details" element={<RowDetailsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
