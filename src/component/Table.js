import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Table.css";
import NoteContext from "../context/NoteContext";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
// import { debounce } from "lodash";

const Table = () => {
  const a = useContext(NoteContext);
  const navigate = useNavigate();
  const { getForms, notes, setDetails, setNotes } = a;
  const [debouncedSearch, setDebouncedSearch] = useState(null);
  // const [nprint, setNprint] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  async function fetchData() {
    if (localStorage.getItem("token")) {
      let data = await getForms();
      // console.log(data);
      // setNprint(data);
      setNotes(data);
    } else {
      navigate("/login");
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handledelete = (ind) => {
    a.handleDelete(ind._id);
  };
  const handleEdit = (val) => {
    setDetails(val);
    navigate("/editform");
  };
  const handleVisibility = (val) => a.handleVisibility(val);
  const handleAdd = () => {
    navigate("/form");
  };

  //handleSearch function

  const host = "http://localhost:5000";

  const handleSearch = useCallback(
    async (s) => {
      if (s.trim().length === 0) {
        fetchData();
      } else {
        s = s.toLowerCase();
        const response = await fetch(`${host}/api/forms/SearchQuery?q=${s}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        });
        const json = await response.json();
        // setNprint(json);
        setNotes(json);
        console.log(json);
      }
    },
    [notes]
  );

  // const debouncedSearch = debounce(handleSearch, 5000);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);

    if (debouncedSearch) {
      clearTimeout(debouncedSearch);
    }

    // Create a new debounced function
    const timeoutId = setTimeout(() => {
      handleSearch(e.target.value);
    }, 1000);

    // Set the new debounced function
    setDebouncedSearch(timeoutId);
  };

  return (
    <>
      <div className="flex flex-wrap justify-between mt-3 mx-auto px-[2.5rem]">
        <div className="">
          <label className="text-xl font-serif ">Search : </label>
          <input
            type="text"
            className="border-2 rounded-md p-1"
            value={searchTerm}
            onChange={handleChange}
          />
        </div>
        <button className="button py-1" onClick={handleAdd}>
          Add Details
        </button>
      </div>

      <div className="div-table">
        <table className="table">
          <tr className="tr-table">
            <th className="th-table">Project Name</th>
            <th className="th-table">Phase</th>
            <th className="th-table">Project Description</th>
            {/* <th className="th-table">Role</th>
            <th className="th-table">Name</th> */}
            <th className="th-table">Source URL</th>
            <th className="th-table">Project Status</th>
            <th className="action bg-[#f1f3f3]">Actions</th>
          </tr>
          {/* {nprint.length?nprint.map((val, ind) => ( */}
          {notes.length ? (
            notes.map((val, ind) => (
              <tr className="tr-table " key={ind}>
                <th className="th1-table">
                  {val.project_name.length < 15
                    ? val.project_name
                    : `${val.project_name.substring(0, 15)}...`}
                </th>
                <th className="th1-table">{val.phase}</th>
                <th className="th1-table">
                  {val.project_des.length < 15
                    ? val.project_des
                    : `${val.project_des.substring(0, 15)}...`}
                </th>
                {/* <th className="th1-table">
                {val.roles.map((v, i) => (
                  <p>{arr[v.role]}</p>
                ))}
              </th>
              <th className="th1-table">
                {val.roles.map((v, i) => (
                  <p>{v.name}</p>
                ))}
              </th> */}
                <th className="th1-table">
                  <a className="a" href={val.url} target="/">
                    Github Link
                  </a>
                </th>
                <th className="th1-table">{val.status}</th>
                <th className="action">
                  <div className="grid grid-cols-3">
                    <p className="mx-auto my-auto hover:cursor-pointer">
                      <VisibilityIcon
                        fontSize="medium"
                        onClick={() => handleVisibility(val)}
                      />
                    </p>
                    <p className="mx-auto my-auto hover:cursor-pointer">
                      <EditIcon
                        fontSize="medium"
                        onClick={() => handleEdit(val)}
                      />
                    </p>
                    <p className="mx-auto my-auto hover:cursor-pointer">
                      <DeleteIcon
                        fontSize="medium"
                        onClick={() => handledelete(val)}
                      />{" "}
                    </p>
                  </div>
                </th>
              </tr>
            ))
          ) : (
            <div className="text-center text-lg mt-2 font-serif">
              No data availabe
            </div>
          )}
        </table>
      </div>
    </>
  );
};

export default Table;
