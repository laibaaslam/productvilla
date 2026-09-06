import userModel from "../models/user.js";
import orderModel from "../models/orderModel.js";
import { comparePassword, hashPassword } from "../helpers/authorizationHelper.js";
import JWT from "jsonwebtoken";

export const signupController = async (req, res) => {
    try {
        // getting input
        const { name, email, password, phone, address } = req.body;
        //validations return if not valid terminate further execution
        if (!name) {
            return res.send({ error: "Name Required!" });
        }
        if (!email) {
            return res.send({ error: "Email Required!" });
        }
        if (!password) {
            return res.send({ error: "Password Required!" });
        }
        if (!phone) {
            return res.send({ error: "Phone number Required!" });
        }
        if (!address) {
            return res.send({ error: "Address Required!" });
        }
        //check if this user already exists on basis of email becz we kept it unique for every user
        const Userexists = await userModel.findOne({ email });
        //exisiting user
        if (Userexists) {
            // this will notify use and redirect to login
            return res.status(200).send({
                success: true,
                message: "Already Registered please login",
            });
        }
        //if not then add/sign up new user // hashing the password for security

        const hashedPassword = await hashPassword(password);
        //saving user
        const user = await new userModel({
            name,
            email,
            phone,
            address,
            password: hashedPassword,
        }).save();
        //  201 for successfull creation or update
        res.status(201).send({
            success: true,
            message: "User Registered Successfully",
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Registeration",
            error,
        });
    }
};


//POST LOGIN
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        //validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid email or password",
            });
        }
        //check user in database based on email 
        const user = await userModel.findOne({ email });
        if (!user) {
            // not found 
            return res.status(404).send({
                success: false,
                message: "Not registerd Email",
            });
        }
        // in order to compare passwords we use compare password method
        const match = await comparePassword(password, user.password);
        if (!match) {
            // unauthorized access
            return res.status(401).send({
                success: false,
                message: "Invalid Password",
            });
        }

        //creating JWT token for user authentication on server  we can protect roues with this token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "3d",
        });

        res.status(200).send({
            success: true,
            message: "logged in successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            },
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in login",
            error,
        });
    }
};

//test controller
export const testController = (req, res) => {
    try {
        res.send("Protected Routes");
    } catch (error) {
        console.log(error);
        res.send({ error });
    }
};

//update prfole
export const updateProfileController = async (req, res) => {
    try {
        const { name, email, password, address, phone } = req.body;
        const user = await userModel.findById(req.user._id);
        //password
        if (password && password.length < 6) {
            return res.json({ error: "Passsword is required and 6 character long" });
        }
        const hashedPassword = password ? await hashPassword(password) : undefined;
        const updatedUser = await userModel.findByIdAndUpdate(
            req.user._id,
            {
                name: name || user.name,
                password: hashedPassword || user.password,
                phone: phone || user.phone,
                address: address || user.address,
            },
            { new: true }
        );
        res.status(200).send({
            success: true,
            message: "Profile Updated SUccessfully",
            updatedUser,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error WHile Update profile",
            error,
        });
    }
};

//userr orders
export const getOrdersController = async (req, res) => {
    try {
        const orders = await orderModel
            // find it on base of id of buyer
            .find({ buyer: req.user._id })
            // whole info of products except image
            .populate("products", "-photo")
            // only name of buyer
            .populate("buyer", "name");
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error WHile Geting Orders",
            error,
        });
    }
};
//all orders from admin
export const getAllOrdersController = async (req, res) => {
    try {
        const orders = await orderModel
            // all orders
            .find({})
            .populate("products", "-photo")
            .populate("buyer", "name")
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error While Getting Orders",
            error,
        });
    }
};

//order status change 
export const orderStatusController = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const orders = await orderModel.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error While Updateing Order",
            error,
        });
    }
};