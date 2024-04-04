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
      <div className="p-card">
        Project Name :<span className="font-medium "> {val.project_name}</span>
      </div>
      <div className="p-card">
        Phase : <span className="font-medium"> {val.phase}</span>
      </div>
      <div className="p-card break-words">
        Project Description :<span className="font-medium"> {val.project_des}</span>
      </div>
      <div className="grid grid-cols-2">
        <p className="p-card1 border-2">Role</p>
        <p className="p-card1 border-2">Name</p>
      </div>
      {val.roles.map((v, ind) => (
        <div className="grid grid-cols-2">
          <p className="pl-2 border-2">{arr[v.role]}</p>
          <p className="pl-2 border-2">{v.name}</p>
        </div>
      ))}

      <div className="p-card">
        Source Url :{" "}
        <a
          className="font-medium text-blue-400 underline"
          href={val.url}
          target="/"
        >
          {val.url}
        </a>
      </div>
      <div className="p-card">
        Project Status :<span className="font-medium"> {val.status}</span>
      </div>
      <div className="text-center">
        <button className="button font-serif" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    </div>
  );
};

export default Card;
