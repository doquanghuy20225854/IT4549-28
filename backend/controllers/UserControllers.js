import User from "../models/UserModel.js";

export const getListUser = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            message: "Lấy danh sách người dùng thành công",
            users: users
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

export const addUser = async (req, res) => {
    try {
        const { name, role, phone } = req.body;
        const newUser = new User({ name, role, phone });
        await newUser.save();
        res.status(201).json({
            message: "Thêm người dùng thành công",
            user: newUser
        }); 
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, role, phone } = req.body;
        const updatedUser = await User.findByIdAndUpdate(id, { name, role, phone }, { new: true });
        res.status(200).json({
            message: "Cập nhật người dùng thành công",
            user: updatedUser
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
} 

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.status(200).json({
            message: "Xóa người dùng thành công",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}   