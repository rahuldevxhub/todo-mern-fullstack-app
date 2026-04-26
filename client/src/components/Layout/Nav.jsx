import React, { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Nav = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("auth");
    toast.success("Successfully Logout");
    navigate("/login");
  };
  

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("auth"));

    console.log("User Data:", userData);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUsername(userData?.user?.name);
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <h4>
            <PersonIcon /> &nbsp; Hello {username || "User"} !
          </h4>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/home"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/todoList">
                  My Tasks
                </Link>
              </li>
              <li className="nav-item">
                <span
                  className="nav-link"
                  onClick={logoutHandler}
                  style={{ cursor: "pointer" }}
                >
                  <LogoutIcon className="text-primary" />
                </span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
