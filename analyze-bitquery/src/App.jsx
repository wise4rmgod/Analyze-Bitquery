import React, { useState } from "react";
import "./App.css";
import DataFetcher from "./DataFetcher";
import ChartComponent from "./Chart";
import Report from "./Report";

function App() {
  const [historicalData, setHistoricalData] = useState([]);

  const onDataFetched = (data) => {
    setHistoricalData(data);
  };

  return (
    <div className="bg-gray-100 p-4">
      <div className="max-w-3xl mx-auto">
        <header className="bg-white p-4 shadow-md rounded-lg mb-4">
          <h1 className="text-2xl font-semibold mb-2">
            Blockchain Historical Data Analysis
          </h1>
          <DataFetcher onDataFetched={onDataFetched} />
          <ChartComponent data={historicalData} />
          <Report data={historicalData} />
        </header>
      </div>
    </div>
  );
}

export default App;
