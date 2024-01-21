import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";

import "./App.css";

import StockSearchForm from "./components/StockSearchForm/StockSearchForm";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <div>
          <h1>My Stock App</h1>
          <StockSearchForm />
        </div>
      </Provider>
    </div>
  );
}

export default App;
