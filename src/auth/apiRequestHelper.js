import axios from "axios";
import config from "../config";

const getHeaders = () => {
  let uid = localStorage.getItem("uid");
  let client = localStorage.getItem("client");
  let access_token = localStorage.getItem("access_token");

  return {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    "access-token": access_token,
    client: client,
    uid: uid,
  };
};


const getOpenMovies = async (end_point) => {
  const headers = getHeaders();
  return axios.get(`${config.BASE_URL}/${end_point}`, { headers })
}


const ApiServiceHelper = {
  getOpenMovies,
}

export default ApiServiceHelper;