import React from "react";
import { useContext } from "react";
import NoteContext from "../context/NoteContext";
import "./Card.css";
import { useNavigate } from "react-router-dom";
const arr = ["none", "Developer", "PMO", "Lead", "QA", "Business"];

const Card = () => {
  const a = useContext(NoteContext);
  const val = a.eye;
  const navigate = useNavigate();

  return (
    <div className="div-card">
      <p className="p-card">
        Project Name :<span className="font-medium "> {val.pname}</span>
      </p>
      <p className="p-card">
        Phase : <span className="font-medium"> {val.phase}</span>
      </p>
      <p className="p-card">
        Project Description :<span className="font-medium"> {val.pdes}</span>
      </p>
      <div className="grid grid-cols-2">
        <p className="p-card1">Role</p>
        <p className="p-card1">Name</p>
      </div>
      {val.roles.map((v, ind) => (
        <div className="grid grid-cols-2">
          <p className="mx-2">{arr[v.role]}</p>
          <p className="mx-2">{v.name}</p>
        </div>
      ))}

      <p className="p-card">
        Source Url :{" "}
        <a
          className="font-medium text-blue-400 underline"
          href={val.url}
          target="/"
        >
          {val.url}
        </a>
      </p>
      <div className="text-center">
        <button className="w-16  font-serif" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    </div>
  );
};

export default Card;
