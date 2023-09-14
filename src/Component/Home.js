import React from "react";
import Navebar from "./Navebar";
import bgImg from "../img/homeImg2.jpg";
import "../Style/Home.css";
import { Link } from "react-router-dom";

const Home = () => {
 
  return (
    <>
      <Navebar/>
      <div className="hero-image">
        <img className="hero-image__img" src={bgImg} alt="Card image" />
        <div className="hero-image__overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Your TODO</h1>
          <Link
            to="/signup"
            className="Signup-Button"
          >
            Sign-Up
          </Link>
        </div>
      </div>
    </>
  );
};
export default Home;