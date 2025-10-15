import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // Basic validation
      if (!formData.name || !formData.email || !formData.password) {
        alert("Please fill in all fields");
        return;
      }
      
      if (formData.password.length < 6) {
        alert("Password must be at least 6 characters long");
        return;
      }

      console.log('Attempting registration with:', { 
        name: formData.name, 
        email: formData.email 
      }); // Debug log

      const response = await axios.post(`${API_URL}/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: 'user' // Default role for new registrations
      });

      console.log('Registration response:', response.data); // Debug log

      alert("Account created successfully! Please sign in.");
      setIsSignUpActive(false);
      
      // Clear sensitive data
      setFormData({
        name: "",
        email: "",
        password: ""
      });
    } catch (err) {
      console.error("Registration error details:", {
        response: err.response?.data,
        status: err.response?.status,
        message: err.message
      });

      let errorMsg;
      if (err.response?.status === 400) {
        errorMsg = err.response.data.message || "Invalid registration data";
      } else if (err.response?.status === 409) {
        errorMsg = "Email already registered";
      } else {
        errorMsg = "Registration failed. Please try again later.";
      }
      
      alert(errorMsg);
    }
  };

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    console.log('Attempting login with:', { email: formData.email }); // Debug log

    const response = await axios.post(`${API_URL}/login`, {
      email: formData.email,
      password: formData.password
    });

    const data = response.data;
    console.log('Login response:', data); // Debug log

    if (!data.id || !data.role) {
      throw new Error('Invalid response from server');
    }

    // Store user data
    localStorage.setItem("healthcareUser", JSON.stringify({
      id: data.id,
      name: data.name,
      role: data.role,
      token: data.token // if your backend sends a token
    }));

    // Navigate based on role
    if (data.role === 'admin') {
      navigate("/admin/dashboard");
    } else if (data.role === 'doctor') {
      navigate("/doctor/dashboard");
    } else {
      navigate("/dashboard"); // Regular user dashboard
    }

  } catch (err) {
    console.error("Login error details:", {
      response: err.response?.data,
      status: err.response?.status,
      message: err.message
    });
    
    let errorMsg;
    if (err.response?.status === 401) {
      errorMsg = "Invalid email or password";
    } else if (err.response?.status === 404) {
      errorMsg = "User not found";
    } else if (err.response?.data?.message) {
      errorMsg = err.response.data.message;
    } else {
      errorMsg = "Login failed. Please try again later.";
    }
    
    alert(errorMsg);
  }
};


  const skipLogin = () => {
    // Store minimal guest user data
    localStorage.setItem("healthcareUser", JSON.stringify({
      id: 'guest',
      name: 'Guest User',
      role: 'guest',
      token: null
    }));
    navigate("/dashboard");
  };

  return (
    <>
      <video autoPlay muted loop id="bgVideo">
        <source src="videoplayback (1).mp4" type="video/mp4" />
      </video>
      <div className="video-overlay" />

      <button
        onClick={skipLogin}
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          background: "#e23744",
          color: "#fff",
          border: "none",
          padding: "8px 16px",
          borderRadius: "20px",
          cursor: "pointer",
          zIndex: 10
        }}
      >
        Skip →
      </button>


      


      <div className={`container ${isSignUpActive ? "right-panel-active" : ""}`}>
        {/* Sign Up */}
        <div className="form-container sign-up-container">
          <form onSubmit={handleSignup}>
            <h1>Create Account</h1>
            <div className="social-container">
              <a href="https://www.facebook.com/" className="social"><i className="fab fa-facebook-f" /><img src="facebook.jpg" style={{height:"100%", borderRadius: "50%"}}></img></a>
              <a href="https://foodstack-1-mli9.onrender.com" className="social"><i className="fab fa-google-plus-g" /><img src="logo.jpg" style={{height:"100%", borderRadius: "50%"}}></img></a>
              <a href="https://www.linkedin.com/in/jashanpreet-singh-a54b8931b/" className="social"><i className="fab fa-linkedin-in" /><img src="linkdin.jpeg" style={{height:"100%", borderRadius: "80%"}}></img></a>
            </div>
            <span>or use your email for registration</span>
            <input name="name" placeholder="Name" onChange={handleChange} />
            <input name="email" placeholder="Email" onChange={handleChange} />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} />
            <button type="submit">Sign Up</button>
          </form>
        </div>

        {/* Sign In */}
        <div className="form-container sign-in-container">
          <form onSubmit={handleLogin}>
            <h1>Sign in</h1>
            <div className="social-container">
              <a href="https://www.facebook.com/" className="social"><i className="fab fa-facebook-f" /><img src="facebook.jpg" style={{height:"100%", borderRadius: "50%"}}></img></a>
              <a href="https://foodstack-1-mli9.onrender.com" className="social"><i className="fab fa-google-plus-g" /><img src="logo.jpg" style={{height:"100%", borderRadius: "50%"}}></img></a>
              <a href="https://www.linkedin.com/in/jashanpreet-singh-a54b8931b/" className="social"><i className="fab fa-linkedin-in" /><img src="linkdin.jpeg" style={{height:"100%", borderRadius: "80%"}}></img></a>
            </div>
            <span>or use your account</span>
            <input name="email" placeholder="Email" onChange={handleChange} />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} />
            <button type="submit">Sign In</button>
          </form>
        </div>

        {/* Overlay Panel */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button className="ghost" onClick={() => setIsSignUpActive(false)}>
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className="ghost" onClick={() => setIsSignUpActive(true)}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- INTERNAL CSS ---------- */}
      <style>{`
        @import url('https://fonts.googleapis.com/css?family=Montserrat:400,800');

        * { box-sizing: border-box; }

        body {
          font-family: 'Montserrat', sans-serif;
          background: #f6f5f7;
          margin: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          overflow: hidden;
        }

        h1 { font-weight: bold; margin: 0; }

        .container {
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 14px 28px rgba(0,0,0,0.2), 0 10px 10px rgba(0,0,0,0.2);
          position: relative;
          overflow: hidden;
          width: 768px;
          max-width: 100%;
          min-height: 480px;
          z-index: 5;
        }

        form {
          background-color: #ffffff;
          display: flex;
          flex-direction: column;
          padding: 0 50px;
          height: 100%;
          justify-content: center;
          align-items: center;
          text-align: center;
        }

        input {
          background: #eee;
          border: none;
          padding: 12px 15px;
          margin: 8px 0;
          width: 100%;
        }

        button {
          border-radius: 20px;
          border: 1px solid #e23744;
          background-color: #e23744;
          color: #fff;
          font-size: 12px;
          font-weight: bold;
          padding: 12px 45px;
          letter-spacing: 1px;
          text-transform: uppercase;
          transition: transform 80ms ease-in;
          cursor: pointer;
        }

        .ghost {
          background-color: transparent;
          border-color: #fff;
        }

        .form-container {
          position: absolute;
          top: 0;
          height: 100%;
          transition: all 0.6s ease-in-out;
        }

        .sign-in-container {
          left: 0;
          width: 50%;
          z-index: 2;
        }

        .sign-up-container {
          left: 0;
          width: 50%;
          opacity: 0;
          z-index: 1;
        }

        .container.right-panel-active .sign-in-container {
          transform: translateX(100%);
        }

        .container.right-panel-active .sign-up-container {
          transform: translateX(100%);
          opacity: 1;
          z-index: 5;
        }

        .overlay-container {
          position: absolute;
          top: 0;
          left: 50%;
          width: 50%;
          height: 100%;
          overflow: hidden;
          transition: transform 1.3s ease-in-out;
          z-index: 100;
        }

        .container.right-panel-active .overlay-container {
          transform: translateX(-100%);
        }

        .overlay {
          background: linear-gradient(to right, #e23744, #f84e5c);
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;
          color: #fff;
          position: relative;
          left: -100%;
          height: 100%;
          width: 200%;
          transform: translateX(0);
          transition: transform 0.6s ease-in-out;
        }

        .container.right-panel-active .overlay {
          transform: translateX(50%);
        }

        .overlay-panel {
          position: absolute;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 0 40px;
          height: 100%;
          width: 50%;
        }

        .overlay-left {
          transform: translateX(-20%);
        }

        .overlay-right {
          right: 0;
          transform: translateX(0);
        }

        .container.right-panel-active .overlay-left {
          transform: translateX(0);
        }

        .container.right-panel-active .overlay-right {
          transform: translateX(20%);
        }

        .social-container {
          margin: 20px 0;
        }

        .social-container a {
          border: 1px solid #ddd;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin: 0 5px;
          height: 40px;
          width: 40px;
        }

        #bgVideo {
          position: fixed;
          top: 0;
          left: 0;
          min-width: 100%;
          min-height: 100%;
          object-fit: cover;
          z-index: -2;
        }

        .video-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.4);
          z-index: -1;
        }
      `}</style>
    </>
  );
};

export default LoginPage;
