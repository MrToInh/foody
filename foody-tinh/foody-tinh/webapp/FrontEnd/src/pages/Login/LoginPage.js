import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import "./loginPage.css";
import logo from "../../../src/img/logo.png"; // Import the image

import AuthService from "../../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">This field is required!</div>
    );
  }
};

const Login = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password).then(
        () => {
          navigate("/profile");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  // Xử lý đăng nhập bằng Facebook
  const handleFacebookLogin = () => {
    // Code xử lý đăng nhập bằng Facebook ở đây
    console.log("Đăng nhập bằng Facebook");
  };

  // Xử lý đăng nhập bằng Google
  const handleGoogleLogin = () => {
    // Code xử lý đăng nhập bằng Google ở đây
    console.log("Đăng nhập bằng Google");
  };

  return (
    <div className="col-md-12">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleLogin} ref={form}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <Input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={onChangeUsername}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>
{/* FACEBOOK AND GOOGLE  */}
          <div className="form-group social-login-container">
            <button className="btn btn-facebook" onClick={handleFacebookLogin}>
              <i className="fab fa-facebook-f"></i> Facebook
            </button>
            <button className="btn btn-google" onClick={handleGoogleLogin}>
              <i className="fab fa-google"></i> Google
            </button>
          </div>

          <Form onSubmit={handleLogin} ref={form}>
            {/* các trường và nút submit ở đây */}

            {/* Dòng chữ bạn chưa có tài khoản? Đăng ký */}
            <p className="register-link">
              Bạn chưa có tài khoản? <a href="/register">Đăng ký</a>
            </p>
          </Form>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Login;
