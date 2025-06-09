import MediaRecord from "../models/MediaRecordModel.js";

export const getListMediaRecord = async (req, res) => {
    try {
        const mediaRecords = await MediaRecord.find();
        res.status(200).json(mediaRecords);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

export const addMediaRecord = async (req, res) => {
    try {
        const { pet, owner, createDate, diagnosis, status } = req.body;
        const newMediaRecord = new MediaRecord({ pet, owner, createDate, diagnosis, status });
        await newMediaRecord.save();
        res.status(201).json(newMediaRecord);
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

export const deleteMediaRecord = async (req, res) => {
    try {
        const { id } = req.params;
        await MediaRecord.findByIdAndDelete(id);
        res.status(200).json({
            message: "Media Record deleted successfully"
        });
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}