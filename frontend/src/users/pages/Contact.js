import React, { useState } from "react";
import "../styles/Contact.css";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (name && email && message) {
      setSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
    }
  };

  return (
    <div className="contact-page">
      <h2>LIÊN HỆ</h2>

      <div className="contact-container">
        <div className="contact-info">
          <h3>Thông Tin Liên Hệ</h3>
          <p><strong>Địa chỉ:</strong> số 1, P. HBT, Hà Nội</p>
          <p><strong>Số điện thoại:</strong> 0897 654 321</p>
          <p><strong>Email:</strong> petservice@gmail.com</p>
        </div>

        <div className="contact-form">
          <h3>Gửi Tin Nhắn</h3>
          {submitted ? (
            <p className="success-message">Tin nhắn của bạn đã được gửi!</p>
          ) : (
            <>
              <div className="form-group">
                <label>Họ và Tên</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nhập họ và tên"
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Nhập email"
                />
              </div>
              <div className="form-group">
                <label>Tin Nhắn</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Nhập tin nhắn của bạn"
                />
              </div>
              <button onClick={handleSubmit} disabled={!name || !email || !message}>
                Gửi
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;