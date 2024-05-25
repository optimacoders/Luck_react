import axios from "axios";
let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY1MTdkN2Y2ODIxMTNlMTlkYTRiNjhkIn0sImlhdCI6MTcxNjYxNjU3NX0.KjZ0g2P_9l16AEdX6fIK7sFPwPw5pNRxW8wwYP5qr4g";
const url = import.meta.env.VITE_BACKEND;

export const getRequest = async (auth, path) => {
  try {
    const response = await axios.get(url + path, {
      headers: {
        authorization: auth ? `Bearer ${token}` : "",
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error making GET request to ${url + path}:`, error);
    throw error;
  }
};
export const postRequest = async (auth, path, data) => {
  try {
    const response = await axios.post(url + path, data, {
      headers: {
        authorization: auth ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error making POST request to ${url}:`, error);
    throw error;
  }
};

export const putRequest = async (auth, path, data) => {
  try {
    const response = await axios.put(url + path, data, {
      headers: {
        authorization: auth ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error making POST request to ${url}:`, error);
    throw error;
  }
};

export const deleteRequest = async (auth) => {
  try {
    const response = await axios.delete(url, {
      headers: {
        authorization: auth ? `Bearer ${token}` : "",
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error making POST request to ${url}:`, error);
    throw error;
  }
};
