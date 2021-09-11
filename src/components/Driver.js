import React from "react";
import { context } from "../js/context";
// import { Link } from "react-router-dom";
import { IconButton, Button } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import logo from "../assets/logo.png";
import AssignmentLateIcon from "@material-ui/icons/AssignmentLate";
import HistoryIcon from "@material-ui/icons/History";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import VisibilityIcon from "@material-ui/icons/Visibility";
import AddIcon from "@material-ui/icons/Add";
import Modal from "./Modal.js";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import LockIcon from "@material-ui/icons/Lock";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";

function Driver({ email, role, token, setRoute }) {
  const [modal, setModal] = React.useState({ type: "", showModal: false });
  const [showTrucks, setShowTrucks] = React.useState(false);
  const [trucks, setTrucks] = React.useState([]);
  const [loadsStatus, setLoadsStatus] = React.useState("ASSIGNED");
  const [loads, setLoads] = React.useState([]);
  // const linkRef = React.useRef(null);
  const { dispatch } = React.useContext(context);
  const [showOptions, setShowOptions] = React.useState(true);
  React.useEffect(() => {
    fetch(`/api/loads?status=${loadsStatus}`, {
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
        setLoads(res.loads);
      })
      .catch((err) => console.log(err));
    fetch("/api/trucks", {
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
        setTrucks(res.trucks);
      });
  }, [token, loadsStatus]);
  return (
    <div className="dashboard">
      {modal.show ? (
        <Modal
          token={token}
          closeModal={() => setModal({ type: "", show: false })}
          type={modal.type}
        />
      ) : (
        ""
      )}
      <div className="dashboard__clipboard">
        <div className="dashboard__clipboard__left">
          <IconButton
            color="default"
            className="dashboard__clipboard__left__burger"
            onClick={() => {
              setShowOptions((state) => !state);
            }}
          >
            <MenuIcon fontSize="large" style={{ margin: "0.35rem" }} />
          </IconButton>
          <img
            src={logo}
            alt="logo"
            className="dashboard__clipboard__left__logo"
          />
        </div>
        <div className="dashboard__clipboard__right">
          <p>{role.toLowerCase()}</p>
          <p>{email}</p>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              dispatch({ type: "LOGOUT" });
              localStorage.clear();
              // linkRef.current.click();
              setRoute("/login");
            }}
          >
            Logout
          </Button>
          <Button
            variant="contained"
            color="secondary"
            style={{ margin: "0 0.25rem" }}
            onClick={() => {
              dispatch({ type: "LOGOUT" });
              fetch("/api/users/me", {
                method: "DELETE",
                headers: {
                  "Content-type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              })
                .then((res) => {
                  if (res.status === 200) {
                    alert("User deleted");
                  } else {
                    alert("Can't delete account while ON LOAD");
                  }
                })
                .catch((err) => console.log(err));
              localStorage.clear();
              // linkRef.current.click();
              setRoute("/login");
            }}
          >
            Delete Me
          </Button>
        </div>
      </div>
      <div className="line"></div>
      <div className="dashboard__loads">
        {showOptions ? (
          <div className="dashboard__loads__options">
            <Button
              color="default"
              variant={loadsStatus === "ASSIGNED" ? "contained" : ""}
              onClick={() => {
                setLoadsStatus("ASSIGNED");
                setShowTrucks(false);
              }}
            >
              <AssignmentLateIcon />
              <p>Assigned Loads</p>
            </Button>
            <Button
              color="default"
              variant={loadsStatus === "SHIPPED" ? "contained" : ""}
              onClick={() => {
                setLoadsStatus("SHIPPED");
                setShowTrucks(false);
              }}
            >
              <HistoryIcon />
              <p>History</p>
            </Button>
            <Button
              color="default"
              onClick={() => setModal({ type: "SHOW_ME", show: true })}
            >
              <AccountCircleIcon />
              <p>Profile</p>
            </Button>
            <Button
              color="default"
              onClick={() => {
                setLoadsStatus("");
                setShowTrucks(true);
              }}
              variant={loadsStatus === "" ? "contained" : ""}
            >
              <LocalShippingIcon />
              <p>Trucks</p>
            </Button>
          </div>
        ) : (
          ""
        )}
        <div
          className="dashboard__loads__details"
          style={{ width: `${showOptions ? "80%" : "100%"}` }}
        >
          <TableContainer component={Paper}>
            <Table aria-label="simple table" style={{ minWidth: "100%" }}>
              <TableHead>
                <TableRow>
                  <TableCell>{showTrucks ? "TYPE" : "LOAD NAME"}</TableCell>
                  <TableCell align="right">CREATED DATE</TableCell>
                  <TableCell align="right">
                    {showTrucks ? "STATUS" : "PICK-UP ADDRESS"}
                  </TableCell>
                  <TableCell align="right">
                    {showTrucks ? "ASSIGNED TO" : "DELIVERY ADDRESS"}
                  </TableCell>
                  <TableCell align="right">
                    {loadsStatus === "" ? (
                      <IconButton
                        color="default"
                        onClick={() => {
                          setModal({ type: "ADD_TRUCK", show: true });
                        }}
                      >
                        <AddIcon size="large" style={{ margin: "0.35rem" }} />
                      </IconButton>
                    ) : (
                      ""
                    )}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {showTrucks && trucks.length > 0 ? (
                  trucks.map((truck) => (
                    <TableRow key={truck._id}>
                      <TableCell component="th" scope="row">
                        {truck.type}
                      </TableCell>
                      <TableCell align="right">
                        {new Date(truck.created_date).toLocaleString()}
                      </TableCell>
                      <TableCell align="right">{truck.status}</TableCell>
                      <TableCell align="right">
                        {truck.assigned_to ? "YES" : "NO"}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          color="default"
                          onClick={() => {
                            fetch(`/api/trucks/${truck._id}/`, {
                              method: "GET",
                              headers: {
                                "Content-type": "application/json",
                                Authorization: `Bearer ${token}`,
                              },
                            })
                              .then((res) => res.json())
                              .then((res) => {
                                alert(
                                  `truck : \nid : ${
                                    res.truck._id
                                  }\ncreated_by : ${
                                    res.truck.created_by
                                  }\nassigned_to : ${
                                    res.truck.assigned_to
                                  }\nstatus : ${res.truck.status}\ntype : ${
                                    res.truck.type
                                  }\ncreated_date : ${new Date(
                                    res.truck.created_date
                                  ).toDateString()}`
                                );
                              })
                              .catch((err) => console.log(err));
                          }}
                        >
                          <VisibilityIcon style={{ margin: "0.35rem" }} />
                        </IconButton>
                        <IconButton
                          color="primary"
                          onClick={() => {
                            if (truck.status === "OL") {
                              alert("Cannot modify truck which is ON LOAD");
                            } else {
                              setModal({ type: "UPDATE_TRUCK", show: true });
                            }
                          }}
                          style={{
                            display: `${
                              loadsStatus !== "" ? "none" : "initial"
                            }`,
                          }}
                        >
                          <CreateIcon style={{ margin: "0.35rem" }} />
                        </IconButton>
                        <IconButton
                          color="secondary"
                          onClick={() => {
                            fetch(`/api/trucks/${truck._id}`, {
                              method: "DELETE",
                              headers: {
                                "Content-type": "application/json",
                                Authorization: `Bearer ${token}`,
                              },
                            })
                              .then((res) => {
                                if (res.status === 200) {
                                  alert("Deleted successfully");
                                  setTrucks(
                                    trucks.filter(
                                      (newLoad) => newLoad._id !== truck._id
                                    )
                                  );
                                } else {
                                  alert(
                                    "Cannot remove a truck which is ON LOAD"
                                  );
                                }
                              })
                              .catch((err) => console.log(err));
                          }}
                          style={{
                            display: `${
                              loadsStatus !== "" ? "none" : "initial"
                            }`,
                          }}
                        >
                          <DeleteIcon style={{ margin: "0.35rem" }} />
                        </IconButton>
                        <IconButton
                          color="primary"
                          onClick={() => {
                            fetch(`/api/trucks/${truck._id}/assign`, {
                              method: "POST",
                              headers: {
                                "Content-type": "application/json",
                                Authorization: `Bearer ${token}`,
                              },
                            })
                              .then((res) => {
                                if (res.status === 200) {
                                  alert("Assigned a new truck");
                                } else {
                                  alert(
                                    "Cannot assign a new truck while ON LOAD"
                                  );
                                }
                              })
                              .catch((err) => console.log(err));
                          }}
                        >
                          <LockIcon style={{ margin: "0.35rem" }} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : !showTrucks && loads.length > 0 ? (
                  loads.map((load) => (
                    <TableRow key={load._id}>
                      <TableCell component="th" scope="row">
                        {load.name}
                      </TableCell>
                      <TableCell align="right">
                        {new Date(load.created_date).toLocaleString()}
                      </TableCell>
                      <TableCell align="right">{load.pickup_address}</TableCell>
                      <TableCell align="right">
                        {load.delivery_address}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          color="default"
                          onClick={() => {
                            fetch(`/api/loads/${load._id}/`, {
                              method: "GET",
                              headers: {
                                "Content-type": "application/json",
                                Authorization: `Bearer ${token}`,
                              },
                            })
                              .then((res) => res.json())
                              .then((res) => {
                                alert(
                                  `load : \nid : ${
                                    res.load._id
                                  }\ncreated_by : ${
                                    res.load.created_by
                                  }\nassigned_to : ${
                                    res.load.assigned_to
                                  }\nstatus : ${res.load.status}\nstate : ${
                                    res.load.state
                                  }\nname : ${res.load.name}\nweight : ${
                                    res.load.payload
                                  }\npickup_address : ${
                                    res.load.pickup_address
                                  }\ndelivery_address : ${
                                    res.load.delivery_address
                                  }\nspecs : width - ${
                                    res.load.dimensions.width
                                  }, length - ${
                                    res.load.dimensions["length"]
                                  }, height - ${
                                    res.load.dimensions.height
                                  }\ncreated_date : ${new Date(
                                    res.load.created_date
                                  ).toDateString()}`
                                );
                              })
                              .catch((err) => console.log(err));
                          }}
                        >
                          <VisibilityIcon style={{ margin: "0.35rem" }} />
                        </IconButton>
                        <IconButton
                          color="secondary"
                          onClick={() => {
                            fetch(`/api/loads/active/state`, {
                              method: "PATCH",
                              headers: {
                                "Content-type": "application/json",
                                Authorization: `Bearer ${token}`,
                              },
                            })
                              .then((res) => {
                                if (res.status === 200) {
                                  alert("Load state changed successfully");
                                } else {
                                  alert("Load shipped successfully");
                                }
                              })
                              .catch((err) => console.log(err));
                          }}
                          style={{
                            display: `${
                              loadsStatus !== "ASSIGNED" ? "none" : "initial"
                            }`,
                          }}
                        >
                          <TrendingUpIcon style={{ margin: "0.35rem" }} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell>No loads here</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        {/* <Link ref={linkRef} to="/login"></Link> */}
      </div>
    </div>
  );
}

export default Driver;

// function getProperTime(load_date){
//   let period = "";
//   Math.floor(Math.abs(new Date() - new Date(load_date)) / 1000 / 60);
// }
