import React, { useState, useRef, useEffect } from "react";
import "../styles/Boarding.css";
import { apiClient } from "../../lib/api-client";
import { ADD_PET_ROUTE } from "../../utils/constant";

const GET_ALL_PETS_ROUTE = '/api/pets/get-all-pets';

const getStatus = (checkIn, checkOut) => {
  const today = new Date().toISOString().split("T")[0];
  if (today < checkIn) return "Chưa đến";
  if (today > checkOut) return "Đã trả";
  return "Đang lưu trú";
};

const Boarding = () => {
  const [pets, setPets] = useState([]);
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const nameRef = useRef();
  const speciesRef = useRef();
  const ownerRef = useRef();
  const checkInRef = useRef();
  const checkOutRef = useRef();

  // Lấy danh sách thú cưng từ backend khi load trang
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await apiClient.get(GET_ALL_PETS_ROUTE);
        if (response.data && response.data.data) {
          setPets(response.data.data);
        }
      } catch (error) {
        console.error('Lỗi khi lấy danh sách thú cưng:', error);
      }
    };
    fetchPets();
  }, []);

  const filteredPets = pets.filter(pet =>
    pet.name.toLowerCase().includes(search.toLowerCase())
  );

  const openAddModal = () => {
    setShowAddModal(true);
  };

  const confirmDelete = (pet) => {
    setDeleteTarget(pet);
  };

  const handleDeleteConfirmed = () => {
    if (deleteTarget) {
      setPets(pets.filter(pet => pet._id !== deleteTarget._id));
      setDeleteTarget(null);
    }
  };

  const handleAddConfirmed = async () => {
    try {
        if (!nameRef.current.value || !speciesRef.current.value || !ownerRef.current.value) {
            alert('Vui lòng điền đầy đủ thông tin bắt buộc (Tên, Loài, Chủ sở hữu)');
            return;
        }
    const newPet = {
            name: nameRef.current.value,
            species: speciesRef.current.value,
            ownerName: ownerRef.current.value,
            age: 0,
            description: "",
            checkIn: checkInRef.current.value,
            checkOut: checkOutRef.current.value
        };
        const response = await apiClient.post(ADD_PET_ROUTE, newPet, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.data.success) {
            // Sau khi thêm mới, lấy lại danh sách thú cưng từ backend
            const petsRes = await apiClient.get(GET_ALL_PETS_ROUTE);
            setPets(petsRes.data.data);
    setShowAddModal(false);
            alert('Thêm thú cưng thành công!');
        } else {
            throw new Error(response.data.error || 'Có lỗi xảy ra khi thêm thú cưng');
        }
    } catch (error) {
        console.error('Error adding pet:', error);
        const errorMessage = error.response?.data?.error || error.message || 'Có lỗi xảy ra khi thêm thú cưng';
        alert(`Lỗi: ${errorMessage}`);
    }
  };

  const handleEdit = (id) => {
    const petToEdit = pets.find(pet => pet._id === id);
    if (!petToEdit) return;
    const updatedPet = {
      ...petToEdit,
      name: prompt("Tên thú cưng:", petToEdit.name) || petToEdit.name,
      species: prompt("Loài (Chó/Mèo):", petToEdit.species) || petToEdit.species,
      ownerName: prompt("Chủ nuôi:", petToEdit.ownerName) || petToEdit.ownerName,
      checkIn: prompt("Ngày nhận (YYYY-MM-DD):", petToEdit.checkIn) || petToEdit.checkIn,
      checkOut: prompt("Ngày trả (YYYY-MM-DD):", petToEdit.checkOut) || petToEdit.checkOut,
    };
    setPets(pets.map(pet => pet._id === id ? updatedPet : pet));
  };

  return (
    <div className="boarding-container">
      <h2>Danh sách thú cưng đang lưu trú</h2>
      <div className="boarding-actions">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={openAddModal}>
          <i className="fa fa-plus"></i> Thêm mới
        </button>
      </div>
      <table className="boarding-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên</th>
            <th>Loài</th>
            <th>Chủ nuôi</th>
            <th>Ngày nhận</th>
            <th>Ngày trả</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredPets.map((pet, index) => (
            <tr key={pet._id}>
              <td>{index + 1}</td>
              <td>{pet.name}</td>
              <td>{pet.species}</td>
              <td>{pet.ownerName}</td>
              <td>{pet.checkIn}</td>
              <td>{pet.checkOut}</td>
              <td>{getStatus(pet.checkIn, pet.checkOut)}</td>
              <td>
                <button className="btn-edit" onClick={() => handleEdit(pet._id)}>
                  <i className="fa fa-pencil"></i>
                </button>
                <button className="btn-delete" onClick={() => confirmDelete(pet)}>
                  <i className="fa fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Modal thêm mới */}
      {showAddModal && (
        <div className="pet-modal">
          <div className="pet-modal-content">
            <h3>Thêm thú cưng mới</h3>
            <table>
              <tbody>
                <tr><td>Tên:</td><td><input type="text" ref={nameRef} /></td></tr>
                <tr><td>Loài:</td><td><input type="text" ref={speciesRef} /></td></tr>
                <tr><td>Chủ nuôi:</td><td><input type="text" ref={ownerRef} /></td></tr>
                <tr><td>Ngày nhận:</td><td><input type="date" ref={checkInRef} /></td></tr>
                <tr><td>Ngày trả:</td><td><input type="date" ref={checkOutRef} /></td></tr>
              </tbody>
            </table>
            <button onClick={handleAddConfirmed}>Xác nhận</button>
            <button onClick={() => setShowAddModal(false)}>Huỷ</button>
          </div>
        </div>
      )}
      {/* Modal xác nhận xoá */}
      {deleteTarget && (
        <div className="pet-modal">
          <div className="pet-modal-content">
            <h3>Xoá thú cưng</h3>
            <p>Bạn có chắc muốn xoá <strong>{deleteTarget.name}</strong> của <strong>{deleteTarget.ownerName}</strong> không?</p>
            <button onClick={handleDeleteConfirmed}>Xoá</button>
            <button onClick={() => setDeleteTarget(null)}>Huỷ</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Boarding;
