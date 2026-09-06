import React from "react";
import axios from "axios";
import Layout from "./../components/Layouts/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../styles/CartStyles.css";
const CartPage = () => {

    // for checking if loogin thy checkout possible else go to login
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();
    const navigate = useNavigate();



    //total price
    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map((item) => {
                total = total + item.price;
            });
            // local concurrency string
            return total.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
            });
        } catch (error) {
            console.log(error);
        }
    };

    //handle payments
    const handlePayment = async () => {
        try {
            // setLoading(true);
            // const { nonce } = await instance.requestPaymentMethod();
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/product/payment`, {
                cart,
            });
            // setLoading(false);
            localStorage.removeItem("cart");
            setCart([]);
            navigate("/dashboard/user/orders");
            toast.success("Payment Completed Successfully ");
        } catch (error) {
            console.log(error);
            // setLoading(false);
        }
    };
    //detele item
    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart];
            // getting array index of item to be rmvd 
            let index = myCart.findIndex((item) => item._id === pid);
            // remivung item
            myCart.splice(index, 1);
            // resetting global state
            setCart(myCart);
            // changing local storage 
            localStorage.setItem("cart", JSON.stringify(myCart));
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Layout>
            <div className="cart-page">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="text-center p-2 mb-1">
                            {!auth?.user
                                ? "Hello Guest"
                                : `Hello  ${auth?.token && auth?.user?.name}`}
                            <p className="text-center">
                                {cart?.length
                                    ? `You Have ${cart.length} items in your cart ${auth?.token ? "" : "please login to checkout !"
                                    }`
                                    : " Your Cart Is Empty"}
                            </p>
                        </h1>

                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-7 p-0 m-0">
                            {cart?.map((p) => (
                                <div className="row card flex-row" key={p._id}>
                                    <div className="col-md-4">
                                        <img
                                            src={`${process.env.REACT_APP_API}/api/product/product-photo/${p._id}`}
                                            className="card-img-top"
                                            alt={p.name}
                                            width="100px"
                                            height={"100px"}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <p>{p.name}</p>
                                        <p>{p.description.substring(0, 30)}</p>
                                        <p>Price : {p.price}</p>
                                    </div>
                                    <div className="col-md-4 cart-remove-btn">
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => removeCartItem(p._id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="col-md-5 cart-summary">
                            <h2>Cart Summary</h2>
                            <p>Total | Checkout | <strong> Cash Payment only</strong> </p>
                            <hr />
                            {/* total function call */}
                            <h4>Total : {totalPrice()} </h4>
                            {/* conditional render if address present */}
                            {auth?.user?.address ? (
                                <>
                                    {/* address pesent */}
                                    <div className="mb-3">
                                        <h4>Current Address</h4>
                                        <h5>{auth?.user?.address}</h5>
                                        <button
                                            className="btn btn-outline-warning"
                                            // profile update form 
                                            onClick={() => navigate("/dashboard/user/profile")}
                                        >
                                            Update Address
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="mb-3">
                                    {auth?.token ? (
                                        // if user lged in
                                        <button
                                            className="btn btn-outline-warning"
                                            onClick={() => navigate("/dashboard/user/profile")}
                                        >
                                            Update Address
                                        </button>
                                    ) : (
                                        <button
                                            className="btn btn-outline-warning"
                                            onClick={() =>
                                                navigate("/login", {
                                                    // this will maintain state to after lgoin in take us back to cartpafge
                                                    state: "/cart",
                                                })
                                            }
                                        >
                                            Please Login to checkout
                                        </button>
                                    )}
                                </div>
                            )}
                            <div className="mt-2">
                                <button
                                    className="btn btn-primary"
                                    onClick={handlePayment}
                                    disabled={!auth?.user?.address}
                                >
                                    Checkout
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CartPage;