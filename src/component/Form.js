import React, { useContext, useEffect, useState } from "react";
import "./Form.css";
import { useNavigate } from "react-router-dom";
import NoteContext from "../context/NoteContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Form = () => {
  const a = useContext(NoteContext);
  const [flag, setFlag] = useState(false);

  useEffect(
    () => {
      if (a.details.pname.length > 0) setFlag(true);
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
    pname: "",
    pdes: "",
    roles: [{ ...nRole }],
    url: "",
    phase: "",
  };
  const [details, setDetails] = useState({
    pname: "",
    pdes: "",
    roles: [{ ...nRole }],
    url: "",
    phase: "",
  });

  useEffect(
    () => {
      setDetails(a.details);
      // console.log(a.details.pname);
      if (a.details.pname) {
        setNameValue("true");
        setRoleValue("true");
      }
    },
    // eslint-disable-next-line
    []
  );

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

  const onTextChange = (val, key) => {
    setDetails({
      ...details,
      [key]: val ? val : "",
    });
  };

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

    const validationErrors = {};

    if (!details.pname.trim()) {
      validationErrors.pname = true;
    }
    if (num(details.phase) || !details.phase.trim()) {
      validationErrors.phase = true;
    }
    if (!details.pdes.trim()) {
      validationErrors.pdes = true;
    }
    if (!isValidUrl(details.url)) {
      validationErrors.url = true;
    }
    setErrors(validationErrors);
    console.log(errors);
    if (Object.keys(validationErrors).length === 0) {
      let value = a.updateDetails(details);

      if (value) {
        const successMessage = flag
          ? "Details Updated Successfully!"
          : "Details Added Successfully!";
        toast.success(successMessage);
        setDetails({});

        navigate("/");
      }
    }
  };

  //Here we are handling cancel button
  const handleCancel = () => {
    a.setPrint([...a.print, a.details]);
    a.setDetails(tdata);
    navigate(-1);
  };

  return (
    <>
      <div>
        <div className="text-2xl text-center m-2 font-[merck]  pt-1 text-[#503291] font-bold">
          Form
        </div>
        <div className="form">
          <div className="grid-form">
            <div className="div-form">
              <label>Project Name :</label>
              <input
                className={
                  !errors.pname || details.pname.length > 0
                    ? "inputform"
                    : "error"
                }
                type="text"
                placeholder="Enter Project Name"
                value={details.pname}
                onChange={(e) => onTextChange(e.target.value, "pname")}
              />
            </div>

            <div className="div-form">
              <label>Phase :</label>
              <input
                className={!errors.phase ? "inputform" : "error"}
                type="text"
                value={details.phase}
                placeholder="Enter a Number"
                onChange={(e) => onTextChange(e.target.value, "phase")}
              />
            </div>
          </div>

          <div className="div-form">
            <label className="h-[0.1rem]">Project Description :</label>
            <textarea
              className={
                !errors.pdes || details.pdes.length > 0
                  ? "textform"
                  : "texterror"
              }
              type="text"
              value={details.pdes}
              onChange={(e) => onTextChange(e.target.value, "pdes")}
            ></textarea>
          </div>
          {details.roles.map((item, index) => {
            return (
              <div
                className="grid-form space-x-[5rem]"
                key={`roleBox_${index}`}
              >
                <div className="div-form flex">
                  <label className="mt-2">Role : </label>
                  <div className="w-[15rem] mx-1">
                    <select
                      className="w-full border-black border-[0.05rem] pl-5 text-xl h-full rounded-lg"
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
                <div className="flex div-form">
                  <label className="mt-2">Name : </label>
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
                        className={`w-12 ml-2 ${
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
              <label>Source Path :</label>
              <input
                className={!errors.url ? "inputform" : "error"}
                type="url"
                value={details.url}
                placeholder="Enter a valid Url"
                onChange={(e) => onTextChange(e.target.value, "url")}
              />
            </div>
          </div>
          <div className="flex flex-wrap mx-auto w-44 m-1">
            <button className="w-20 bg-red-600" onClick={handleCancel}>
              Cancel
            </button>
            <button className="w-20" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
