import React, { useState } from "react";
import "../../styles/Boarding.css";
import "../detaimodal/BoardingDetailModal.css";
import Header from "../../components/Header";
import "../../styles/Header.css";
import BoardingDetailModal from "../detaimodal/BoardingDetailModal";    

const dummyData = [
  { id: 1, name: "Mèo Tom", species: "Mèo", owner: "Nguyễn Văn A", checkIn: "2025-05-18", checkOut: "2025-05-20" },
  { id: 2, name: "Chó Rex", species: "Chó", owner: "Trần Thị B", checkIn: "2025-05-19", checkOut: "2025-05-21" },
  { id: 3, name: "Mèo Mun", species: "Mèo", owner: "Lê Văn C", checkIn: "2025-05-20", checkOut: "2025-05-22" },
  { id: 4, name: "Mèo Miu", species: "Mèo", owner: "Nguyễn Văn D", checkIn: "2025-05-21", checkOut: "2025-05-23" },
  { id: 5, name: "Chó Sữa", species: "Chó", owner: "Trần Thị E", checkIn: "2025-05-22", checkOut: "2025-05-24" },
  { id: 6, name: "Mèo Nâu", species: "Mèo", owner: "Lê Văn F", checkIn: "2025-05-23", checkOut: "2025-05-25" },
  { id: 7, name: "Mèo Hoàng", species: "Mèo", owner: "Nguyễn Văn G", checkIn: "2025-05-24", checkOut: "2025-05-26" },
  { id: 8, name: "Chó Xe", species: "Chó", owner: "Trần Thị H", checkIn: "2025-05-25", checkOut: "2025-05-27" },
  { id: 9, name: "Mèo Xanh", species: "Mèo", owner: "Lê Văn I", checkIn: "2025-05-26", checkOut: "2025-05-28" },
  { id: 10, name: "Mèo Vàng", species: "Mèo", owner: "Nguyễn Văn J", checkIn: "2025-05-27", checkOut: "2025-05-29" },
  { id: 11, name: "Chó Trắng", species: "Chó", owner: "Trần Thị K", checkIn: "2025-05-28", checkOut: "2025-05-30" },
  { id: 12, name: "Mèo Trắng", species: "Mèo", owner: "Lê Văn L", checkIn: "2025-05-29", checkOut: "2025-05-31" },
];

const Boarding = () => {
  const [pets, setPets] = useState(dummyData);
  const [search, setSearch] = useState("");
  const [selectedPet, setSelectedPet] = useState(null);
  const filteredPets = pets.filter(pet =>
    pet.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    const confirmed = window.confirm("Bạn có chắc muốn xoá?");
    if (confirmed) {
      setPets(pets.filter(pet => pet.id !== id));
    }
  };

  const handleAdd = () => {
    const newPet = {
      id: Date.now(),
      name: prompt("Tên thú cưng:") || "Chưa đặt tên",
      species: prompt("Loài (Chó/Mèo):") || "Không rõ",
      owner: prompt("Chủ nuôi:") || "Không rõ",
      checkIn: prompt("Ngày nhận (YYYY-MM-DD):") || new Date().toISOString().split("T")[0],
      checkOut: prompt("Ngày trả (YYYY-MM-DD):") || new Date().toISOString().split("T")[0],
    };
    setPets([...pets, newPet]);
  };

  return (
    <div className="boarding-container">
      <Header />
      <h2>Danh sách thú cưng đang lưu trú</h2>

      <div className="boarding-actions">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleAdd}><i className="fa fa-plus"></i> Thêm mới</button>
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
              <td>
                <button className="btn-view" onClick={() => setSelectedPet(pet)}><i className="fa fa-eye"></i></button>
                <button className="btn-delete" onClick={() => handleDelete(pet.id)}><i className="fa fa-trash"></i></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedPet && (
        <BoardingDetailModal pet={selectedPet} onClose={() => setSelectedPet(null)} />
      )}
    </div>
  );
};

export default Boarding;
