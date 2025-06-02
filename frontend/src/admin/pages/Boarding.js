import React, { useState, useRef } from "react";
import "../styles/Boarding.css";

const dummyData = [
  { id: 1, name: "Mèo Tom", species: "Mèo", owner: "Nguyễn Văn A", checkIn: "2025-05-18", checkOut: "2025-05-20" },
  { id: 2, name: "Chó Rex", species: "Chó", owner: "Trần Thị B", checkIn: "2025-05-19", checkOut: "2025-05-21" },
  { id: 3, name: "Mèo Mun", species: "Mèo", owner: "Lê Văn C", checkIn: "2025-05-20", checkOut: "2025-05-22" },
  { id: 4, name: "Mèo Miu", species: "Mèo", owner: "Nguyễn Văn D", checkIn: "2025-05-21", checkOut: "2025-05-23" },
  { id: 5, name: "Chó Sữa", species: "Chó", owner: "Trần Thị E", checkIn: "2025-05-22", checkOut: "2025-05-24" },
];

const getStatus = (checkIn, checkOut) => {
  const today = new Date().toISOString().split("T")[0];
  if (today < checkIn) return "Chưa đến";
  if (today > checkOut) return "Đã trả";
  return "Đang lưu trú";
};

const Boarding = () => {
  const [pets, setPets] = useState(dummyData);
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const nameRef = useRef();
  const speciesRef = useRef();
  const ownerRef = useRef();
  const checkInRef = useRef();
  const checkOutRef = useRef();

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
      setPets(pets.filter(pet => pet.id !== deleteTarget.id));
      setDeleteTarget(null);
    }
  };

  const handleAddConfirmed = () => {
    const newPet = {
      id: Date.now(),
      name: nameRef.current.value || "Chưa đặt tên",
      species: speciesRef.current.value || "Không rõ",
      owner: ownerRef.current.value || "Không rõ",
      checkIn: checkInRef.current.value || new Date().toISOString().split("T")[0],
      checkOut: checkOutRef.current.value || new Date().toISOString().split("T")[0],
    };
    setPets([...pets, newPet]);
    setShowAddModal(false);
  };

  const handleEdit = (id) => {
    const petToEdit = pets.find(pet => pet.id === id);
    if (!petToEdit) return;

    const updatedPet = {
      ...petToEdit,
      name: prompt("Tên thú cưng:", petToEdit.name) || petToEdit.name,
      species: prompt("Loài (Chó/Mèo):", petToEdit.species) || petToEdit.species,
      owner: prompt("Chủ nuôi:", petToEdit.owner) || petToEdit.owner,
      checkIn: prompt("Ngày nhận (YYYY-MM-DD):", petToEdit.checkIn) || petToEdit.checkIn,
      checkOut: prompt("Ngày trả (YYYY-MM-DD):", petToEdit.checkOut) || petToEdit.checkOut,
    };

    setPets(pets.map(pet => pet.id === id ? updatedPet : pet));
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
            <tr key={pet.id}>
              <td>{index + 1}</td>
              <td>{pet.name}</td>
              <td>{pet.species}</td>
              <td>{pet.owner}</td>
              <td>{pet.checkIn}</td>
              <td>{pet.checkOut}</td>
              <td>{getStatus(pet.checkIn, pet.checkOut)}</td>
              <td>
                <button className="btn-edit" onClick={() => handleEdit(pet.id)}>
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
            <p>Bạn có chắc muốn xoá <strong>{deleteTarget.name}</strong> của <strong>{deleteTarget.owner}</strong> không?</p>
            <button onClick={handleDeleteConfirmed}>Xoá</button>
            <button onClick={() => setDeleteTarget(null)}>Huỷ</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Boarding;
