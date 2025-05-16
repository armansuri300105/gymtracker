import jwt from "jsonwebtoken"

export const setuser = (user) => {
    const payload = {
        _id: user._id,
        email: user.email
    }
    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' })
}

export const getuser = (token) => {
    try {
        if (!token) return null;
        return jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
        console.error({error: "invalid token"});
    }
}