import mongoose from "mongoose";
import { createHmac, randomBytes } from "crypto";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: Number,
        required: true,
        unique: true
    },
    salt: {
        type: String,
        required: true,
        default: "1245"
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: "./public/profile.jpg"
    }
})

userSchema.pre("save", function(next){
    const user = this;

    if (!user.isModified("password")) return

    const saltKey = randomBytes(16).toString("hex");
    const hashedPass = createHmac("sha256", saltKey)
                        .update(user.password)
                        .digest("hex");

    user.salt = saltKey;
    user.password = hashedPass;

    next();
})

const USER = mongoose.model("user", userSchema)
export default USER