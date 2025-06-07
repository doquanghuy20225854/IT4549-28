import Pet from '../models/PetModel.js';

// Thêm thú nuôi mới
export const addPet = async (req, res) => {
    try {
        const { name, age, species, description, ownerId } = req.body;
        
        const newPet = new Pet({
            name,
            age,
            species,
            description,
            ownerId
        });

        const savedPet = await newPet.save();
        res.status(201).json({
            success: true,
            data: savedPet
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
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
