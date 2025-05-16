import mongoose from "mongoose";

const exerciseData = new mongoose.Schema({
    exercise: {
        type: String,
        required: true
    },
    sets: {
        type: Number,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
})

const dataSchema = new mongoose.Schema({
    exercises: [exerciseData],
    day: {
        type: String,
    },
    date: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

const DATA = mongoose.model("data", dataSchema)

export default DATA