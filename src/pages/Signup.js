import React, { useState } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import Header from "../components/Header";

const Signup = () => {
  // save name to store it in "users" collection. Feature currently not working
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentUserId, setCurrentUserId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { createUser } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      setLoading(true);
      await createUser(email, password).then((credentials) => {
        setCurrentUserId(credentials.user.uid);
        console.log(currentUserId);
      });
      await addDoc(collection(db, "users"), {
        uid: currentUserId,
        name: name,
        email: email,
      });
      localStorage.setItem("user", name);
      navigate("/home");
      // console.log(email, password);
    } catch (e) {
      setError(e.message);
      if (e.message === "Firebase: Error (auth/invalid-email).") {
        setError("Invalid email");
      } else {
      }
      console.log(e.message);
    }
    setLoading(false);
  };

  return (
    <div className="welcome-page">
      <div>
        <Header />
      </div>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "50vh" }}
      >
        <div className="w-100" style={{ maxWidth: "390px" }}>
          <Card>
            <Card.Body>
              <h2
                className="text-center mb-4"
                style={{
                  fontFamily: "degular-text, sans-serif",
                  fontWeight: "500px",
                }}
              >
                Sign up
              </h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="name">
                  <Form.Control
                    type="name"
                    placeholder="Name"
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group id="email">
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Form.Group id="passwordConfirm">
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    required
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                  />
                </Form.Group>
                <Button className="w-100 custom-btn" type="submit">
                  Sign Up
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div
            className="w-100 text-center mt-2"
            style={{ fontFamily: "degular-text, sans-serif" }}
          >
            Already have an account? <Link to="/">Log In</Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Signup;
