import React from "react";
import { Link } from "react-router-dom";
import Layout from "./../components/Layouts/Layout";

const ErrorPage = () => {
    return (
        <Layout>
            <div className="err">

                <h1 className="err-heading">Oops ! Page Not Found</h1>
                <h2 className="err-title">404</h2>
                {/* Takes back to home */}
                <Link to="/" className="err-btn">
                    Go Back
                </Link>
            </div>
        </Layout>
    );
};

export default ErrorPage;