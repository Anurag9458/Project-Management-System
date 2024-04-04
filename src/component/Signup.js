import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import img from "../Images/Login1.jpg";

const Signup = () => {
 
  const [credentials, setCrendentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      //Save the auth token
      localStorage.setItem("token", json.authtoken);
      navigate("/");
      toast.success("Account Created Successfully");
    } else {
      toast.warning("Invalid Credentials");
    }
  };

  const onChange = (e) => {
    setCrendentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="container">
      <h2 className="text-3xl text-center my-4 font-serif">Sign up to continue to PMS</h2>
      <div className="flex flex-wrap">
      <img src={img} alt="" className="h-96 mx-auto my-auto"/>

      <form onSubmit={handleSubmit} className="border w-96  my-auto h-fit mx-auto px-5 py-3 rounded-sm">
        <div className="my-3">
          <p>
          <label htmlFor="name" className="text-xl">
            Name : 
          </label>
          </p>
          <input
            type="text"
            className="border-2 rounded-md m-1 p-1 w-80"
            id="name"
            name="name"
            aria-describedby="emailHelp"
            onChange={onChange}
          />
        </div>
        <div className="my-3">
          <p>
          <label htmlFor="email" className="text-xl">
            Email address : 
          </label>
          </p>
          <input
            type="email"
            className="border-2 rounded-md m-1 p-1 w-80"
            id="email"
            name="email"
            onChange={onChange}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="my-3">
          <p>
          <label htmlFor="password" className="text-xl">
            Password : 
          </label>
          </p>
          <input
            type="password"
            className="border-2 rounded-md m-1 p-1 w-80"
            id="password"
            name="password"
            onChange={onChange}
            required
            minLength={5}
          />
        </div>
        <div className="my-3">
          <p>
          <label htmlFor="cpassword" className="text-xl">
            Confirm Password : 
          </label>
          </p>
          <input
            type="password"
            className="border-2 rounded-md m-1 p-1 w-80"
            id="cpassword"
            name="cpassword"
            onChange={onChange}
            required
            minLength={5}
          />
        </div>
       <div className="text-center">
       <button type="submit" className="button">
          SignUp
        </button>
       </div>
      </form>
      </div>
    </div>
  );
};

export default Signup;
