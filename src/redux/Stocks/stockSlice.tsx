import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import stockApi from "../../common/apis/StockApi";

interface Volume {
  max: number;
  min: number;
  avg: number;
}

interface Price {
  max: number;
  min: number;
  avg: number;
}

interface CalcTable {
  calcPrice: Price;
  calcVolume: Volume;
}

interface StockState {
  resultOfStocks: CalcTable;
}

export const fetchResultOfStocks = createAsyncThunk(
  "stock/fetchResultOfStocks",
  async (tickerData: any) => {
    const response = await stockApi.get(
      `${tickerData.tickerName}/${tickerData.fromDate}/${tickerData.toDate}`
    );

    if (response.status === 200) {
      const calcVolume = getVolume(response.data.results, "v");
      const calcPrice = getPrice(response.data.results);
      const calcTable: CalcTable = { calcPrice, calcVolume };

      return calcTable;
    }
  }
);

function getVolume(arr: any[], prop: string): Volume {
  let volume: Volume = { max: arr[0][prop], min: arr[0][prop], avg: 0 };

  for (let i = 0; i < arr.length; i++) {
    if (volume == null) {
      volume = { max: arr[i][prop], min: arr[i][prop], avg: 0 };
    } else if (parseInt(arr[i][prop]) > parseInt(volume.max.toString())) {
      volume.max = arr[i][prop];
    } else if (parseInt(arr[i][prop]) < parseInt(volume.min.toString())) {
      volume.min = arr[i][prop];
    }

    volume.avg += arr[i][prop] / arr.length;
  }

  return volume;
}

function getPrice(arr: any[]): Price {
  let price: Price = { max: arr[0]["h"], min: arr[0]["l"], avg: 0 };

  for (let i = 0; i < arr.length; i++) {
    if (price == null) {
      price = { max: arr[0]["h"], min: arr[0]["l"], avg: arr[0]["vw"] };
    }

    if (parseInt(arr[i]["h"]) > parseInt(price.max.toString())) {
      price.max = arr[i]["h"];
    }

    if (parseInt(arr[i]["l"]) < parseInt(price.min.toString())) {
      price.min = arr[i]["l"];
    }

    price.avg += arr[i]["vw"] / arr.length;
  }

  return price;
}
const initialState: StockState = {
  resultOfStocks: {
    calcPrice: { max: 0, min: 0, avg: 0 },
    calcVolume: { max: 0, min: 0, avg: 0 },
  },
};

const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(
      fetchResultOfStocks.fulfilled,
      (state: any, action: any) => {
        return { ...state, resultOfStocks: action.payload };
      }
    );
  },
});

export const getStocks = (state: any) => state.stock.resultOfStocks;
export default stockSlice.reducer;
