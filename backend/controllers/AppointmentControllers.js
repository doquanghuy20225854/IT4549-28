import Appointment from '../models/AppointmentModel.js';
import Customer from '../models/CustomerModel.js';

export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json({ success: true, data: appointments });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const addAppointment = async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(201).json({ success: true, data: appointment });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const addDoctorAppointment = async (req, res) => {
  try {
    const appointmentData = {
      ...req.body,
      status: 'Chờ xử lý',
      assignedTo: 'doctor' // Đánh dấu lịch hẹn này thuộc về bác sĩ
    };
    const appointment = new Appointment(appointmentData);
    await appointment.save();
    res.status(201).json({ success: true, data: appointment });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const addStaffAppointment = async (req, res) => {
  try {
    // Lấy thông tin khách hàng từ req.body
    const { ownerName, phone, address } = req.body;

    // Kiểm tra khách hàng đã tồn tại chưa (theo số điện thoại)
    let customer = await Customer.findOne({ phone });
    if (!customer) {
      // Nếu chưa có, tạo mới
      customer = new Customer({
        name: ownerName,
        phone,
        address: address || ""
      });
      await customer.save();
    }

    // Tiếp tục lưu lịch hẹn như cũ
    const appointmentData = {
      ...req.body,
      status: 'Chờ xử lý',
      assignedTo: 'staff' // Đánh dấu lịch hẹn này thuộc về nhân viên
    };
    const appointment = new Appointment(appointmentData);
    await appointment.save();
    res.status(201).json({ success: true, data: appointment });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateAppointment = async (req, res) => {
  try {
    const updated = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteAppointment = async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getCustomerAppointments = async (req, res) => {
  try {
    // Lấy id khách hàng
    const customerId = req.params.id;
    // Lấy thông tin khách hàng
    const customer = await Customer.findById(customerId);
    if (!customer) return res.status(404).json({ success: false, error: 'Không tìm thấy khách hàng' });
    // Tìm các lịch hẹn có ownerName hoặc phone trùng với khách hàng
    const appointments = await Appointment.find({
      ownerName: customer.name,
      // Nếu muốn chắc chắn hơn, có thể thêm điều kiện phone nếu lưu phone trong appointment
    });
    res.json({ success: true, data: appointments });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Lấy lịch hẹn của staff
export const getStaffAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ assignedTo: 'staff' });
    res.json({ success: true, data: appointments });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Lấy lịch hẹn của doctor
export const getDoctorAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ assignedTo: 'doctor', serviceType: 'vet' });
    res.json({ success: true, data: appointments });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}; 