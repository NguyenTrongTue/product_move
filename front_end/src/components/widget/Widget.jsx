import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Widget.module.scss";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FactoryIcon from "@mui/icons-material/Factory";
import StoreMallDirectoryIcon from "@mui/icons-material/StoreMallDirectory";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import { Link } from "react-router-dom";
import httpRequest, { category } from "~/api/httpRequest";

const cx = classNames.bind(styles);

function Widget({ type }) {
  let data;
  const [users, setUsers] = useState();

  useEffect(() => {
    const getData = async () => {
      const userData = await httpRequest.getAll(category.users);

      setUsers(userData.length);
    };
    getData();
  }, []);

  switch (type) {
    case "user":
      data = {
        title: "STAFF",
        numbers: users,
        titleLink: "See all staff",
        link: "/admin/users",
        icon: (
          <PersonOutlineOutlinedIcon
            className={cx("icon")}
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 255, .2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "STORES",
        numbers: "10.5k $",
        titleLink: "See details",
        link: "/admin/dashboard/statistical/store",
        icon: (
          <StoreMallDirectoryIcon
            className={cx("icon")}
            style={{
              color: "goldenrod",
              backgroundColor: "rgba(218, 165, 32, .2)",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "FACTORIES",
        numbers: "5k",
        titleLink: "See details",
        link: "/admin/dashboard/statistical/factory",
        icon: (
          <FactoryIcon
            className={cx("icon")}
            style={{
              color: "purple",
              backgroundColor: "rgba(128, 0, 128, .2)",
            }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "WARRANTIES",
        numbers: "500",
        titleLink: "See details",
        link: "/admin/dashboard/statistical/warranty",
        icon: (
          <MiscellaneousServicesIcon
            className={cx("icon")}
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 255, .2)",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className={cx("widget")}>
      <div className={cx("left")}>
        <span className={cx("title")}>{data.title}</span>
        <span className={cx("counter")}>{data.numbers}</span>
        <Link to={data.link} className={cx("link")}>
          {data.titleLink}
        </Link>
      </div>
      <div className={cx("right")}>
        <div className={cx("percentage", "positive")}>
          <KeyboardArrowUpOutlinedIcon />
          <span>20 %</span>
        </div>
        {data.icon}
      </div>
    </div>
  );
}

export default Widget;
