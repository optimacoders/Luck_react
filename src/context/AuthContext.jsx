import { createContext, useContext, useState } from "react";
import Cookies from 'js-cookie';
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLogedin, setisLogedin] = useState(Cookies.get("token") ? true : false)
    const [token, settoken] = useState(Cookies.get("token") ? Cookies.get("token") : "")
    const [userDetails, setuserDetails] = useState(null)
    const url = import.meta.env.VITE_BACKEND;

    const getUserDetails = async () => {
        console.log("userDetails");
        if (isLogedin && userDetails === null && token) {
            console.log("buygvyu");
            try {
                const res = await axios.get(`${url}/auth/getuserdetails`, {
                    headers: {
                        "authorization": `bearer ${token}`
                    }
                });
                setuserDetails(res.data.userdetails)
            } catch (err) {
                if (err.response.status == 401) {
                    setuserDetails(null)
                }
            }
        }
    }

    const value = {
        isLogedin,
        setisLogedin,
        token,
        settoken,
        getUserDetails
    }

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}

const AuthHook = () => {
    const context = useContext(AuthContext);
    return context;
}

export default AuthHook;