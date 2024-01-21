import React, { useState, FormEvent } from "react";

import "./StockSearchForm.scss";

import StockResults from "../StockResults/StockResults";

const StockSearchForm: React.FC = () => {
  const [ticker, setTicker] = useState<string>("");
  const [fromDate, setFromDate] = useState<string>("2023-01-01");
  const [toDate, setToDate] = useState<string>("2023-12-31");

  const [searchWord, setSearchWord] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setSearchWord(true);
  };

  return (
    <div className="searchForm">
      <form onSubmit={handleSubmit}>
        <label>
          <b>Enter a Stock Ticker</b>
        </label>
        <input
          type="text"
          value={ticker}
          className="searchText"
          onChange={(e) => setTicker(e.target.value)}
        />
        <label>
          <b>From</b>
        </label>
        <input
          type="date"
          value={fromDate}
          className="fromDate"
          onChange={(e) => setFromDate(e.target.value)}
        />
        <label>
          <b>To</b>
        </label>
        <input
          type="date"
          value={toDate}
          className="toDate"
          onChange={(e) => setToDate(e.target.value)}
        />
        <button type="submit" className="searchButton" disabled={ticker === ""}>
          Search
        </button>
      </form>
      {searchWord ? (
        <StockResults tickerData={{tickerName: ticker, fromDate: fromDate, toDate: toDate}} />
      ) : null}
    </div>
  );
};

export default StockSearchForm;
