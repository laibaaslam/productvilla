import React, { useState, useEffect } from "react";
import Layout from "./../components/Layouts/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
const ProductDetails = () => {
    const params = useParams();
    // const navigate = useNavigate();
    const [product, setProduct] = useState({});


    //inital details/time when slug is got 
    useEffect(() => {
        if (params?.slug) getProduct();
    }, [params?.slug]);
    //getProduct
    const getProduct = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/product/get-product/${params.slug}`
            );
            setProduct(data?.product);
            // getSimilarProduct(data?.product._id, data?.product.category._id);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout>
            <div className="row container mt-5">
                <div className="col-md-6">
                    <img
                        src={`${process.env.REACT_APP_API}/api/product/product-photo/${product._id}`}
                        className="card-img-top"
                        alt={product.name}
                        height="450"
                        width={"350px"}
                    />
                </div>
                <div className="col-md-6 ">
                    <h1 className="text-center">Product Details</h1>
                    <h4>Name : {product.name}</h4>
                    <h4>Description : {product.description}</h4>
                    <h4>Price : {product.price}</h4>
                    <h4>Category : {product?.category?.name}</h4>
                    {/* <button class="btn btn-secondary ms-1">ADD TO CART</button> */}
                </div>
            </div>

        </Layout>
    );
};

export default ProductDetails;