import React, { useState } from "react";
import Layout from "./../../components/Layouts/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "../../Authenticationstyles/AuthStyles.css";

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    // 
    const navigate = useNavigate();

    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(name, email, password, phone, address);
        try {
            // post route being called adding server port 8080 before request
            const res = await axios.post(`${process.env.REACT_APP_API}/api/auth/signup`, {
                name,
                email,
                password,
                phone,
                address,
            });

            // checking if res came and success :true
            if (res && res.data.success) {
                toast.success(res.data && res.data.message);
                // taking to the login page
                navigate("/login");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    return (
        // Wraped the forms in layout to fill space for children 
        <Layout title="Signup - Ecommerce App">
            <div className="form-container ">
                <form onSubmit={handleSubmit}>
                    <h4 className="title">SIGNUP</h4>
                    <div className="mb-3">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="form-control"
                            id="exampleInputName"
                            placeholder="Your Name"
                            required
                            autoFocus
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="form-control"
                            id="exampleInputPhone"
                            placeholder="Phone Number"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="form-control"
                            id="exampleInputAddress"
                            placeholder="House Address"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder="example@xyz.com"
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
                            placeholder="Password"
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        SIGNUP
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default SignUp;