import React from "react";
import Login from "./Login";
import Register from "./Register";

const Form = ({ path, setRoute }) => {
  return (
    <div className="form">
      {path === "/login" ? (
        <Login setRoute={setRoute} />
      ) : (
        <Register setRoute={setRoute} />
      )}
    </div>
  );
};

export default Form;
