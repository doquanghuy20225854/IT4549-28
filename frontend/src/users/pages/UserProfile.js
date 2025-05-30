import React, { useState } from "react";
import "../styles/UserProfile.css";

const UserProfile = () => {
  const [user, setUser] = useState({
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "0123 456 789",
    address: "123 Đường ABC, Quận 1, TP.HCM",
    avatar: "https://i.pravatar.cc/150",
    pets: [
      {
        id: 1,
        name: "Milo",
        species: "Chó",
        breed: "Poodle",
        age: 2,
        avatar: "https://placedog.net/150/150?id=1",
      },
      {
        id: 2,
        name: "Luna",
        species: "Mèo",
        breed: "Munchkin",
        age: 1,
        avatar: "https://placekitten.com/150/150",
      },
    ],
  });

  const [editMode, setEditMode] = useState(false);
  const [tempUser, setTempUser] = useState(user);

  const handleOpenEdit = () => {
    setTempUser(user);
    setEditMode(true);
  };

  const handleCloseEdit = () => {
    setEditMode(false);
  };

  const handleSave = () => {
    setUser(tempUser);
    setEditMode(false);
  };

  const handleTempChange = (e) => {
    const { name, value } = e.target;
    setTempUser((prev) => ({ ...prev, [name]: value }));
  };

  const handlePetChange = (index, field, value) => {
    const updatedPets = [...tempUser.pets];
    updatedPets[index][field] = value;
    setTempUser((prev) => ({ ...prev, pets: updatedPets }));
  };

  const handleAddPet = () => {
    const newPet = {
      id: Date.now(),
      name: "",
      species: "",
      breed: "",
      age: "",
      avatar: "https://via.placeholder.com/150",
    };
    setTempUser((prev) => ({ ...prev, pets: [...prev.pets, newPet] }));
  };

  const handleRemovePet = (id) => {
    const updatedPets = tempUser.pets.filter((pet) => pet.id !== id);
    setTempUser((prev) => ({ ...prev, pets: updatedPets }));
  };

  return (
    <div className="user-profile-container">
      <h2>Hồ sơ của tôi</h2>
      <div className="user-profile-card">
        <img src={user.avatar} alt="Avatar" className="profile-avatar" />
        <div className="profile-info">
          <p><strong>Họ tên:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Số điện thoại:</strong> {user.phone}</p>
          <p><strong>Địa chỉ:</strong> {user.address}</p>
        </div>
      </div>

      <div className="user-pets-section">
        <h3>Thú cưng của bạn</h3>
        <div className="user-pets-list">
          {user.pets.map((pet) => (
            <div key={pet.id} className="pet-card">
              <img src={pet.avatar} alt={pet.name} className="pet-avatar" />
              <div className="pet-info">
                <p><strong>Tên:</strong> {pet.name}</p>
                <p><strong>Loài:</strong> {pet.species}</p>
                <p><strong>Giống:</strong> {pet.breed}</p>
                <p><strong>Tuổi:</strong> {pet.age} tuổi</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="edit-profile-btn" onClick={handleOpenEdit}>
        ✏️ Chỉnh sửa hồ sơ
      </button>

      {editMode && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Chỉnh sửa hồ sơ</h3>

            <div className="modal-section">
              <h4>Thông tin cá nhân</h4>
              <input name="name" value={tempUser.name} onChange={handleTempChange} placeholder="Họ tên" />
              <input name="email" value={tempUser.email} onChange={handleTempChange} placeholder="Email" />
              <input name="phone" value={tempUser.phone} onChange={handleTempChange} placeholder="Số điện thoại" />
              <input name="address" value={tempUser.address} onChange={handleTempChange} placeholder="Địa chỉ" />
            </div>

            <div className="modal-section">
              <h4>Danh sách thú cưng</h4>
              <button onClick={handleAddPet}>➕ Thêm thú cưng</button>
              {tempUser.pets.map((pet, index) => (
                <div key={pet.id} className="edit-pet-card">
                  <input
                    value={pet.name}
                    placeholder="Tên"
                    onChange={(e) => handlePetChange(index, "name", e.target.value)}
                  />
                  <input
                    value={pet.species}
                    placeholder="Loài"
                    onChange={(e) => handlePetChange(index, "species", e.target.value)}
                  />
                  <input
                    value={pet.breed}
                    placeholder="Giống"
                    onChange={(e) => handlePetChange(index, "breed", e.target.value)}
                  />
                  <input
                    type="number"
                    value={pet.age}
                    placeholder="Tuổi"
                    onChange={(e) => handlePetChange(index, "age", e.target.value)}
                  />
                  <button onClick={() => handleRemovePet(pet.id)} style={{ color: "red" }}>❌</button>
                </div>
              ))}
            </div>

            <div className="modal-actions">
              <button onClick={handleSave}>💾 Lưu</button>
              <button onClick={handleCloseEdit}>❌ Huỷ</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
