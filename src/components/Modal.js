import React from "react";
import NewLoad from "./NewLoad";
import NewTruck from "./NewTruck";
import UpdateLoad from "./UpdateLoad";
import UpdateTruck from "./UpdateTruck";
import User from "./User";

function Modal({ closeModal, type, token }) {
  return (
    <div className="modal">
      <div className="modal__display">
        {type === "ADD_LOAD" ? (
          <NewLoad token={token} closeModal={closeModal} />
        ) : type === "ADD_TRUCK" ? (
          <NewTruck token={token} closeModal={closeModal} />
        ) : type === "UPDATE_LOAD" ? (
          <UpdateLoad token={token} closeModal={closeModal} />
        ) : type === "UPDATE_TRUCK" ? (
          <UpdateTruck token={token} closeModal={closeModal} />
        ) : type === "SHOW_ME" ? (
          <User token={token} closeModal={closeModal} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Modal;
