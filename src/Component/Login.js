import React, { useState } from 'react';
import { Link,useNavigate } from "react-router-dom";
import { Box, TextField, Typography, Avatar, Button, IconButton } from "@mui/material";
import Navebar from './Navebar';
import signupImg from "../img/signupimage.jpeg";
import signup from "../img/signup.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

        //Api call Libarary
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import client from '../apollo';

      //Redux call laibaray
import { useDispatch } from "react-redux";
import { setLoginState, setEmailState } from "../Redux/userSlice";

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) { 
    login(email: $email, password: $password) { 
      FName
    }
  }
`;

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigation=useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await client.mutate({
          mutation: LOGIN_MUTATION,
          variables: values,
        });
        const token = response.data.login.token;
        console.log(response.data.login.token);
        sessionStorage.setItem("token", token);
        console.log("Token ",token);
        console.log("Login Successfully");
        dispatch(setLoginState(true));
        dispatch(setEmailState(values.email));
        sessionStorage.setItem("isLoggedIn", true);
        navigation("/todoHome");
      } catch (err) {
        console.log("Login Failed");
      }
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
              <Avatar style={{ m: 1, bgcolor: "warning.main" }}>
                <img src={signup} alt="Signup Avatar" />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign In
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
              id="email"
              name="email"
              type="email"
              label="Email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div style={{ color: "red" }}>{formik.errors.email}</div>
            ) : null}
            <br /><br />
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
            {formik.touched.password && formik.errors.password ? (
              <div style={{ color: "red" }}>{formik.errors.password}</div>
            ) : null}
            <br /><br />

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
              SignIn
            </Button>
            <Link
              className="signtext"
              to="/signup"
              style={{ fontSize: "16px", marginLeft: "15%" }}
            >
              Are you not registered yet?
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Login;
