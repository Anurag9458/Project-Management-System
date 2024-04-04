import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NoteContext from "./NoteContext";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const NoteState = (props) => {
  const nRole = { role: "", name: "", isbuttonActive: true };
  const [details, setDetails] = useState({
    project_name: "",
    project_des: "",
    roles: [{ ...nRole }],
    url: "",
    phase: "",
    status: "",
  });
  const tdata = {
    project_name: "",
    project_des: "",
    roles: [{ ...nRole }],
    url: "",
    phase: "",
    status: "",
  };

  const [eye, setEye] = useState({
    project_name: "",
    project_des: "",
    roles: [{ ...nRole }],
    url: "",
    phase: "",
    status: "",
  });

  const navigate = useNavigate();

  // const sortData = (temp) => {
  //   const sortedTable = temp.sort((a, b) => {
  //     return a.project_name.localeCompare(b.project_name);
  //   });
  //   return sortedTable;
  // };

  const host = "http://localhost:5000";
  const temp1 = [];

  const [notes, setNotes] = useState(temp1);

  //Get all Forms
  const getForms = async () => {
    //API CALL

    const response = await fetch(`${host}/api/forms/fetchAll`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    // console.log(json);
    setNotes(json);
    // console.log(notes);
    return json;
  };

  //Add a Form
  const addForm = async (
    project_name,
    project_des,
    roles,
    url,
    phase,
    status
  ) => {
    //API CALL

    const response = await fetch(`${host}/api/forms/addform`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        project_name,
        project_des,
        roles,
        url,
        phase,
        status,
      }),
    });
    const note = await response.json();
    setNotes(notes.concat(note));
    toast.success("Form Added Successfully");
  };

  //Delete a note
  const handleDelete = async (id) => {
    //API CALL
    
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await fetch(`${host}/api/forms/deleteform/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          // body:JSON.stringify(data)
        });
        const json = await response.json();
        console.log(json);

        const newnotes = notes.filter((note) => note._id !== id);
        setNotes(newnotes);
        // const data = await getForms();
        // console.log(data);
        
      }
    });
  };

  //Edit a note
  const handleEdit = async (
    id,
    project_name,
    project_des,
    roles,
    url,
    phase,
    status
  ) => {
    //API CALL

    const response = await fetch(`${host}/api/forms/updateform/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        project_name,
        project_des,
        roles,
        url,
        phase,
        status,
      }),
    });
    const json = await response.json();
    console.log(json);

    //Logic to edit
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].project_name = project_name;
        newNotes[index].project_des = project_des;
        newNotes[index].roles = roles;
        newNotes[index].url = url;
        newNotes[index].phase = phase;
        newNotes[index].status = status;

        break;
      }
    }
    setNotes(newNotes);
    setDetails(tdata);
    // showAlert("Note Updated Successfully","success")
  };

  // Here we are handling eye button
  const handleVisibility = (val) => {
    setEye(val);
    navigate("/card");
  };

  return (
    <NoteContext.Provider
      value={{
        details,
        setDetails,
        handleDelete,
        handleEdit,
        handleVisibility,
        eye,
        getForms,
        notes,
        addForm,
        setNotes
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
