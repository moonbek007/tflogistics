import React from "react";
import { TextField, Button, IconButton } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";

function UpdateLoad({ token, closeModal, id }) {
  const nameRef = React.useRef(null);
  const payloadRef = React.useRef(null);
  const pickupAddressRef = React.useRef(null);
  const deliveryAddressRef = React.useRef(null);
  const widthRef = React.useRef(null);
  const lengthRef = React.useRef(null);
  const heightRef = React.useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(nameRef);
    fetch(`/api/loads/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        name: nameRef.current.childNodes[1].childNodes[0].value,
        payload: payloadRef.current.childNodes[1].childNodes[0].value,
        pickup_address:
          pickupAddressRef.current.childNodes[1].childNodes[0].value,
        delivery_address:
          deliveryAddressRef.current.childNodes[1].childNodes[0].value,
        dimensions: {
          width: widthRef.current.childNodes[1].childNodes[0].value,
          length: lengthRef.current.childNodes[1].childNodes[0].value,
          height: heightRef.current.childNodes[1].childNodes[0].value,
        },
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
        label="Name"
        className="form__display__input"
        required
        type="text"
        ref={nameRef}
      />
      <TextField
        label="Weight"
        className="form__display__input"
        required
        ref={payloadRef}
        type="number"
      />
      <TextField
        label="Pick Up Address"
        className="form__display__input"
        required
        ref={pickupAddressRef}
      />
      <TextField
        label="Delivery Address"
        className="form__display__input"
        required
        ref={deliveryAddressRef}
      />
      <TextField
        label="Width"
        className="form__display__input"
        required
        ref={widthRef}
        type="number"
      />
      <TextField
        label="Length"
        className="form__display__input"
        required
        ref={lengthRef}
        type="number"
      />
      <TextField
        label="Height"
        className="form__display__input"
        required
        ref={heightRef}
        type="number"
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

export default UpdateLoad;
