import axios from "axios";

let local = true;
let url = (local) ? "http://localhost:8080" : "https://back-santocredito-production.up.railway.app/"

const api = axios.create(
  {
    baseURL: url
  }
);

export default api;