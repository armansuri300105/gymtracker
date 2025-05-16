import USER from "../models/user.js"
import { createHmac } from "crypto";
import { getuser, setuser } from "../services/auth.js";

export const test = (req,res) => {
    res.send("Hello World!");
}

export const login = async (req,res) => {
    const { email, password } = req.body;
    try {
        const user = await USER.findOne({email});
        if (!user){
            return res.json({message: "user not found"});
        } else {
            const hashedPass = createHmac("sha256", user.salt)
                                .update(password)
                                .digest("hex");
            if (user.password === hashedPass){
                const token = setuser(user);
                return res.json({message: "User login successfully", token})
            } else {
                return res.json({message: "incorrect Password!"})
            }
        }
    } catch (error) {
        res.status(500).json("internal server error while login");
    }
}
export const signup = async (req,res) => {
    try {
        const {name, email, mobile, password} = req.body;
        const check1 = await USER.findOne({email});
        const check2 = await USER.findOne({mobile});
        if (check1){
            return res.json({message: "Email already registered on the server"})
        }
        if (check2){
            return res.json({message: "Number already registered on the server"})
        }
        const user = await USER.create({
            name,
            email,
            mobile,
            password
        })
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error while registering new user" });
    }
}

export const verify = (req,res) => {
    const {token} = req.body
    try {
        const user = getuser(token)
        if (!user) return res.json({message: "incorrect token received"})
        else return res.json({message: "token verified successfully"})
    } catch (error) {
        console.error("Error in token verification:", error);
        res.status(500).json({message: "Internal server error while autherization!"})
    }
}

export const userDetail = async (req,res) => {
    const {token} = req.body
    try {
        const user = getuser(token)
        if (!user) return res.json({message: "incorrect token received"})
        const email = user.email;
        const userDetail = await USER.findOne({email});
        if (!userDetail){
            return res.json({message: "user not found"})
        }
        const detail = {
            name: userDetail.name,
            email: userDetail.email,
            image: userDetail.image,
            mobile: userDetail.mobile
        }
        return res.json({message: "User detail", user: detail});
    } catch (error) {
        console.error("Error in token verification:", error);
        res.status(500).json({message: "Internal server error while autherization!"})
    }
}