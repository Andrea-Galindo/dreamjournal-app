import React, { useState } from "react";
import { Modal, Card, Button, Form, Container } from "react-bootstrap";
import { db } from "../firebase";
import { updateDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function EditDream({
  id,
  date,
  title,
  description,
  feelings,
  uid,
  peopleandplaces,
  onUpdate,
  onDelete,
}) {
  // firebase update doc in collection "dreams"
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
      <Button variant="primary" onClick={handleShow}>
        View
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container className="d-flex align-items-center justify-content-center mt-3">
            <div className="w-100" style={{ maxWidth: "600px" }}>
              <Card>
                <Card.Body>
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleClose();
                      onUpdate(
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
                        maxLength="38"
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
          <button form="edit-dream" variant="primary">
            save
          </button>
          <button
            className="delete-btn"
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

export default EditDream;
