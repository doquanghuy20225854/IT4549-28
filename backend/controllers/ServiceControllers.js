import Service from "../models/ServiceModel.js";

export const getListService = async (req, res) => {
    try {
        const services = await Service.find();
        res.status(200).json({
            message: "Lấy danh sách dịch vụ thành công",
            services: services
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

export const addService = async (req, res) => {
    try {
        const { name, staff, date, note } = req.body;
        const newService = new Service({ name, staff, date, note });
        await newService.save();
        res.status(201).json({
            message: "Thêm dịch vụ thành công",
            service: newService
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

export const updateService = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, staff, date, note } = req.body;
        const updatedService = await Service.findByIdAndUpdate(id, { name, staff, date, note }, { new: true });
        res.status(200).json({
            message: "Cập nhật dịch vụ thành công",
            service: updatedService
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

export const deleteService = async (req, res) => {
    try {
        const { id } = req.params;
        await Service.findByIdAndDelete(id);
        res.status(200).json({
            message: "Xóa dịch vụ thành công",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}