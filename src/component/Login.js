import React, {  useState } from "react";
import {useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
// import NoteContext from "../context/NoteContext";
import img from "../Images/Login1.jpg";

const Login = () => {
    const [credentials,setCrendentials]=useState({email:"",password:""})
    let navigate=useNavigate();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response=await fetch("http://localhost:5000/api/auth/login",{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({email:credentials.email,password:credentials.password})
    
        });

        const json=await response.json();
        console.log(json);

        if(json.success){
            //Save the auth token
            localStorage.setItem('token',json.authtoken);
            navigate("/");
          
            toast.success("Login Successfully");
        }else{
           
            toast.warning("Invalid Credentials");
        }
    }

    const onChange = (e) => {
        setCrendentials({ ...credentials, [e.target.name]: e.target.value });
      };

      const handleSignup=()=>navigate("/signup");

  return (
   <div className="container">
    <h2 className="text-3xl text-center mt-5 font-serif">Login to continue to PMS</h2>
     <div className="flex flex-wrap">
     <img src={img} alt="" className="h-96 mx-auto my-auto"/>

     <form onSubmit={handleSubmit} className="border w-96  my-auto h-fit mx-auto px-5 py-3 rounded-sm">
      <div className="my-3 ">
        <p><label htmlFor="email" className="text-xl">
          Email : 
        </label></p>
        <input
          type="email"
          className="border-2 rounded-md m-1 p-1 w-80"
          id="email"
          aria-describedby="emailHelp"
          name="email"
          onChange={onChange}
        />
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div className="my-2">
        <p><label htmlFor="password" className="text-xl">
          Password : 
        </label></p>
        <input
          type="password"
          className="border-2 rounded-md m-1 p-1 w-80"
          id="password"
          name="password"
          onChange={onChange}
        />
      </div>
     
     <div className="text-center">
     <button type="submit" className="button" >
        LogIn
      </button>
      <button type="button" className="button"  onClick={handleSignup}>
        SignUp
      </button>
     </div>
    </form>
    </div>
   </div>
  );
};

export default Login;
