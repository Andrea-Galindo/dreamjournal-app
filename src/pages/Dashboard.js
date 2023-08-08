import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Container } from "react-bootstrap";
import { PiPlusCircleThin } from "react-icons/pi";

import { db } from "../firebase";
import {
  where,
  getDocs,
  query,
  collection,
  doc,
  deleteDoc,
} from "firebase/firestore";

import Dream from "../components/Dream";
import AppNavBar from "../components/AppNavBar";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [dreams, setDreams] = useState([]);
  const [filteredDreams, setFilteredDreams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserDreams = async () => {
      const uid = localStorage.getItem("uid");
      const dreamsList = [];
      // query to get only the documents that match logged in user id
      const q = query(collection(db, "dreams"), where("uid", "==", uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        dreamsList.push({ ...doc.data(), id: doc.id });
      });
      setDreams(dreamsList);
      setFilteredDreams(dreamsList);
      setLoading(false);
      console.log(dreamsList);
    };
    getUserDreams();
  }, [setDreams]);

  const handleDelete = async (id) => {
    const dreamRef = doc(db, "dreams", id);
    try {
      await deleteDoc(dreamRef);
      setDreams(dreams.filter((dream) => dream.id !== id));
      setFilteredDreams(dreams.filter((dream) => dream.id !== id));
      navigate("/dashboard");
    } catch (err) {
      alert(err);
    }
  };

  const handleEdit = (
    id,
    newDate,
    newTitle,
    newDescription,
    newPeopleandplaces,
    newFeelings,
    uid
  ) => {
    setDreams(
      dreams.map((dream) =>
        dream.id === id
          ? {
              ...dream,
              date: newDate,
              title: newTitle,
              description: newDescription,
              peopleandplaces: newPeopleandplaces,
              feelings: newFeelings,
              uid: uid,
            }
          : dream
      )
    );
    setFilteredDreams(
      dreams.map((dream) =>
        dream.id === id
          ? {
              ...dream,
              date: newDate,
              title: newTitle,
              description: newDescription,
              peopleandplaces: newPeopleandplaces,
              feelings: newFeelings,
              uid: uid,
            }
          : dream
      )
    );
  };

  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    let result = [];
    console.log(value);
    result = dreams.filter((dream) => {
      return dream.peopleandplaces.toLowerCase().search(value) !== -1;
    });
    setFilteredDreams(result);
  };

  return (
    <div className="dreams-page">
      <AppNavBar />
      <Container className="d-flex justify-content-center mt-3">
        <div className="w-100 m-2" style={{ maxWidth: "390px" }}>
          <input
            style={{
              // borderRadius: "40px",
              fontFamily: "degular-text, sans-serif",
              border: "none",
            }}
            className="form-control form-search-input"
            placeholder="Search person or place"
            type="text"
            onChange={(event) => handleSearch(event)}
          />
        </div>
      </Container>
      <div style={{ padding: 10 }}>
        {filteredDreams.map((dream) => {
          return (
            <Dream
              key={dream.id}
              id={dream.id}
              date={dream.date}
              title={dream.title}
              description={dream.description}
              feelings={dream.feelings}
              peopleandplaces={dream.peopleandplaces}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          );
        })}
      </div>
      {/* <div className="m-5 text-center no-records">
        You have not yet created dream records
      </div> */}

      <LinkContainer
        style={{ fontSize: "3rem", color: "rgb(129, 94, 234" }}
        to="/newdream"
      >
        <PiPlusCircleThin />
      </LinkContainer>
    </div>
  );
};

export default Dashboard;
