import React from "react";
import "./ShowModal.css";

const Showmodal = ({ close }) => {
  return (
    <>
      <div className="wrapper"></div>
      <div className="container">
        <div className="grid grid-cols-2">
          <div>
            <label for="role" className="label-form required">
              Role:
            </label>
            <select className="inputform" name="dropdown" id="dropdown">
              <option value="Select">Select</option>
              <option value="developer">Developer</option>
              <option value="pmo">PMO</option>
              <option value="lead">Lead</option>
              <option value="qa">QA</option>
              <option value="business">Business</option>
            </select>
          </div>
          <div>
            <div>
              <label for="name" className="label-form required">
                Name:
              </label>
              <input className="inputform" type="text" />
            </div>
          </div>
          <div className="div-button">
            <button onClick={close}>Submit</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Showmodal;
