import React from "react";
import { TextField, Button, IconButton } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";

function UpdateTruck({ token, closeModal, id }) {
  const typeRef = React.useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/api/trucks/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        type: typeRef.current.childNodes[1].childNodes[0].value,
      }),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          alert("Update load successfully");
          closeModal();
        } else {
          alert("Please fill out all the fields");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <form className="form__display">
      <IconButton
        color="secondary"
        className="dashboard__clipboard__left__burger"
        onClick={closeModal}
        style={{ position: "absolute", top: "0.25rem", right: "0.25rem" }}
      >
        <ClearIcon fontSize="large" style={{ margin: "0.35rem" }} />
      </IconButton>
      <TextField
        label="TYPE"
        className="form__display__input"
        required
        type="text"
        helperText="Type in capitals!"
        ref={typeRef}
      />
      <Button
        color="primary"
        variant="contained"
        className="form__display__primary-btn"
        type="submit"
        onClick={handleSubmit}
      >
        Update
      </Button>
    </form>
  );
}

export default UpdateTruck;
