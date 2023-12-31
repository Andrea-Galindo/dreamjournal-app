import React, { useState } from "react";
import { Modal, Card, Form, Container } from "react-bootstrap";
import { db } from "../firebase";
import { updateDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";

import "../styles/DreamModal.css";

function DreamModal({
  id,
  date,
  title,
  description,
  feelings,
  uid,
  peopleandplaces,
  onEdit,
  onDelete,
}) {
  // Update doc in collection "dreams"
  const updateDream = async (id) => {
    const dreamDoc = doc(db, "dreams", id);
    const newFields = {
      date: dateRef,
      title: titleRef,
      description: descriptionRef,
      peopleandplaces: peopleAndPlacesRef,
      feelings: feelingsRef,
    };
    await updateDoc(dreamDoc, newFields);
  };
  const navigate = useNavigate();

  const [dateRef, setDateRef] = useState(date);
  const [titleRef, setTitleRef] = useState(title);
  const [descriptionRef, setDescriptionRef] = useState(description);
  const [peopleAndPlacesRef, setPeopleAndPlacesRef] = useState(peopleandplaces);
  const [feelingsRef, setFeelingsRef] = useState(feelings);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleOnDelete = (id) => {
    onDelete(id);
    navigate("/dreams");
  };

  return (
    <>
      <button className="modal-open" onClick={handleShow}>
        <IoIosArrowDown />
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontFamily: "degular-text, sans-serif" }}>
            {title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container className="d-flex align-items-center justify-content-center mt-3">
            <div className="w-100">
              <Card>
                <Card.Body>
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleClose();
                      onEdit(
                        id,
                        dateRef,
                        titleRef,
                        descriptionRef,
                        peopleAndPlacesRef,
                        feelingsRef,
                        uid
                      );
                      updateDream(id);
                    }}
                    id="edit-dream"
                  >
                    <Form.Group id="date">
                      <Form.Label>Date</Form.Label>
                      <Form.Control
                        value={dateRef}
                        type="date"
                        onChange={(e) => setDateRef(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group id="title" className="mt-2">
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        value={titleRef}
                        rows={1}
                        onChange={(e) => setTitleRef(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mt-2">
                      <Form.Label>Dream on</Form.Label>
                      <Form.Control
                        as="textarea"
                        value={descriptionRef}
                        rows={3}
                        onChange={(e) => setDescriptionRef(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mt-2">
                      <Form.Label>People and places</Form.Label>
                      <Form.Control
                        value={peopleAndPlacesRef}
                        as="textarea"
                        rows={2}
                        onChange={(e) => setPeopleAndPlacesRef(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mt-2">
                      <Form.Label>Feelings</Form.Label>
                      <Form.Control
                        value={feelingsRef}
                        as="textarea"
                        rows={2}
                        onChange={(e) => setFeelingsRef(e.target.value)}
                      />
                    </Form.Group>
                  </Form>
                </Card.Body>
              </Card>
            </div>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <button
            style={{ fontFamily: "degular-text, sans-serif" }}
            form="edit-dream"
            variant="primary"
            className="dream-modal-btn"
            type="submit"
          >
            save
          </button>
          <button
            style={{ fontFamily: "degular-text, sans-serif" }}
            className="dream-modal-btn"
            onClick={() => handleOnDelete(id)}
            form="edit-dream"
            variant="primary"
          >
            delete
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DreamModal;
