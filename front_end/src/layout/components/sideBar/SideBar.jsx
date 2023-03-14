import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

import "./Sidebar.scss";
import { MenuItem } from "./Menu";
import images from "~/assets/images";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "~/store/userSlice";
import { setElastic } from "~/store/elasticSlice";

function SideBar({ lists, dashboard }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const page = dashboard.split("/")[1];
  const { elastic } = useSelector((state) => state.elastic);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  const sidebarRef = useRef();
  useEffect(() => {
    const shrinkHeader = () => {
      dispatch(setElastic(window.innerWidth < 600));
    };
    window.addEventListener("resize", shrinkHeader);

    return () => {
      window.removeEventListener("resize", shrinkHeader);
    };
  });

  const handleElastic = () => {
    dispatch(setElastic(!elastic));
  };

  return (
    <div ref={sidebarRef} className={`sidebar ${!elastic ? "hide" : ""}`}>
      <Link to={dashboard} className={"top"} style={{ textDecoration: "none" }}>
        <img src={images.logo} alt="logo" />
        <span className={"brand"}>BigCorp</span>
      </Link>

      <div className={"center"}>
        <ul>
          <p className={"titleList"}>MAIN</p>
          <MenuItem
            to={dashboard}
            title="Dashboard"
            icon={<DashboardIcon className={"icon"} />}
          />
          <p className={"titleList"}>LIST</p>
          {lists.map((item, index) => {
            return (
              <MenuItem
                key={index}
                to={item.to}
                title={item.title}
                icon={<item.icon className={"icon"} />}
              />
            );
          })}

          <p className={"titleList"}>USER</p>
          <MenuItem
            to={`/${page}/profile`}
            title="Profile"
            icon={<AccountCircleIcon className={"icon"} />}
          />
          <div className="menu-item" onClick={handleLogout}>
            <span className="icon">
              <ExitToAppIcon />
            </span>
            <span className="title">Logout</span>
          </div>
        </ul>
      </div>
      <div className={"bottom"}>
        <div
          className={"color-options"}
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className={"color-options"}
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
      <div className={"elastic"} onClick={handleElastic}>
        {elastic ? (
          <KeyboardArrowLeftIcon className={"icon"} />
        ) : (
          <KeyboardArrowRightIcon className={"icon"} />
        )}
      </div>
    </div>
  );
}

export default SideBar;
