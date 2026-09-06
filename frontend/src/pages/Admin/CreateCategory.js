import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layouts/Layout";
import AdminMenu from "./../../components/Layouts/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";
const CreateCategory = () => {
    // getting all catedgories
    const [categories, setCategories] = useState([]);
    // input from category form
    const [name, setName] = useState("");
    // state for modal visible
    const [visible, setVisible] = useState(false);
    // to store the category being selected for updated
    const [selected, setSelected] = useState(null);
    // updated name for getting the selected categories updated name 
    const [updatedName, setUpdatedName] = useState("");


    //handle Form post
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/category/create-category`, {
                name,
            });
            if (data?.success) {
                toast.success(`${name} is created`);
                // calling again to show updated tabel
                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("somthing went wrong in input form");
        }
    };

    //get all category
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/category/get-category`);
            if (data.success) {
                setCategories(data.category);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something wwent wrong in getting catgeory");
        }
    };
    // only 1 time render
    useEffect(() => {
        getAllCategory();
    }, []);

    //update category
    const handleUpdate = async (e) => {

        e.preventDefault();
        try {
            const { data } = await axios.put(
                // getting id from selected object
                `${process.env.REACT_APP_API}/api/category/update-category/${selected._id}`,
                { name: updatedName }
            );
            if (data.success) {
                // toast.success(data.message);  not working correctly
                // selected had old objct
                toast.success(`${selected.name} is updated`);
                // clearing selected once update completed
                setSelected(null);
                // clearing updatednames once update completed
                setUpdatedName("");
                // on successful update closing model
                setVisible(false);
                // refreshing all category
                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Somthing went wrong");
        }
    };
    //delete category iwth id
    const handleDelete = async (pId) => {
        try {
            const { data } = await axios.delete(
                `${process.env.REACT_APP_API}/api/category/delete-category/${pId}`
            );
            if (data.success) {
                toast.success(`category is deleted`);
                // reredering categories
                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Somthing went wrong");
        }
    };
    return (
        <Layout title={"Dashboard - Create Category"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>

                    <div className="col-md-9">
                        <h1>Manage Category</h1>
                        <div className="p-3 w-50">
                            <CategoryForm
                                handleSubmit={handleSubmit}
                                value={name}
                                setValue={setName}
                            />
                        </div>
                        <div className="w-75">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* chaining checks */}
                                    {categories?.map((c) => (
                                        <>
                                            <tr>
                                                <td key={c._id}> {c.name} </td>
                                                <td>
                                                    <button
                                                        className="btn btn-primary ms-2"
                                                        onClick={() => {
                                                            // this will show pop up
                                                            setVisible(true);
                                                            // setting updated name
                                                            setUpdatedName(c.name);
                                                            // setting category object
                                                            setSelected(c);
                                                        }}
                                                    >
                                                        Update
                                                    </button>
                                                    <button
                                                        className="btn btn-danger ms-2"
                                                        onClick={() => {
                                                            handleDelete(c._id);
                                                        }}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        </>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* model pop up */}
                        <Modal
                            //  visibility false
                            onCancel={() => setVisible(false)}
                            // i dnot want footer
                            footer={null}
                            visible={visible}
                        >
                            {/* passing form here */}
                            <CategoryForm
                                // passing updated  value
                                value={updatedName}
                                // setter for updatedname
                                setValue={setUpdatedName}
                                // sending update handler
                                handleSubmit={handleUpdate}
                            />
                        </Modal>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CreateCategory;