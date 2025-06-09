import { Router } from "express";
import { getListMediaRecord, addMediaRecord, deleteMediaRecord } from "../controllers/MediaRecordControllers.js";

const mediaRecordRoutes = Router();

mediaRecordRoutes.get("/list-media-record", getListMediaRecord);
mediaRecordRoutes.post("/add-media-record", addMediaRecord);
mediaRecordRoutes.delete("/delete-media-record/:id", deleteMediaRecord);

export default mediaRecordRoutes;