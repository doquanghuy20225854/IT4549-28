import React, { useState, useRef, useEffect } from "react";
import "../styles/DoctorBoarding.css";
import { apiClient } from "../../lib/api-client";
import { 
  GET_ALL_PETS_ROUTE,
  ADD_PET_ROUTE,
  UPDATE_PET_ROUTE,
  DELETE_PET_ROUTE 
} from "../../utils/constant";

const getStatus = (checkIn, checkOut) => {
  const today = new Date().toISOString().split("T")[0];
  if (today < checkIn) return "Chưa đến";
  if (today > checkOut) return "Đã trả";
  return "Đang lưu trú";
};

const DoctorBoarding = () => {
  const [pets, setPets] = useState([]);
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const nameRef = useRef();
  const speciesRef = useRef();
  const ownerRef = useRef();
  const checkInRef = useRef();
  const checkOutRef = useRef();

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Calling API:', GET_ALL_PETS_ROUTE);
      const response = await apiClient.get(GET_ALL_PETS_ROUTE, {withCredentials: true});
      console.log('API Response:', response.data);
      if (response.data.success) {
        setPets(response.data.data);
      } else {
        console.error('API Error:', response.data.error);
        setError("Không thể tải danh sách thú cưng");
      }
    } catch (error) {
      console.error("Error fetching pets:", error.response || error);
      setError("Có lỗi xảy ra khi tải danh sách thú cưng");
    } finally {
      setLoading(false);
    }
  };

  const filteredPets = pets.filter(pet =>
    pet.name.toLowerCase().includes(search.toLowerCase())
  );

  const openAddModal = () => {
    setShowAddModal(true);
  };

  const confirmDelete = (pet) => {
    setDeleteTarget(pet);
  };

  const handleDeleteConfirmed = async () => {
    if (deleteTarget) {
      try {
        setLoading(true);
        setError(null);
        const response = await apiClient.delete(`${DELETE_PET_ROUTE}/${deleteTarget._id}`, {withCredentials: true});
        if (response.data.success) {
          setPets(pets.filter(pet => pet._id !== deleteTarget._id));
          alert("Xóa thú cưng thành công!");
        } else {
          setError("Không thể xóa thú cưng");
        }
      } catch (error) {
        setError("Có lỗi xảy ra khi xóa thú cưng");
        console.error("Error deleting pet:", error);
      } finally {
        setLoading(false);
        setDeleteTarget(null);
      }
    }
  };

  const handleAddConfirmed = async () => {
    try {
      if (!nameRef.current.value || !speciesRef.current.value || !ownerRef.current.value) {
        alert("Vui lòng điền đầy đủ thông tin bắt buộc (Tên, Loài, Chủ nuôi)");
        return;
      }

      setLoading(true);
      setError(null);

      const newPet = {
        name: nameRef.current.value,
        species: speciesRef.current.value,
        ownerName: ownerRef.current.value,
        checkIn: checkInRef.current.value || new Date().toISOString().split("T")[0],
        checkOut: checkOutRef.current.value || new Date().toISOString().split("T")[0],
        age: 0,
        description: ""
      };

      const response = await apiClient.post(ADD_PET_ROUTE, newPet, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        await fetchPets();
        setShowAddModal(false);
        alert("Thêm thú cưng thành công!");
      } else {
        setError("Không thể thêm thú cưng");
      }
    } catch (error) {
      setError("Có lỗi xảy ra khi thêm thú cưng");
      console.error("Error adding pet:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (id) => {
    const petToEdit = pets.find(pet => pet._id === id);
    if (!petToEdit) return;

    try {
      // const updatedPet = {
      //   ...petToEdit,
      //   name: prompt("Tên thú cưng:", petToEdit.name) || petToEdit.name,
      //   species: prompt("Loài (Chó/Mèo):", petToEdit.species) || petToEdit.species,
      //   ownerName: prompt("Chủ nuôi:", petToEdit.ownerName) || petToEdit.ownerName,
      //   checkIn: prompt("Ngày nhận (YYYY-MM-DD):", petToEdit.checkIn) || petToEdit.checkIn,
      //   checkOut: prompt("Ngày trả (YYYY-MM-DD):", petToEdit.checkOut) || petToEdit.checkOut,
      // };

      // setLoading(true);
      // setError(null);

      // const response = await apiClient.put(`${UPDATE_PET_ROUTE}/${id}`, updatedPet, {
      //   withCredentials: true,
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // });

      // if (response.data.success) {
      //   setPets(pets.map(pet => pet._id === id ? response.data.data : pet));
      //   alert("Cập nhật thông tin thành công!");
      // } else {
      //   setError("Không thể cập nhật thông tin thú cưng");
      // }
    } catch (error) {
      setError("Có lỗi xảy ra khi cập nhật thông tin thú cưng");
      console.error("Error updating pet:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Đang tải...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

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

export default DoctorBoarding;
