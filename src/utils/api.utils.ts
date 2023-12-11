import axios, { AxiosRequestConfig } from "axios";

//Create an instance for axios using the URL as in environment variables
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

//This function can be called to set the authentication header on all future requests
const setAuthHeader = (token: string) => {
  // Add Auth header with token.
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

//Function will remove the auth header from all requests
const removeAuthHeader = () => {
  delete axiosInstance.defaults.headers.common["Authorization"];
};

// HTTP GET method
const httpGet = async <T>(url: string, config: AxiosRequestConfig = {}) => {
  const response = await axiosInstance.get<T>(url, config);
  return response;
};

// HTTP POST method
const httpPost = async <T>(
  url: string,
  data: any,
  config: AxiosRequestConfig = {}
) => {
  //Submit the request
  const response = await axiosInstance.post<T>(url, data, config);
  return response;
};

// HTTP DELETE method
const httpDelete = async (url: string, config: AxiosRequestConfig = {}) => {
  const response = await axiosInstance.delete(url, config);
  return response;
};
export { httpGet, httpPost, httpDelete, setAuthHeader, removeAuthHeader };
