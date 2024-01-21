import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./StockResults.scss";

import { fetchResultOfStocks, getStocks } from "../../redux/Stocks/stockSlice";
import { AppDispatch } from "../../redux/store";

interface StockResultsProps {
  tickerData: {
    tickerName: string,
    fromDate: string,
    toDate: string
  };
}

const StockResults: React.FC<StockResultsProps> = ({ tickerData }) => {
  const dispatch = useDispatch<AppDispatch>();
  const stocks = useSelector(getStocks);
  
  useEffect(() => {
    dispatch(fetchResultOfStocks(tickerData));
  }, [dispatch, tickerData]);

  return (
    <div>
      <h2>Stock Results</h2>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Maximum</th>
            <th>Minimum</th>
            <th>Average</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Price</td>
            <td>{stocks?.calcPrice?.max.toFixed(2)}</td>
            <td>{stocks?.calcPrice?.min.toFixed(2)}</td>
            <td>{stocks?.calcPrice?.avg.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Volume</td>
            <td>{stocks?.calcVolume?.max.toFixed(2)}</td>
            <td>{stocks?.calcVolume?.min.toFixed(2)}</td>
            <td>{stocks?.calcVolume?.avg.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default StockResults;
