import React from "react";
import "../styles/PetStatus.css";

const allPets = [
  {
    id: 1,
    ownerId: 1,
    name: "Milo",
    species: "Chó",
    age: 2,
    healthStatus: "Khỏe mạnh",
    appointments: [
      { date: "2023-06-01", service: "Spa", note: "Massage nhẹ nhàng" },
      { date: "2023-06-15", service: "Khám sức khỏe", note: "Tái khám" },
    ],
  },
  {
    id: 2,
    ownerId: 2,
    name: "Luna",
    species: "Mèo",
    age: 3,
    healthStatus: "Đang điều trị",
    appointments: [
      { date: "2023-06-02", service: "Khám bệnh", note: "Bị ho" },
    ],
  },
  {
    id: 3,
    ownerId: 1,
    name: "Tom",
    species: "Mèo",
    age: 1,
    healthStatus: "Cần theo dõi",
    appointments: [
      { date: "2023-06-03", service: "Tắm tại nhà", note: "Không thích nước lạnh" },
    ],
  },
];

// Giả lập user đang đăng nhập
const currentUserId = 1;

const PetStatus = () => {
  const myPets = allPets.filter((pet) => pet.ownerId === currentUserId);

  return (
    <div className="blog-container">
      <div className="blog-content">
        <h1 className="blog-title">Tình Trạng Thú Cưng Của Tôi</h1>

        {myPets.map((pet) => (
          <div className="blog-post" key={pet.id}>
            <h2>{pet.name} - {pet.species}</h2>
            <p><strong>Tuổi:</strong> {pet.age}</p>
            <p><strong>Tình trạng sức khoẻ:</strong> {pet.healthStatus}</p>
            <h4>Lịch sử dịch vụ:</h4>
            <ul>
              {pet.appointments.map((a, index) => (
                <li key={index}>
                  <strong>{a.date}</strong> - {a.service} ({a.note})
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PetStatus;
