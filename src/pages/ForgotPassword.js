import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

import { Button, Form, Card, Alert, Container } from "react-bootstrap";
import Header from "../components/Header";

const ForgotPassword = () => {
  const { resetPassword } = UserAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await resetPassword(email);
      navigate("/");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="welcome-page">
      <div className="page-header">
        <Header />
      </div>
      <Container className="d-flex align-items-center justify-content-center">
        <div className="w-100" style={{ maxWidth: "390px" }}>
          <Card className="forgot-password-form">
            <Card.Body>
              Enter your e-mail address to reset your password
              {error && <Alert variant="danger">{error}</Alert>}
              <Form className="mt-2" onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Control
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Button className="w-100 custom-bttn" type="submit">
                  Summit
                </Button>
                <div className="w-100 text-center mt-3">
                  <Link to="/" style={{ color: "black" }}>
                    Login
                  </Link>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default ForgotPassword;
