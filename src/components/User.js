import React from "react";
import { IconButton } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
function User({ token, closeModal }) {
  const [user, setUser] = React.useState({});
  React.useEffect(() => {
    fetch(`/api/users/me`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setUser(res.user);
      })
      .catch((err) => console.log(err));
  }, [token]);
  return (
    <div className="form__display">
      <IconButton
        color="secondary"
        className="dashboard__clipboard__left__burger"
        onClick={closeModal}
        style={{ position: "absolute", top: "0.25rem", right: "0.25rem" }}
      >
        <ClearIcon fontSize="large" style={{ margin: "0.35rem" }} />
      </IconButton>
      <h3>Email - {user?.email ?? ""}</h3>
      <h3>Role - {user?.role ?? ""}</h3>
      <h5>
        Created Date -{" "}
        {`${new Date(user?.created_date ?? new Date()).toDateString()}`}
      </h5>
      <h5>ID - {user?._id ?? ""}</h5>
    </div>
  );
}

export default User;
