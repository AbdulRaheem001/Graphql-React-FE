import React, {useState, useEffect} from 'react';
import { Route, Routes, useNavigate} from "react-router-dom";
import Login from './Component/Login';
import Signup from './Component/Signup';
import Naviebar from './Component/Navebar';
import Home from './Component/Home';
import TodoHome from "./Component/TodoHome";
import CreatTodo from "./Component/CreatTodo";
import CompleteTodo from "./Component/CompletedTodo";
import Sidebar from "./Component/SideBarTodo";
import { useSelector } from "react-redux";
function App() {
  const data = useSelector((state) => {
    return state.users;
  });
  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem("isLoggedIn")
  );
  useEffect(() => {
    setIsLoggedIn(sessionStorage.getItem("isLoggedIn"));
    console.log(isLoggedIn);
  }, [data.loginState]);
  return (
    <>
       <Routes>
       <Route exact path="/" element={<Home />} />
       <Route exact path="/navebar" element={<Naviebar />} />
       <Route exact path="/login" element={<Login />} />
       <Route exact path="/signup" element={<Signup />} />
       {data.loginState  ? (
        <>
         <Route exact path="/todoHome" element={<TodoHome />} />
         <Route exact path="/creatTodo" element={<CreatTodo />} />
         <Route exact path="/completeTodo" element={<CompleteTodo />} />
        </>
      ) : null}
       


       <Route path="*" element={<NotFound />} />
       </Routes>
    </>
  );
}
function NotFound() {
  const navigate = useNavigate();
  const backFun = () => {
    navigate("/");
  };
  return (
    <>
      {" "}
      <center>
        <br />
        <br />
        <br />
        <h1>404 - Page Not Found</h1>
        <h1>Go backe to website</h1>
        <button
          onClick={backFun}
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          Go Back
        </button>
      </center>
    </>
  );
}

export default App;