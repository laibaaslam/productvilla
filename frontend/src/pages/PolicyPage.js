import React from "react";
import Layout from "./../components/Layouts/Layout";

const PolicyPage = () => {
    return (
        <Layout>
            <div className="row contactus ">
                <div className="col-md-5 ">
                    <img
                        src="/images/policy.svg"
                        alt="contactus"
                        style={{ width: "100%" }}
                    />
                </div>
                <div className="col-md-5">
                    <h1 className="contact-blk p-2 text-white text-center">Legal Terms</h1>
                    <ul class="list-unstyled">
                        <li class=" fw-normal mb-1.75">
                            <span class="fw-bold">Terms of Service:</span> By accessing or using [ E-commerce App Name], you agree to abide by these Terms of Service.
                        </li>
                        <li class="fw-normal mb-1.75">
                            <span class="fw-bold">Updates:</span> [ Company Name] reserves the right to update or modify these terms at any time without prior notice.
                        </li>
                        <li class="fw-normal mb-1.75">
                            <span class="fw-bold">Account Security:</span> Users are responsible for maintaining the confidentiality of their account information and are liable for all activities occurring under their account.
                        </li>
                        <li class="fw-normal mb-1.75">
                            <span class="fw-bold">Refund Policy:</span> Refunds will be processed within [number of days] days after the returned product is received and inspected.
                        </li>
                        <li class="fw-normal mb-1.75">
                            <span class="fw-bold">Privacy:</span> We collect and use personal information as outlined in our Privacy Policy.
                        </li>
                        <li class="fw-normal mb-1.75">
                            <span class="fw-bold">Security Measures:</span> We employ industry-standard security measures to protect user data.
                        </li >
                        <li class="fw-normal mb-1.75">
                            <span class="fw-bold">Legal Matters:</span> Legal matters or requests should be directed to [ Legal Contact Email].
                        </li>
                    </ul>


                </div>
            </div>
        </Layout>
    );
};

export default PolicyPage;