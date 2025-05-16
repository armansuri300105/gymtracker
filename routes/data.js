import express from "express"
import { data, deleteData, editData, getData } from "../controllers/data.js";

const router = express.Router();

router.post("/store", data);
router.post("/get", getData)
router.delete('/delete', deleteData);
router.post('/edit', editData);

export default router