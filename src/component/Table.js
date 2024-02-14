import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Table.css";
import NoteContext from "../context/NoteContext";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const Table = () => {
  const a = useContext(NoteContext);
  const navigate = useNavigate();
  const data = localStorage.getItem("data");
  const [print, setPrint] = useState([]);
  const [search,setSearch]=useState("");
  const [searchPrint,setSearchPrint]=useState([]);
  const [nprint,setNprint]=useState([]);
  const arr = ["none", "Developer", "PMO", "Lead", "QA", "Business"];

  useEffect(
    () => {
      if(data && data.length>0){
      const temp = JSON.parse(data);
      // console.log(temp);
      const sortedTable = temp.sort((a, b) => {
      return a.pname.localeCompare(b.pname)
      });
      // console.log(sortedTable, 'sorted');
      setPrint(sortedTable);
      }
    }, // eslint-disable-next-line
    [data]
  );

  const handledelete = (ind) => a.handleDelete(ind);
  const handleEdit = (val) => a.handleEdit(val);
  const handleAdd=()=>{
    navigate("/form");
  }

    useEffect(()=>{setNprint(print)},[print]);

    //handleSearch function

    const handleSearch = () => {
      const temp = [...print];
      const filter = temp.filter((item) => {
        // Search for exact match in pname
        const pnameMatch = item.pname.toLowerCase().includes(search.toLowerCase());

        // Search for any name in roles that matches (case-insensitive)
        const rolesMatch = item.roles.some(r =>
          r.name.toLowerCase().includes(search.toLowerCase())
        );

        // Return item if any of the conditions match
        return pnameMatch || rolesMatch;
      });
      setSearchPrint(filter);
      if(search.length===0){
        setNprint(print);
      }else{
        setNprint(searchPrint);
      }
    };
  
    // here we are using useEffect for handling search bar
    useEffect(() => {
      handleSearch();
      // eslint-disable-next-line
    }, [search]);
  


  return (
    <>
      <div className="text-center mt-3">
        <label className="text-xl font-serif ">Search : </label>
        <input type="text" className="inputsearch " onChange={(e) => setSearch(e.target.value)}/>
        <button onClick={handleAdd}>Add Details</button>
      </div>

      <div className="div-table">
        <table>
          <tr className="tr-table">
            <th className="th-table">Project Name</th>
            <th className="th-table">Phase</th>
            <th className="th-table">Project Description</th>
            <th className="th-table">Role</th>
            <th className="th-table">Name</th>
            <th className="th-table">Source URL</th>
            <th className="action bg-[#f1f3f3]">Actions</th>
          </tr>
          { 
          nprint.map((val, ind) => (
            <tr className="tr-table">
              <th className="th1-table">{val.pname}</th>
              <th className="th1-table">{val.phase}</th>
              <th className="th1-table">{val.pdes}</th>
              <th className="th1-table">
                {val.roles.map((v, i) => (
                  <p>{arr[v.role]}</p>
                ))}
              </th>
              <th className="th1-table">
                {val.roles.map((v, i) => (
                  <p>{v.name}</p>
                ))}
              </th>
              <th className="th1-table"><a className="a" href={val.url} target="/">{val.url}</a></th>
              <th className="action">
                <div className="grid grid-cols-2">
                  <p className="mx-auto my-auto"><EditIcon fontSize="large" onClick={() => handleEdit(val)}/></p>
                  <p className="mx-auto my-auto"><DeleteIcon fontSize="large" onClick={()=>{handledelete(val)}}/> </p>
                </div>
              </th>
            </tr>
          ))
          }
        </table>
      </div>
    </>
  );
};

export default Table;
