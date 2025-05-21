import React from "react";
import "./BoardingDetailModal.css";

const BoardingDetailModal = ({ pet, onClose }) => {
  if (!pet) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Chi tiết thú cưng lưu trú</h3>

        <div className="modal-row">
          <strong>Tên:</strong> <span>{pet.name}</span>
        </div>
        <div className="modal-row">
          <strong>Loài:</strong> <span>{pet.species}</span>
        </div>
        <div className="modal-row">
          <strong>Chủ nuôi:</strong> <span>{pet.owner}</span>
        </div>
        <div className="modal-row">
          <strong>Ngày nhận:</strong> <span>{pet.checkIn}</span>
        </div>
        <div className="modal-row">
          <strong>Ngày trả:</strong> <span>{pet.checkOut}</span>
        </div>

        <div style={{ marginTop: "15px", textAlign: "right" }}>
          <button onClick={onClose}>Đóng</button>
        </div>
      </div>
    </div>
  );
};

export default BoardingDetailModal;
