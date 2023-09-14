import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Style/Navebar.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setLoginState } from "../Redux/userSlice";
const Navebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => {
    return state.users;
  });
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  const logoutUser = () => {
    window.sessionStorage.clear();
    dispatch(setLoginState(false));
    navigate("/", { replace: true });
  };
  return (
    <nav>
      <button className="menu-button">
        <i className="fas fa-bars"></i>
      </button>
      <ul className={`nav-list `}>
        <li className="nav-item">
          {isLoggedIn ? (
            <>
              <Link to="/todoHome" className={`nav-link `}>
                Home
              </Link>
              <Link to="/completeTodo" className={`nav-link `}>
                CompletedTodo
              </Link>
              <Link to="/creatTodo" className={`nav-link `}>
                CreateTodo
              </Link>
              <Link to="/" className={`nav-link `} onClick={logoutUser}>
                SignOut
              </Link>
            </>
          ) : (
            <>
              <Link to="/" className={`nav-link `}>
                Home
              </Link>
                <Link to="/login" className={`nav-link `}>
                  SignIn
                </Link>
              
            </>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navebar;
