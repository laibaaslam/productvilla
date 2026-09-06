import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layouts/Layout";
import AdminMenu from "./../../components/Layouts/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const CreateProduct = () => {
    const navigate = useNavigate();
    // all categories show as drop down
    const [categories, setCategories] = useState([]);
    // all attribute of product
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    // category id 
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    // photo
    const [photo, setPhoto] = useState("");

    //get all category
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/category/get-category`);
            if (data?.success) {
                // getting all categories
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something wwent wrong in getting catgeory");
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    //create product function
    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            // form type object
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("quantity", quantity);
            productData.append("photo", photo);
            productData.append("category", category);
            // post request
            const { data } = axios.post(
                `${process.env.REACT_APP_API}/api/product/create-product`,
                // input
                productData
            );
            // added not by  me
            if (data?.success) {
                // try hadnling 
                toast.error(data?.message);
            } else {
                toast.success("Product Created Successfully");
                navigate("/dashboard/admin/products");
            }
        } catch (error) {
            console.log(error);
            toast.error("something went wrong");
        }
    };

    return (
        <Layout title={"Dashboard - Create Product"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Create Product</h1>
                        <div className="m-1 w-75">
                            {/*  pre built antd design select*/}
                            <Select
                                // border not needed
                                bordered={false}
                                placeholder="Select a category"
                                size="large"
                                // can search 
                                showSearch
                                className="form-select mb-3"
                                // this value is provided by antd design
                                onChange={(value) => {
                                    setCategory(value);
                                }}
                            >
                                {/* dropdown list options */}
                                {categories?.map((c) => (
                                    // based on value:ID ALSO in product we stored category id 
                                    <Option key={c._id} value={c._id}>
                                        {c.name}
                                    </Option>
                                ))}
                            </Select>
                            <div className="mb-3">
                                <label className="btn btn-outline-secondary col-md-12">
                                    {/*conditional rendering: if photo found change button value to photo name */}
                                    {photo ? photo.name : "Upload Photo"}
                                    {/* input file type  */}
                                    <input
                                        type="file"
                                        name="photo"
                                        // only accepting images of any type jpg png
                                        accept="image/*"
                                        // targeting files as photo is presnt there
                                        onChange={(e) => setPhoto(e.target.files[0])}
                                        // defualt input style
                                        hidden
                                    />
                                </label>
                            </div>
                            {/* preview of image */}
                            <div className="mb-3">
                                {/* conditional render */}
                                {photo && (
                                    <div className="text-center">
                                        <img
                                            //using browser property to get image url 
                                            src={URL.createObjectURL(photo)}
                                            alt="product_photo"
                                            height={"200px"}
                                            className="img img-responsive"
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    // binding initial value
                                    value={name}
                                    placeholder="write a name"
                                    className="form-control"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <textarea
                                    type="text"
                                    value={description}
                                    placeholder="write a description"
                                    className="form-control"
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <input
                                    type="number"
                                    value={price}
                                    placeholder="write a Price"
                                    className="form-control"
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="number"
                                    value={quantity}
                                    placeholder="write a quantity"
                                    className="form-control"
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <Select
                                    bordered={false}
                                    placeholder="Select Shipping "
                                    size="large"
                                    // {/* SEARCH BASED ON 0 or 1 */}
                                    showSearch
                                    className="form-select mb-3"
                                    onChange={(value) => {
                                        setShipping(value);
                                    }}
                                >
                                    {/* SEARCH BASED ON 0 or 1 */}
                                    <Option value="0">No</Option>
                                    <Option value="1">Yes</Option>
                                </Select>
                            </div>
                            <div className="mb-3">
                                <button className="btn btn-primary" onClick={handleCreate}>
                                    CREATE PRODUCT
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CreateProduct;