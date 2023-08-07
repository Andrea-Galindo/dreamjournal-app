import React, { useState } from "react";
import { db } from "../firebase";
import { Card, Form, Container } from "react-bootstrap";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const DreamForm = () => {
  const navigate = useNavigate();

  const { user } = UserAuth();

  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [peopleAndPlaces, setPeopleAndPlaces] = useState("");
  const [feelings, setFeelings] = useState("");

  // Add document dream to dreams collection in firebase
  const createDream = async (e) => {
    e.preventDefault(e);
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      date: date,
      title: title,
      description: description,
      peopleandplaces: peopleAndPlaces,
      feelings: feelings,
    });
    console.log(title);
    setDate("");
    setTitle("");
    setDescription("");
    setPeopleAndPlaces("");
    setFeelings("");
    navigate("/home");
  };

  return (
    <Container className="d-flex justify-content-center mt-3">
      <div className="w-100" style={{ maxWidth: "600px" }}>
        <Card>
          <Card.Body>
            <Form onSubmit={createDream}>
              <Form.Group id="date">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  required
                  onChange={(e) => setDate(e.target.value)}
                />
              </Form.Group>
              <Form.Group id="title" className="mt-2">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  maxength="38"
                  rows={1}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mt-2">
                <Form.Label>Dream on</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mt-2">
                <Form.Label>People and places</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  onChange={(e) => setPeopleAndPlaces(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mt-2">
                <Form.Label>Feelings</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  onChange={(e) => setFeelings(e.target.value)}
                />
              </Form.Group>
              <div className="dream-form-btn">
                <button
                  className="submit-dream-btn w-30 mx-auto mt-2 mr-2"
                  type="submit"
                >
                  save
                </button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default DreamForm;
