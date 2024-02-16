import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NoteContext from "./NoteContext";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const NoteState = (props) => {
  const nRole = { role: "", name: "", isbuttonActive: true };
  const [details, setDetails] = useState({
    pname: "",
    pdes: "",
    roles: [{ ...nRole }],
    url: "",
    phase: "",
  });
  const tdata = {
    pname: "",
    pdes: "",
    roles: [{ ...nRole }],
    url: "",
    phase: "",
  };

  const [eye, setEye] = useState({
    pname: "",
    pdes: "",
    roles: [{ ...nRole }],
    url: "",
    phase: "",
  });

  const navigate = useNavigate();

  const sortData = (temp) => {
    const sortedTable = temp.sort((a, b) => {
      return a.pname.localeCompare(b.pname);
    });
    return sortedTable;
  };

  const handleEdit = (val) => {
    const ind = print.findIndex(
      (element) => JSON.stringify(element) === JSON.stringify(val)
    );
    if (ind !== -1) {
      const filtered = print.filter((e, index) => index !== ind);
      const sortedData = sortData(filtered);
      const temp = print[ind];
      setPrint(sortedData);
      setDetails(temp);
      navigate("/form");
    }
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
    const check = print.some(
      (element) => JSON.stringify(element) === JSON.stringify(e)
    );

    if (print.length > 0 && check) {
      toast.warning("Details are already present");
      return 0;
    } else {
      const updatedPrint = [...print, e];
      setPrint(updatedPrint);
      const store = JSON.stringify(sortData(updatedPrint));
      localStorage.setItem("data", store);
      setDetails(tdata);
      return 1;
    }
  };

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
      if (result.isConfirmed) {
        const updatedPrint = print.filter(
          (e) => JSON.stringify(e) !== JSON.stringify(val)
        );
        setPrint(updatedPrint);
        localStorage.setItem("data", JSON.stringify(sortData(updatedPrint)));

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
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
        updateDetails,
        handleEdit,
        handleVisibility,
        setPrint,
        eye,
        print,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
