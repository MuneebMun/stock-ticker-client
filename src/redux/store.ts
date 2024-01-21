import { configureStore } from "@reduxjs/toolkit";
import stockReducer from "./Stocks/stockSlice";

export const store = configureStore({
    reducer: {
        stock: stockReducer
    }
});

export type AppDispatch = typeof store.dispatch