import React, { useState } from "react";
import Layout from "./../../components/Layouts/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

import "../../Authenticationstyles/AuthStyles.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    // gives current location object 
    const location = useLocation();
    // form function
    const handleSubmit = async (e) => {
        // prevent default behaviour of js which is automatic relolading of page
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/auth/login`, {
                email,
                password,
            });
            if (res && res.data.success) {
                // once logged in use useAuth to set global state whcih user is logged in
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });
                // storing in local storage var named auth, for on refresh auth was set to default state
                localStorage.setItem("auth", JSON.stringify(res.data));
                // check there is any object current location redirect there eg when user login he is directed to user dashboard
                navigate(location.state || "/");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };
    return (
        <Layout title="Login - Ecommer App">
            <div className="form-container ">
                <form onSubmit={handleSubmit}>
                    <h4 className="title">LOGIN</h4>

                    <div className="mb-3">
                        <input
                            type="email"
                            // binding state values to input so that they change on onchange event
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder="example@xyz.com"
                            // warning not empty
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Your Password"
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        LOGIN
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default Login;