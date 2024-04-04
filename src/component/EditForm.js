import React, { useContext, useEffect, useState } from "react";
import "./Form.css";
import { useNavigate } from "react-router-dom";
import NoteContext from "../context/NoteContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditForm = () => {
  const a = useContext(NoteContext);
  const [flag, setFlag] = useState(false);
  const { handleEdit } = a;
  useEffect(
    () => {
      if (a.details.project_name.length > 0) setFlag(true);
      else setFlag(false);
    },
    // eslint-disable-next-line
    []
  );

  const navigate = useNavigate();
  const nRole = { role: "", name: "", isbuttonActive: true };
  const [roleValue, setRoleValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [errors, setErrors] = useState({});
  const tdata = {
    project_name: "",
    project_des: "",
    roles: [{ ...nRole }],
    url: "",
    phase: "",
    status: "",
  };
  const [details, setDetails] = useState({
    project_name: "",
    project_des: "",
    roles: [{ ...nRole }],
    url: "",
    phase: "",
    status: "",
  });

  useEffect(
    () => {
      setDetails(a.details);
      // console.log(a.details.project_name);
      console.log(a.details);
      if (a.details.project_name) {
        setNameValue("true");
        setRoleValue("true");
      }
    },
    // eslint-disable-next-line
    []
  );

  //Here We are adding role
  const addRoll = () => {
    const tDetails = JSON.parse(JSON.stringify(details));
    tDetails.roles.forEach((element) => {
      element.isbuttonActive = false;
    });
    tDetails.roles.push({ ...nRole });
    setDetails(tDetails);

    setRoleValue("");
    setNameValue("");
  };

  //Here we are handeling text-change
  const onTextChange = (val, key) => {
    setDetails({
      ...details,
      [key]: val ? val : "",
    });
  };

  //Here we handeling roles
  const onRollChange = (val, key, kIndex) => {
    const tDetails = JSON.parse(JSON.stringify(details));
    tDetails.roles.forEach((element, index) => {
      if (kIndex === index) {
        element[key] = val;
      }
    });
    setDetails(tDetails);

    if (key === "role") {
      setRoleValue(val);
    } else if (key === "name") {
      setNameValue(val);
    }
  };

  //Here we are checking validations
  const isValidUrl = (url) => {
    const urlPattern = /^(?:\w+:)?\/\/([^\s.]+\.\S{2}|localhost[:?\d]*)\S*$/;
    return urlPattern.test(url);
  };

  const num = (val) => {
    return !Number.isInteger(Number(val));
  };

  //Here we are handling submit button
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(details);
    handleEdit(
      details._id,
      details.project_name,
      details.project_des,
      details.roles,
      details.url,
      details.phase,
      details.status
    );
    toast.success("Form Edited Successfully");
    navigate("/");
    setDetails(tdata);
  };

  //Here we are handling cancel button
  const handleCancel = () => {
    a.setDetails(tdata);
    navigate(-1);
  };

  // const check=(phaseValue)=>{
  //   if(details.project_name.length){
  //   // console.log(details.project_name);
  //   // const temp1=details;
  //   const temp2=a.print.filter((el)=>el.project_name===details.project_name && el.phase===phaseValue)
  //   // console.log(temp2);
  //   // console.log(temp2[0].project_name.length);
  //   if(temp2.length>0){
  //     setDetails(temp2[0]);
  //   }else{
  //     setDetails({...tdata, project_name: details.project_name, phase: phaseValue});
  //   }
  // }
  // }

  const handlePhase = (value) => {
    // console.log(value);
    onTextChange(value, "phase");
    // console.log(details);
    // check(value);
  };

  return (
    <>
      <div>
        <div className="text-3xl text-center m-2 font-serif  pt-1 text-[#503291] font-bold">
          Form
        </div>
        <div className="form">
          <div className="grid-form">
            <div className="div-form">
             <p> <label>Project Name :</label></p>
              <input
                className={
                  !errors.project_name || details.project_name.length > 0
                    ? "inputform"
                    : "error"
                }
                type="text"
                placeholder="Enter Project Name"
                value={details.project_name}
                onChange={(e) => onTextChange(e.target.value, "project_name")}
              />
            </div>

            <div className="div-form">
              <p><label>Phase :</label></p>
              <div className="w-[15rem] mx-1">
                <select
                  className="w-full p-2 border text-xl h-full rounded-md my-2"
                  name="dropdown"
                  id="dropdown"
                  value={details.phase}
                  onChange={(e) => handlePhase(e.target.value)}
                >
                  <option value="0">Select</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                </select>
              </div>
              {/* <button onClick={check}>Check</button> */}
            </div>
          </div>

          <div className="div-form">
            <p><label >Project Description :</label></p>
            <textarea
              className={
                !errors.project_des || details.project_des.length > 0
                  ? "textform"
                  : "texterror"
              }
              type="text"
              value={details.project_des}
              onChange={(e) => onTextChange(e.target.value, "project_des")}
            ></textarea>
          </div>
          {details.roles.map((item, index) => {
            return (
              <div
                className="grid-form"
                key={`roleBox_${index}`}
              >
                <div className="div-form ">
                  <p><label >Role : </label></p>
                  <div className="w-[15rem] ">
                    <select
                      className="w-full p-2 border text-xl h-full rounded-md"
                      name="dropdown"
                      id="dropdown"
                      value={item.role}
                      onChange={(e) =>
                        onRollChange(e.target.value, "role", index)
                      }
                    >
                      <option value="0">Select</option>
                      <option value="1">Developer</option>
                      <option value="2">PMO</option>
                      <option value="3">Lead</option>
                      <option value="4">QA</option>
                      <option value="5">Business</option>
                    </select>
                  </div>
                </div>
                <div className="div-form">
                 <p> <label >Name : </label></p>
                  <div className="flex">
                    <input
                      className="name-form"
                      type="text"
                      value={item.name}
                      placeholder="Enter Your Name"
                      onChange={(e) =>
                        onRollChange(e.target.value, "name", index)
                      }
                    />
                    {item.isbuttonActive ? (
                      <button
                        className={`button-add ${
                          !roleValue || !nameValue ? "opacity-50" : ""
                        }`}
                        onClick={addRoll}
                        disabled={!roleValue || !nameValue}
                      >
                        Add
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          <div className="grid-form">
            <div className="div-form">
              <p><label>Source Path :</label></p>
              <input
                className={!errors.url ? "inputform" : "error"}
                type="url"
                value={details.url}
                placeholder="Enter a valid Url"
                onChange={(e) => onTextChange(e.target.value, "url")}
              />
            </div>
            <div className="div-form">
              <p><label>Status :</label></p>
              <input
                className={!errors.url ? "inputform" : "error"}
                type="url"
                value={details.status}
                onChange={(e) => onTextChange(e.target.value, "status")}
              />
            </div>
          </div>
          <div className="text-center">
            <button className="bg-red-600 border-2 rounded-lg py-1 text-white font-serif px-2 mx-2" onClick={handleCancel}>
              Cancel
            </button>
            <button className="bg-[#503291] border-2 rounded-lg py-1 text-white font-serif px-2 mx-2" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditForm;
