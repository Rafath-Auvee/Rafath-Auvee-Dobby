import "./App.css";
import toast, { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Shared/Navbar";
import Home from "./components/Pages/Home";
import RequireAuth from "./components/Hooks/RequireAuth";
import Login from "./components/Authentication/Login";
import Registration from "./components/Authentication/Registration";
// import MyImages from "./components/Pages/MyImages";
import AddImage from "./components/Pages/AddImage";
import AllImages from "./components/Pages/AllImages";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/add"
          element={
            <RequireAuth>
              <AddImage />
            </RequireAuth>
          }
        />

        <Route
          path="/all-images"
          element={
            <RequireAuth>
              <AllImages />
            </RequireAuth>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
