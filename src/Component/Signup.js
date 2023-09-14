import React, { useState } from "react";
import Navebar from "./Navebar";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Typography,
  Avatar,
  Button,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import signupImg from "../img/signupimage.jpeg";
import "../Style/SignUp.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import client from "../apollo";
const SIGNUP_MUTATION = gql`
  mutation signup(
    $fname: String!
    $lname: String!
    $email: String!
    $password: String!
  ) {
    signup(
      fname: $fname
      lname: $lname
      email: $email
      password: $password
    ) {
      FName
    }
  }
`;

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);
  const [signup] = useMutation(SIGNUP_MUTATION,{client});
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConPasswordVisibility = () => {
    setShowConPassword(!showConPassword);
  };

  const formik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      email: "",
      password: "",
      Conpassword: "",
      userType: "",
    },
    validationSchema: Yup.object({
      fname: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Name Required"),
      lname: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Name Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .max(20, "Must be 20 characters or less")
        .min(8, "Minimum 8 character Password Required.")
        .required("Password Required"),
      Conpassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
     
    }),
    onSubmit: (values) => {
      const { fname, lname, email, password } = values;
      handleSignup({ fname, lname, email,  password });
    },
  });

  const handleSignup = async ({ fname, lname, email,  password }) => {
    console.log(fname,lname,email,password);
    try {
      const response = await signup({
        variables: { fname, lname, email, password },
      });
      console.log("User registered:", response.data.signup);

      navigate("/login")
      // Redirect to login page or perform other actions after successful signup
    } catch (error) {
      console.error("Error during signup:", error);
      alert(error);
    }
  };

  return (
    <>
      <Navebar />
      <Box className="MainContent">
        <Box className="img-Con">
          <img className="img" src={signupImg} alt="Signup" />
        </Box>
        <Box className="SignUp-card">
          <Box className="header">
            <center>
              <Avatar style={{ m: 1, bgcolor: "secondary.main" }}>
                <img src={signup} alt="Signup Avatar" />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
            </center>
          </Box>
          <Box
            className="body-con"
            component="form"
            noValidate
            onSubmit={formik.handleSubmit}
          >
            <TextField
              className="textField"
              id="name"
              name="fname"
              type="text"
              label="First-Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.fname}
            />
            {formik.touched.fname && formik.errors.fname && (
              <div style={{ color: "red" }}>{formik.errors.fname}</div>
            )}
            <br />
            <br />
            <TextField
              className="textField"
              id="name"
              name="lname"
              type="text"
              label="Last-Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lname}
            />
            {formik.touched.lname && formik.errors.lname && (
              <div style={{ color: "red" }}>{formik.errors.lname}</div>
            )}
            <br />
            <br />
            <TextField
              className="textField"
              id="email"
              name="email"
              type="email"
              label="Email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <div style={{ color: "red" }}>{formik.errors.email}</div>
            )}
            <br />
            <br />
            
            <TextField
              className="textField"
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              label="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                ),
              }}
            />
            {formik.touched.password && formik.errors.password && (
              <div style={{ color: "red" }}>{formik.errors.password}</div>
            )}
            <br />
            <br />
            <TextField
              className="textField"
              id="Conpassword"
              name="Conpassword"
              type={showConPassword ? "text" : "password"}
              label="Confirm Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.Conpassword}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={toggleConPasswordVisibility} edge="end">
                    {showConPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                ),
              }}
            />
            {formik.touched.Conpassword && formik.errors.Conpassword ? (
              <div style={{ color: "red" }}>{formik.errors.Conpassword}</div>
            ) : null}
            <br />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="success"
              sx={{
                mt: 3,
                mb: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                color: "",
              }}
              style={{
                width: "55%",
                marginTop: "15px",
                fontSize: "16px",
                marginLeft: "15%",
              }}
            >
              SignUp
            </Button>
            <Link
              className="signtext"
              to="/login"
              style={{ fontSize: "16px", marginLeft: "15%" }}
            >
              Are you already a member?
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Signup;
