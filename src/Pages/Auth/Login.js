// LoginPage.js
import { useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginAPI } from "../../utils/ApiRequest";
import { Brightness4, Brightness7 } from "@mui/icons-material"; // Light/Dark Mode Icons

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
    document.body.className = theme; // Apply theme class to body
  }, [navigate, theme]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: theme === "dark" ? "dark" : "light",
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { email, password } = values;
    try {
      const { data } = await axios.post(loginAPI, { email, password });
      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
        toast.success(data.message, toastOptions);
      } else {
        toast.error(data.message, toastOptions);
      }
    } catch (error) {
      toast.error("Login failed!", toastOptions);
    }
    setLoading(false);
  };

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <div className={`login-container ${theme}`}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: { value: theme === "dark" ? "#000" : "#f0f0f0" },
          },
          fpsLimit: 60,
          particles: {
            number: { value: 200, density: { enable: true, value_area: 800 } },
            color: { value: theme === "dark" ? "#ffcc00" : "#0000ff" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: { enable: true, minimumValue: 1 } },
            move: { enable: true, speed: 2 },
          },
          detectRetina: true,
        }}
      />
      <Container className="mt-5">
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <div className="theme-toggle">
              <Button variant="outline-light" onClick={toggleTheme}>
                {theme === "dark" ? <Brightness7 /> : <Brightness4 />}{" "}
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </Button>
            </div>
            <h1 className="text-center mt-4">
              <AccountBalanceWalletIcon
                sx={{ fontSize: 40, color: theme === "dark" ? "white" : "black" }}
              />
            </h1>
            <h2 className={`text-center ${theme === "dark" ? "text-white" : "text-dark"}`}>
              Login
            </h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail" className="mt-3">
                <Form.Label className={theme === "dark" ? "text-white" : "text-dark"}>
                  Email address
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className="mt-3">
                <Form.Label className={theme === "dark" ? "text-white" : "text-dark"}>
                  Password
                </Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  value={values.password}
                />
              </Form.Group>

              <div className="text-center mt-4">
                <Link to="/forgotPassword" className={theme === "dark" ? "text-white" : "text-dark"}>
                  Forgot Password?
                </Link>
                <Button type="submit" className="mt-3 btnStyle" disabled={loading}>
                  {loading ? "Signing in…" : "Login"}
                </Button>
                <p className="mt-3" style={{ color: theme === "dark" ? "#9d9494" : "#555" }}>
                  Don't Have an Account?{" "}
                  <Link to="/register" className={theme === "dark" ? "text-white" : "text-dark"}>
                    Register
                  </Link>
                </p>
              </div>
            </Form>
          </Col>
        </Row>
        <ToastContainer />
      </Container>
    </div>
  );
};

export default Login;
