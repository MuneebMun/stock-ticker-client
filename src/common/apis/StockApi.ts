import axios from "axios";
import commonConstants from "./CommonConstants";

export default axios.create({
  baseURL: commonConstants.BASE_URL,
  headers: {
    Accept: "application/json",
  }
});

