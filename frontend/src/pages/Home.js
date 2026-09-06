import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./../components/Layouts/Layout";
import { useCart } from "../context/cart";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/HomeStyles.css";
const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useCart();
    const navigate = useNavigate();
    const [total, setTotal] = useState(0);
    // page no  1 
    const [page, setPage] = useState(1);
    // state for pagination
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getAllProducts();
        getTotal();
    }, []);

    //get products
    const getAllProducts = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/product/product-list/${page}`);
            setLoading(false);
            setProducts(data.products);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    //getTotal Count og prodicts from api
    const getTotal = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/product/product-count`);
            // setting total
            setTotal(data?.total);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (page === 1) return;
        loadMore();
    }, [page]);
    //load more
    const loadMore = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/product/product-list/${page}`);
            // setting loading false
            setLoading(false);
            // 
            setProducts([...products, ...data?.products]);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };


    return (
        <Layout title={"ALl Products - Best offers "}>

            {/* banner */}
            {/* <img
                src="../"
                className="banner-img"
                alt="bannerimage"
                width={"100%"}
            /> */}
            <div className="container-fluid row mt-3 home-page">
                <div className="col-md-12">
                    <h1 className="text-center">All Products</h1>
                    <div className="d-flex flex-wrap">
                        {products?.map((p) => (
                            <div className="card m-2" style={{ width: "18rem" }}>
                                <img
                                    // getting pics separately
                                    src={`${process.env.REACT_APP_API}/api/product/product-photo/${p._id}`}
                                    className="card-img-top"
                                    alt={p.name}
                                />
                                <div className="card-body">
                                    <div className="card-name-price">
                                        <h5 className="card-title">{p.name}</h5>
                                        <h5 className="card-title card-price">
                                            {p.price.toLocaleString("en-US", {
                                                style: "currency",
                                                currency: "USD",
                                            })}
                                        </h5>
                                    </div>
                                    <p className="card-text ">
                                        {p.description.substring(0, 60)}...
                                    </p>
                                    <div className="card-name-price">
                                        <button
                                            className="btn btn-info ms-1"
                                            onClick={() => navigate(`/product/${p.slug}`)}
                                        >
                                            More Details
                                        </button>
                                        <button
                                            className="btn btn-dark ms-1"
                                            onClick={() => {
                                                setCart([...cart, p]);
                                                localStorage.setItem(
                                                    "cart",
                                                    JSON.stringify([...cart, p])
                                                );
                                                toast.success("Item Added to cart");
                                            }}
                                        >
                                            ADD TO CART
                                        </button>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>

                    <div className="m-2 p-3">
                        {products && products.length < total && (
                            <button
                                className="btn btn-warning"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setPage(page + 1);
                                }}
                            >
                                {/* button cliked loading value changes */}
                                {loading ? "Loading ..." : "Loadmore"}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default HomePage;