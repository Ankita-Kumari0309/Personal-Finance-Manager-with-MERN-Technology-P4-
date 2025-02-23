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

const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

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
    theme: "colored",
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = values;
    setLoading(true);

    const { data } = await axios.post(loginAPI, { email, password });

    if (data.success === true) {
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
      toast.success(data.message, toastOptions);
      setLoading(false);
    } else {
      toast.error(data.message, toastOptions);
      setLoading(false);
    }
  };

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <div style={{ position: "relative", overflow: "hidden", backgroundColor: "#1E1E2F" }}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: { value: "#1E1E2F" } },
          fpsLimit: 60,
          particles: {
            number: { value: 150, density: { enable: true, value_area: 800 } },
            color: { value: "#FFD700" },
            shape: { type: "circle" },
            opacity: { value: 0.4, random: true },
            size: { value: 3, random: { enable: true, minimumValue: 1 } },
            move: { enable: true, speed: 2 },
          },
          detectRetina: true,
        }}
        style={{
          position: "absolute",
          zIndex: -1,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />
      <Container className="mt-5" style={{ position: "relative", zIndex: 2 }}>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <h1 className="text-center mt-5">
              <AccountBalanceWalletIcon sx={{ fontSize: 40, color: "#FFD700" }} />
            </h1>
            <h2 className="text-center" style={{ color: "#FFD700" }}>Login</h2>
            <Form>
              <Form.Group controlId="formBasicEmail" className="mt-3">
                <Form.Label style={{ color: "#FFD700" }}>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                  style={{ backgroundColor: "#2A2A40", color: "#FFD700", borderColor: "#FFD700" }}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className="mt-3">
                <Form.Label style={{ color: "#FFD700" }}>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  value={values.password}
                  style={{ backgroundColor: "#2A2A40", color: "#FFD700", borderColor: "#FFD700" }}
                />
              </Form.Group>

              <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px" }}>
                <Link to="/forgotPassword" style={{ color: "#FFD700", textDecoration: "underline" }}>Forgot Password?</Link>

                <Button
                  type="submit"
                  style={{
                    backgroundColor: "#FFD700",
                    color: "#1E1E2F",
                    borderColor: "#FFD700",
                    marginTop: "15px",
                  }}
                  onClick={!loading ? handleSubmit : null}
                  disabled={loading}
                >
                  {loading ? "Signing in…" : "Login"}
                </Button>

                <p className="mt-3" style={{ color: "#FFD700" }}>
                  Don't Have an Account?{" "}
                  <Link to="/register" style={{ color: "#FFD700", textDecoration: "underline" }}>Register</Link>
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
