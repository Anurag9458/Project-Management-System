import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NoteContext from "./NoteContext";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const NoteState = (props) => {
  const nRole = { role: "", name: "", isbuttonActive: true };
  const [cancel,setCancel]=useState(true);
  const [details, setDetails] = useState({
    pname: "",
    pdes: "",
    roles: [{ ...nRole }],
    url: "",
    phase: "",
  });

  const navigate = useNavigate();

  const handleEdit = (selectedData) => {

    setDetails(selectedData);
    navigate("/form");
  };

  const [print, setPrint] = useState([]);

  const temp = localStorage.getItem("data");
  useEffect(
    () => {
      if (temp && temp.length > 0) {
        const data = JSON.parse(temp);
        setPrint(data);
      }
    }, // eslint-disable-next-line
    [temp]
  );

  const updateDetails = (e) => {
    let check=false;
    let a=JSON.stringify(e);
    print.forEach(element => {
      if(JSON.stringify(element)===a){
        check=true;
      }
    });

    if (print.length > 0 && check) {
      toast.info("You have not update anything yet!");
      return 0;
    } else {
      setPrint([...print, e]);
      const store = JSON.stringify([...print, e]);
      localStorage.setItem("data", store);
      setDetails({
        pname: "",
        pdes: "",
        roles: [{ ...nRole }],
        url: "",
        phase: "",
      });
      return 1;
    }
  };

  useEffect(() => {
    console.log(print);
  }, [print]);

    //Here we are deleting the details

    const handleDelete = (val) => {

      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        console.log(val);
        if (result.isConfirmed) {
          const filtered = print.filter(
            (e) => JSON.stringify(e)!==JSON.stringify(val)
          );
          setPrint(filtered);
   
          localStorage.setItem("data", JSON.stringify(filtered));
   
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      });
        
      };


  return (
    <NoteContext.Provider
    value={{
      details,
      setDetails,
      handleDelete,
      updateDetails,
      handleEdit,
      setCancel,
      print,
    }}
  >
    {props.children}
  </NoteContext.Provider>
  );
};

export default NoteState;
