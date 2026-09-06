import React from "react";
import Layout from "./../components/Layouts/Layout";

const AboutUs = () => {
    return (
        <Layout>
            <div className="row contactus ">
                <div className="col-md-6 ">
                    <img
                        src="/images/about.jpeg"
                        alt="contactus"
                        style={{ width: "100%" }}
                    />
                </div>
                <div className="col-md-5">
                    <h1 className="contact-blk p-2 text-white text-center">Get to Know Us</h1>
                    <p className=" fw-normal text-justify mt-2">
                        Welcome to [Your eCommerce Brand]—where style meets convenience! At [Your eCommerce Brand], we're on a mission to make your shopping experience unforgettable. Our curated collection of [mention your product category] brings you the latest trends and timeless classics, all in one place. Founded with a passion for [mention your brand's core values, e.g., quality, affordability], we strive to deliver not just products but an experience that resonates with your lifestyle. Our team is dedicated to providing exceptional customer service, ensuring you find exactly what you're looking for. Thank you for choosing [Your eCommerce Brand]—your trusted destination for fashion-forward finds and unbeatable deals.
                    </p>
                </div>
            </div>
        </Layout>
    );
};

export default AboutUs;