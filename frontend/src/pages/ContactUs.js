import React from "react";
import Layout from "./../components/Layouts/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
const ContactUs = () => {
    return (
        <Layout>
            <div className="row contactus ">
                <div className="col-md-5 ">
                    <img
                        // images are in public folder so we donot need to import explicitly
                        src="/images/contact us.svg"
                        alt="contactus"
                        style={{ width: "100%" }}
                    />
                </div>
                <div className="col-md-5">
                    <h1 className="contact-blk p-2 text-white text-center">Contact us</h1>
                    <p className="fw-normal text-justify mt-2">
                        For any queries or information regarding our products, please feel free to contact us at any time. Our dedicated customer support team is available 24/7 to assist you. Your satisfaction is our top priority, and we are committed to providing timely and helpful assistance. Whether you have questions about product details, placing an order, or any other inquiries, we're here to help. Reach out to us with confidence, and experience exceptional customer service at any hour.


                    </p>
                    <p className="fw-semibold mt-3">
                        <BiMailSend /> : www.help@myecommerceapp.com
                    </p>
                    <p className="fw-semibold mt-3">
                        <BiPhoneCall /> : +966-123456789
                    </p>
                    <p className="fw-semibold mt-3">
                        <BiSupport /> : 1800-5544-0000 (toll free)
                    </p>
                </div>
            </div>
        </Layout>
    );
};

export default ContactUs;