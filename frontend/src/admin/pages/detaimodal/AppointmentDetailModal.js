import React from "react";
import "./AppointmentDetailModal.css"; // Đảm bảo file này tồn tại

const AppointmentDetailModal = ({ appointment, onChange, onUpdate, onClose }) => {
  if (!appointment) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Chi tiết lịch hẹn</h3>
        
        {/* Ghi lại tên thú cưng */}
        <label>
          Thú cưng:
          <input
            value={appointment.petName}
            onChange={(e) => onChange({ ...appointment, petName: e.target.value })}
          />
        </label>

        <label>
          Chủ nuôi:
          <input
            value={appointment.ownerName}
            onChange={(e) => onChange({ ...appointment, ownerName: e.target.value })}
          />
        </label>

        <label>
          Thời gian:
          <input
            type="datetime-local"
            value={appointment.time}
            onChange={(e) => onChange({ ...appointment, time: e.target.value })}
          />
        </label>

        <label>
          Lý do:
          <input
            value={appointment.reason}
            onChange={(e) => onChange({ ...appointment, reason: e.target.value })}
          />
        </label>

        <div className="modal-actions">
          <button onClick={onUpdate}>Cập nhật</button>
          <button onClick={onClose}>Đóng</button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetailModal;
