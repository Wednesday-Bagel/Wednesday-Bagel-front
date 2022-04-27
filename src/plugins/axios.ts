import axios from "axios";

export const api_ = axios.create({
  baseURL: "http://api.jt-project.net",
});
