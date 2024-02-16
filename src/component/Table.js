import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Table.css";
import NoteContext from "../context/NoteContext";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Table = () => {
  const a = useContext(NoteContext);
  const navigate = useNavigate();
  const data = localStorage.getItem("data");
  const [print, setPrint] = useState([]);
  // const [search,setSearch]=useState("");
  const [searchPrint, setSearchPrint] = useState([]);
  const [nprint, setNprint] = useState([]);
  // const arr = ["none", "Developer", "PMO", "Lead", "QA", "Business"];

  useEffect(
    () => {
      if (data && data.length > 0) {
        const temp = JSON.parse(data);
        setPrint(temp);
      }
    }, // eslint-disable-next-line
    [data]
  );

  const handledelete = (ind) => a.handleDelete(ind);
  const handleEdit = (val) => a.handleEdit(val);
  const handleVisibility = (val) => a.handleVisibility(val);
  const handleAdd = () => {
    navigate("/form");
  };

  useEffect(() => {
    setNprint(print);
  }, [print]);

  //handleSearch function

  const handleSearch = (s) => {
    const searchTerm = s.toLowerCase();
    const filteredPrint = print.filter((item) => {
      const pname = item.pname.toLowerCase();
      // const rolesMatch = item.roles.some((r) =>
      //   r.name.toLowerCase().includes(searchTerm)
      // );
      return pname.includes(searchTerm);
      // || rolesMatch
    });

    setSearchPrint(filteredPrint);
    setNprint(s.length === 0 ? print : filteredPrint);
  };

  return (
    <>
      <div className="mt-3 flex flex-wrap justify-between">
        <div className="mx-auto">
          <label className="text-xl font-serif ">Search : </label>
          <input
            type="text"
            className="inputsearch "
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <button className="mx-auto p-2" onClick={handleAdd}>
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
            <th className="action bg-[#f1f3f3]">Actions</th>
          </tr>
          {nprint.map((val, ind) => (
            <tr className="tr-table ">
              <th className="th1-table">{val.pname}</th>
              <th className="th1-table">{val.phase}</th>
              <th className="th1-table">{val.pdes}</th>
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
                  {val.url}
                </a>
              </th>
              <th className="action">
                <div className="grid grid-cols-3">
                  <p className="mx-auto my-auto">
                    <VisibilityIcon
                      fontSize="medium"
                      onClick={() => handleVisibility(val)}
                    />
                  </p>
                  <p className="mx-auto my-auto">
                    <EditIcon
                      fontSize="medium"
                      onClick={() => handleEdit(val)}
                    />
                  </p>
                  <p className="mx-auto my-auto">
                    <DeleteIcon
                      fontSize="medium"
                      onClick={() => handledelete(val)}
                    />{" "}
                  </p>
                </div>
              </th>
            </tr>
          ))}
        </table>
      </div>
    </>
  );
};

export default Table;
