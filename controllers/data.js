import mongoose from "mongoose";
import DATA from "../models/data.js"

export const data = async (req,res) => {
    try {
        const {exercises, email, date} = req.body;
        const userData = await DATA.findOne({email, date});
        if (!userData){
            const data = await DATA.create({
                exercises,
                date,
                email
            })
            res.status(201).json({ success: true, data });
        } else {
            userData.exercises.push(exercises[0]);
            await userData.save();
            res.status(201).json({ success: true, userData });
        }
    } catch (error) {
        console.log("Error while storing data: ",error);
    }
}

export const getData = async (req,res) => {
    const {email, sendDate} = req.body;
    try {
        const data = await DATA.findOne({email, date: sendDate});
        if (!data) res.send({message: "Data not available"})
        else{
            const sendData = data;
            res.send({message: "data retrieved", sendData})
        }
    } catch (error) {
        console.log("Error whiile geting the data: ", error);
    }
}

export const deleteData = async (req, res) => {
    const {id1, id2} = req.query;
    try {
        const resData = await DATA.findOne({_id: id1})
        const exercises = resData.exercises;
        const removeId = new mongoose.Types.ObjectId(id2);
        const updatedData = exercises.filter(data => !data._id.equals(removeId));
        await DATA.updateOne({ _id: id1 }, { $set: { exercises: updatedData } })
        res.json({message: "Data delete successfully"});
    } catch (error) {
        console.log("Error whiile deleting the data: ", error);
    }
}

export const editData = async (req,res) => {
    const {id1, id2, item} = req.body;
    try {
        const data = await DATA.findOne({_id: id1});
        if (!data){
            res.status(404).json({message: "Data not found!"});
        }
        const itemKey = new mongoose.Types.ObjectId(id2);
        for (let i=0;i<data?.exercises.length;i++){
            if(data.exercises[i]._id.equals(itemKey)){
                data.exercises[i].exercise = item.exercise
                data.exercises[i].sets = item.sets
                data.exercises[i].reps = item.reps
            }
            break
        }
        await data.save();
        res.json({message: "data updated successfully"});
    } catch (error) {
        console.log("Error while updating the data: ", error)
    }
}