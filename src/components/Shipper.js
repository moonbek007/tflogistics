import React from "react";
import { context } from "../js/context";
// import { Link } from "react-router-dom";
import { IconButton, Button } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import logo from "../assets/logo.png";
import FiberNewIcon from "@material-ui/icons/FiberNew";
import PostAddIcon from "@material-ui/icons/PostAdd";
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
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import Modal from "./Modal";
import AddIcon from "@material-ui/icons/Add";

function Shipper({ email, role, token, setRoute }) {
  const [modal, setModal] = React.useState({ type: "", showModal: false });
  const [loadsStatus, setLoadsStatus] = React.useState("ASSIGNED");
  const [loads, setLoads] = React.useState([]);
  const { dispatch } = React.useContext(context);
  // const linkRef = React.useRef(null);
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
              variant={loadsStatus === "NEW" ? "contained" : ""}
              onClick={() => {
                setLoadsStatus("NEW");
              }}
            >
              <FiberNewIcon />
              <p>New Loads</p>
            </Button>
            <Button
              color="default"
              variant={loadsStatus === "POSTED" ? "contained" : ""}
              onClick={() => {
                setLoadsStatus("POSTED");
              }}
            >
              <PostAddIcon />
              <p>Posted Loads</p>
            </Button>
            <Button
              color="default"
              variant={loadsStatus === "ASSIGNED" ? "contained" : ""}
              onClick={() => {
                setLoadsStatus("ASSIGNED");
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
              }}
            >
              <HistoryIcon />
              <p>History</p>
            </Button>
            <Button
              color="default"
              onClick={() => {
                fetch("/api/users/me", {
                  method: "GET",
                  headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                })
                  .then((res) => res.json())
                  .then((res) => {
                    alert(
                      `id : ${res.user._id}\nemail : ${
                        res.user.email
                      }\nrole : ${res.user.role}\ncreated_date : ${new Date(
                        res.user.created_date
                      ).toDateString()}`
                    );
                  })
                  .catch((err) => console.log(err));
              }}
            >
              <AccountCircleIcon />
              <p>Profile</p>
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
                  <TableCell>LOAD NAME</TableCell>
                  <TableCell align="right">CREATED DATE</TableCell>
                  <TableCell align="right">PICK-UP ADDRESS</TableCell>
                  <TableCell align="right">DELIVERY ADDRESS</TableCell>
                  <TableCell align="right">
                    {loadsStatus === "NEW" ? (
                      <IconButton
                        color="default"
                        onClick={() => {
                          setModal({ type: "ADD_LOAD", show: true });
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
                {loads.length > 0 ? (
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
                            fetch(
                              `/api/loads/${load._id}/${
                                loadsStatus === "ASSIGNED"
                                  ? "shipping_info"
                                  : ""
                              }`,
                              {
                                method: "GET",
                                headers: {
                                  "Content-type": "application/json",
                                  Authorization: `Bearer ${token}`,
                                },
                              }
                            )
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
                                  ).toDateString()} ${
                                    loadsStatus === "ASSIGNED"
                                      ? `\n\ntruck : \nid : ${
                                          res.truck._id
                                        }\ncreated_by : ${
                                          res.truck.created_by
                                        }\nassigned_to : ${
                                          res.truck.assigned_to
                                        }\ntype : ${res.truck.type}\nstatus : ${
                                          res.truck.status
                                        }\ncreated_date : ${new Date(
                                          res.truck.created_date
                                        ).toDateString()}`
                                      : ""
                                  }`
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
                            setModal({ type: "UPDATE_LOAD", show: true });
                          }}
                          style={{
                            display: `${
                              loadsStatus !== "NEW" ? "none" : "initial"
                            }`,
                          }}
                        >
                          <CreateIcon style={{ margin: "0.35rem" }} />
                        </IconButton>
                        <IconButton
                          color="secondary"
                          onClick={() => {
                            fetch(`/api/loads/${load._id}`, {
                              method: "DELETE",
                              headers: {
                                "Content-type": "application/json",
                                Authorization: `Bearer ${token}`,
                              },
                            })
                              .then((res) => {
                                if (res.status === 200) {
                                  alert("Deleted successfully");
                                  setLoads(
                                    loads.filter(
                                      (newLoad) => newLoad._id !== load._id
                                    )
                                  );
                                } else {
                                  alert("ERROR");
                                }
                              })
                              .catch((err) => console.log(err));
                          }}
                          style={{
                            display: `${
                              loadsStatus !== "NEW" ? "none" : "initial"
                            }`,
                          }}
                        >
                          <DeleteIcon style={{ margin: "0.35rem" }} />
                        </IconButton>
                        <IconButton
                          color="primary"
                          onClick={() => {
                            fetch(`/api/loads/${load._id}/post`, {
                              method: "POST",
                              headers: {
                                "Content-type": "application/json",
                                Authorization: `Bearer ${token}`,
                              },
                            })
                              .then((res) => {
                                return res.json();
                              })
                              .then((res) => {
                                if (res.driver_found) {
                                  alert("Posted successfully");
                                  setLoads(
                                    loads.filter(
                                      (newLoad) => newLoad._id !== load._id
                                    )
                                  );
                                } else {
                                  alert("Couldn't assign to any truck");
                                }
                              })
                              .catch((err) => console.log(err));
                          }}
                          style={{
                            display: `${
                              loadsStatus !== "NEW" ? "none" : "initial"
                            }`,
                          }}
                        >
                          <PostAddIcon style={{ margin: "0.35rem" }} />
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
      </div>
      {/* <Link to="/login" ref={linkRef}></Link> */}
    </div>
  );
}

export default Shipper;
