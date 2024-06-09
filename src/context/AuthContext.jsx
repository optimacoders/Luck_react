import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogedin, setisLogedin] = useState(
    Cookies.get("token") ? true : false
  );
  const [token, settoken] = useState(
    Cookies.get("token") ? Cookies.get("token") : ""
  );
  const [userDetails, setuserDetails] = useState(null);
  const [favourites, setfavourites] = useState([]);
  const [currency, setcurrency] = useState(null)
  const url = import.meta.env.VITE_BACKEND;

  const getUserDetails = async () => {
    if (isLogedin && userDetails === null && token) {
      try {
        const res = await axios.get(`${url}/auth/getuserdetails`, {
          headers: {
            authorization: `bearer ${token}`,
          },
        });
        setuserDetails(res.data.userdetails);
        setfavourites(res.data.favourites);
      } catch (err) {
        if (err.response.status == 401) {
          setuserDetails(null);
        }
      }
    }
  };

  const getlocation = () => {
    axios.get('https://ipapi.co/json/').then((response) => {
      let data = response.data;
      setcurrency(data.currency)
    }).catch((error) => {
      console.log(error);
    });
  }

  const value = {
    isLogedin,
    setisLogedin,
    token,
    settoken,
    getUserDetails,
    favourites,
    setfavourites,
    userDetails,
    getlocation,
    currency
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const AuthHook = () => {
  const context = useContext(AuthContext);
  return context;
};

export default AuthHook;
