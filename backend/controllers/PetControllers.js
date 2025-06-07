import Pet from '../models/PetModel.js';
import mongoose from 'mongoose';

// Thêm thú nuôi mới
export const addPet = async (req, res) => {
    try {
        const { name, age, species, description, ownerName, checkIn, checkOut } = req.body;

        console.log('Received pet data:', req.body); // Debug log

        // Validate required fields
        if (!name || !species || !ownerName) {
            return res.status(400).json({
                success: false,
                error: 'Tên, loài và tên chủ sở hữu là bắt buộc'
            });
        }

        // Validate age
        const petAge = parseInt(age) || 0;
        if (petAge < 0) {
            return res.status(400).json({
                success: false,
                error: 'Tuổi không được âm'
            });
        }
        
        const newPet = new Pet({
            name: name.trim(),
            age: petAge,
            species: species.trim(),
            description: description ? description.trim() : '',
            ownerName: ownerName.trim(),
            checkIn,
            checkOut
        });

        const savedPet = await newPet.save();
        console.log('Saved pet:', savedPet); // Debug log

        res.status(201).json({
            success: true,
            data: savedPet
        });
    } catch (error) {
        console.error('Error adding pet:', error);
        
        // Handle specific MongoDB errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                error: Object.values(error.errors).map(err => err.message).join(', ')
            });
        }

        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                error: 'Thú cưng này đã tồn tại'
            });
        }

        res.status(500).json({
            success: false,
            error: error.message || 'Có lỗi xảy ra khi thêm thú nuôi'
        });
    }
};

// Xóa thú nuôi
export const deletePet = async (req, res) => {
    try {
        const pet = await Pet.findByIdAndDelete(req.params.id);
        
        if (!pet) {
            return res.status(404).json({
                success: false,
                error: 'Không tìm thấy thú nuôi'
            });
        }

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Lấy danh sách thú nuôi
export const getAllPets = async (req, res) => {
    try {
        const pets = await Pet.find();
        res.status(200).json({
            success: true,
            count: pets.length,
            data: pets
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Lấy thông tin một thú nuôi cụ thể
export const getPetById = async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.id);
        
        if (!pet) {
            return res.status(404).json({
                success: false,
                error: 'Không tìm thấy thú nuôi'
            });
        }

        res.status(200).json({
            success: true,
            data: pet
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};
