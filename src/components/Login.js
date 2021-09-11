import React from "react";
import logo from "../assets/logo.png";
import { TextField, Button, IconButton } from "@material-ui/core";
// import { Link } from "react-router-dom";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { context } from "../js/context";

function Login({ setRoute }) {
  const { dispatch } = React.useContext(context);
  const [modal, setModal] = React.useState({
    text: "Invisible text",
    color: "white",
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const emailRef = React.useRef(null);
  const passwordRef = React.useRef(null);
  // const linkRef = React.useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: emailRef.current.childNodes[1].childNodes[1].value,
        password: passwordRef.current.childNodes[1].childNodes[1].value,
      }),
      headers: { "Content-type": "application/json" },
    })
      .then((res) => {
        if (res.status === 400) {
          setModal({
            text: "Insufficient or invalid credentials!",
            color: "red",
          });
        } else if (res.status === 500) {
          setModal({ text: "Internal Server Error!", color: "red" });
        } else {
          setModal({ text: "Logged in successfully", color: "green" });
        }
        return res.json();
      })
      .then((res) => {
        setTimeout(() => {
          setModal({ text: "Invisible text", color: "white" });
          if (res.jwt_token) {
            localStorage.setItem("jwt_token", JSON.stringify(res.jwt_token));
            dispatch({ type: "LOGIN" });
            // linkRef.current.click();
            setRoute("/dashboard");
          }
        }, 3000);
      })
      .catch((err) => console.log(err));
  };

  return (
    <form className="form__display">
      <img src={logo} alt="logo" className="form__display__logo" />
      <TextField
        label="Email"
        className="form__display__input"
        required
        type="email"
        ref={emailRef}
        InputProps={{
          startAdornment: (
            <AlternateEmailIcon style={{ marginRight: "0.5rem" }} />
          ),
        }}
      />
      <TextField
        label="Password"
        className="form__display__input"
        required
        ref={passwordRef}
        type={!showPassword ? "password" : "text"}
        InputProps={{
          startAdornment: showPassword ? (
            <IconButton
              onClick={() => {
                setShowPassword((showPassword) => !showPassword);
              }}
              style={{ marginRight: "0.5rem" }}
            >
              <VisibilityIcon />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => {
                setShowPassword((showPassword) => !showPassword);
              }}
              style={{ marginRight: "0.5rem" }}
            >
              <VisibilityOffIcon />
            </IconButton>
          ),
        }}
      />
      <Button
        color="primary"
        variant="contained"
        className="form__display__primary-btn"
        type="submit"
        onClick={handleSubmit}
      >
        Login
      </Button>
      {/* <Button
        color="default"
        variant="outlined"
        className="form__display__forgot-password-btn"
      >
        Forgot Password
      </Button> */}
      <Button
        color="primary"
        variant="outlined"
        className="form__display__forgot-password-btn"
        onClick={() => setRoute("/register")}
      >
        {/* <Link to="/register">Registration</Link> */}
        Registration
      </Button>
      <p style={{ color: modal.color, textAlign: "center" }}>{modal.text}</p>
      {/* <Link to="/dashboard" ref={linkRef}></Link> */}
    </form>
  );
}

export default Login;
