import React, { useState } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import Header from "../components/Header";
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      // add cache function to store data  about the user
      navigate("/home");
    } catch (e) {
      setError(e.message);
      if (e.message === "Firebase: Error (auth/user-not-found).") {
        setError("User not found");
      } else if (e.message === "Firebase: Error (auth/wrong-password).") {
        setError("Invalid password");
      } else if (e.message === "Firebase: Error (auth/invalid-email).") {
        setError("Invalid email");
      } else {
        setError(e.message);
      }
    }
  };

  return (
    <div className="welcome-page">
      <div className="page-header">
        <Header />
      </div>
      <Container className="d-flex align-items-center justify-content-center">
        <div className="w-100" style={{ maxWidth: "390px" }}>
          <Card className="login-form">
            <Card.Body>
              <h2
                className="text-center mb-4"
                style={{
                  fontFamily: "degular-text, sans-serif",
                  fontWeight: "500px",
                }}
              >
                Sign in
              </h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  {/* <Form.Label>Email</Form.Label> */}
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group id="password">
                  {/* <Form.Label>Password</Form.Label> */}
                  <Form.Control
                    type="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Button className="w-100 signin-button" type="submit">
                  Sign In
                </Button>
              </Form>
              <div className="w-100 text-center mt-3">
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>
            </Card.Body>
          </Card>
          <div
            className="w-100 text-center mt-2"
            style={{ fontFamily: "degular-text, sans-serif" }}
          >
            Need an account? <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Login;
