import axios from "axios";

const axiosInstance = axios.create({

  baseURL: 'http://localhost:3002/', // Replace with your API base URL

});
// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Modify the request config here (e.g., add headers, authentication tokens)
    const accessToken = JSON.parse(localStorage.getItem("token"));

    // ** If token is present add it to request's Authorization Header
    if (accessToken) {
      if (config.headers) config.headers.token = accessToken;
    }
    return config;
  },
  (error) => {
    // Handle request errors here
    console.log("REQUEST API FAILED", error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Modify the response data here (e.g., parse, transform)
    console.log("SUCCESS RESPONSE DATA", response);
    return response;
  },
  (error) => {
    // Handle response errors here
    console.log("ERROR IN FETCHING DATA", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;