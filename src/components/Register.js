import React from "react";
import logo from "../assets/logo.png";
import { TextField, Button, IconButton } from "@material-ui/core";
// import { Link } from "react-router-dom";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import WorkIcon from "@material-ui/icons/Work";

function Register({ setRoute }) {
  const emailRef = React.useRef(null);
  const passwordRef = React.useRef(null);
  const roleRef = React.useRef(null);
  const [showPassword, setShowPassword] = React.useState(false);
  const [modal, setModal] = React.useState({
    text: "Invisible text",
    color: "white",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        email: emailRef.current.childNodes[1].childNodes[1].value,
        password: passwordRef.current.childNodes[1].childNodes[1].value,
        role: roleRef.current.childNodes[1].childNodes[1].value,
      }),
      headers: { "Content-type": "application/json" },
    })
      .then((res) => {
        if (res.status === 400) {
          setModal({
            text: "Insufficient credentials or User already exists!",
            color: "red",
          });
        } else if (res.status === 500) {
          setModal({ text: "Internal Server Error!", color: "red" });
        } else {
          setModal({ text: "Profile created successfully", color: "green" });
        }
        setTimeout(() => {
          setModal({ text: "Invisible text", color: "white" });
        }, 3000);
        console.log(res.headers);
        return res.json();
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  return (
    <form className="form__display">
      <img src={logo} alt="logo" className="form__display__logo" />
      <TextField
        label="Email"
        className="form__display__input"
        ref={emailRef}
        required
        type="email"
        InputProps={{
          startAdornment: (
            <AlternateEmailIcon style={{ marginRight: "0.5rem" }} />
          ),
        }}
      />
      <TextField
        label="Password"
        className="form__display__input"
        ref={passwordRef}
        type={!showPassword ? "password" : "text"}
        required
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
      <TextField
        label="Role"
        className="form__display__input"
        ref={roleRef}
        helperText="Type in capitals!"
        required
        InputProps={{
          startAdornment: <WorkIcon style={{ marginRight: "0.5rem" }} />,
        }}
      />
      <Button
        color="primary"
        variant="contained"
        className="form__display__primary-btn"
        onClick={handleSubmit}
        type="submit"
      >
        Register
      </Button>
      <Button
        color="primary"
        variant="outlined"
        className="form__display__forgot-password-btn"
        onClick={() => setRoute("/login")}
      >
        {/* <Link to="/login">Login</Link> */}
        Login
      </Button>
      <p style={{ color: modal.color, textAlign: "center" }}>{modal.text}</p>
    </form>
  );
}

export default Register;
