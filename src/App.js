import "./App.css";
import Form from "./component/Form";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./component/Navbar";
import Table from "./component/Table";
import NoteState from "./context/NoteState";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Card from "./component/Card";


function App() {
  return (
    <div>
      <BrowserRouter>
        <NoteState>
          <Routes>
            <Route path="/" element={<Navbar />}>
              <Route index element={<Table />} />
              <Route path="form" element={<Form />}/>
              <Route path="card" element={<Card/>}/>
             
            </Route>
          </Routes>
        </NoteState>
      </BrowserRouter>
      <ToastContainer/>
    </div>
  );
}

export default App;
