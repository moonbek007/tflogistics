import React from "react";
// import { Link } from "react-router-dom";
import Shipper from "./Shipper";
import Driver from "./Driver";
import jwt from "jsonwebtoken";

function Dashboard({ setRoute }) {
  const token = JSON.parse(localStorage.getItem("jwt_token"));
  const [userInfo, setUserInfo] = React.useState({ email: "", role: "" });
  const linkRef = React.useRef(null);
  React.useEffect(() => {
    if (!token) {
      setTimeout(() => {
        // linkRef.current.click();
        setRoute("/login");
      }, 1000);
    } else {
      const user = jwt.verify(token, "secret");
      setUserInfo({ email: user.email, role: user.role });
    }
  }, [token]);
  return (
    <>
      {userInfo.role === "SHIPPER" ? (
        <Shipper
          role={userInfo.role}
          email={userInfo.email}
          token={token}
          setRoute={setRoute}
        />
      ) : (
        <Driver
          role={userInfo.role}
          email={userInfo.email}
          token={token}
          setRoute={setRoute}
        />
      )}
      {/* <Link to="/login" ref={linkRef}></Link> */}
    </>
  );
}

export default Dashboard;
