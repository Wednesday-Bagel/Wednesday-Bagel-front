import axios from "axios";

const instance = axios.create({
  baseURL: "http://3.39.80.110:8080/",
});

export default instance;
