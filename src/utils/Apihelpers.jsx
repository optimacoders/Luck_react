import axios from "axios";
let token = 0;

export const getRequest = async (url, auth) => {
  try {
    const response = await axios.get(url, {
      headers: {
        authorization: auth ? `Bearer ${token}` : "",
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error making GET request to ${url}:`, error);
    throw error;
  }
};

export const postRequest = async (url, data, auth) => {
  try {
    const response = await axios.post(url, data, {
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

export const putRequest = async (url, data, auth) => {
  try {
    const response = await axios.put(url, data, {
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

export const deleteRequest = async (url, auth) => {
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
