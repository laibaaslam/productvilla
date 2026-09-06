import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthProvider";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function PrivateRoute() {

    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();

    useEffect(() => {
        const authCheck = async () => {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/auth/user-auth`);
            if (res.data.ok) {
                setOk(true);
            } else {
                setOk(false);
            }
        };
        // if auth is present and token is present  call check auth 
        if (auth?.token) authCheck();
    }, [auth?.token.auth]);
    //    return outlet if ok if not spinner
    // outlet is used if we are using nested router in our app.js 
    return ok ? <Outlet /> : <Spinner path="" />;
}