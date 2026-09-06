import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
const Spinner = ({ path = "login" }) => {
    const [count, setCount] = useState(3);
    const navigate = useNavigate();
    // keep history of user l
    const location = useLocation();

    useEffect(() => {
        // setting interval to decrement count every sec by 1 
        const interval = setInterval(() => {
            setCount((prevcount) => --prevcount);
        }, 1000);
        //  count 0 redirect to login
        count === 0 &&


            navigate(`/${path}`, {
                // also setting state to cuurent path in other to maintain lacation history
                state: location.pathname,
            });
        // clearing interval
        return () => clearInterval(interval);
    }, [count, navigate, location]);
    return (
        <>
            <div
                className="d-flex flex-column justify-content-center align-items-center"
                style={{ height: "100vh" }}
            >
                <h1 className="fw-normal Text-center">Redirecting you in {count} second </h1>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </>
    );
};

export default Spinner;