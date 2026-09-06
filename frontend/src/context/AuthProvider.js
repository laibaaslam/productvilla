
// it is used to providing pages or funtionaliy based on roles /global state
import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

// context creating
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    // authentication object, we cn access this globally anywhere through "AuthProvider"
    const [auth, setAuth] = useState({
        user: null,
        token: "",
    });

    //default axios this adds gloablly token in axios request header useful for auth private routes
    axios.defaults.headers.common["Authorization"] = auth?.token;

    useEffect(() => {
        // access local storage auth var that we created in login
        const data = localStorage.getItem("auth");
        if (data) {
            const parseData = JSON.parse(data);
            setAuth({
                ...auth,
                user: parseData.user,
                token: parseData.token,
            });
        }
        //eslint-disable-next-line
        // used here to suppress any warnings related to missing dependencies in the dependency array of useEffect
        //dependencies are not included in the array because the effect is intended to run only once
    }, []);

    return (
        // any component can  wrap itself in this Authprovider to access auth state
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    );
};

// making custom hook named useAuth which can be used in any component
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };