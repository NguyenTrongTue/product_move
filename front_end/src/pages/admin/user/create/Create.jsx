import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Create.module.scss";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import httpRequest from "~/api/httpRequest";
import { useDispatch } from "react-redux";
import { hideToast, fadeToast } from "~/store/toastSlice";
const cx = classNames.bind(styles);

const Create = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");
  const [password, setPassword] = useState("");
  const [addressCode, setAddressCode] = useState("");
  const [gender, setGender] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    const fullName = firstName + " " + lastName;

    try {
      const data = {
        fullName,
        address,
        phone,
        username,
        password,
        isManager: +position,
        addressCode,
        email,
      };
      const url = "/users/create";
      await httpRequest.postData(url, data);

      const type = "success";
      const title = "Create user successfully!";
      const fade = true;
      dispatch(fadeToast({ type, title, fade }));

      navigate("/admin/users");

      setTimeout(() => {
        dispatch(hideToast(false));
      }, 4000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("nav")}>
        <Link to="/admin/users" className={cx("icon")}>
          <ArrowBackIcon />
        </Link>
        <span>Create Staff</span>
      </div>
      <div className={cx("container")}>
        <div className={cx("header")}>
          <span className={cx("titleHeader")}>Overview</span>
          <span className={cx("addressStore")}>
            {new Date().toLocaleDateString()}
          </span>
        </div>

        <div className={cx("content")}>
          <span className={cx("title")}>Staff Details</span>
          <div className={cx("fields")}>
            <div className={cx("field")}>
              <span className={cx("label")}>First Name *</span>
              <input
                type="text"
                className={cx("formItem")}
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className={cx("field")}>
              <span className={cx("label")}>Last name *</span>
              <input
                type="text"
                className={cx("formItem")}
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className={cx("field")}>
              <span className={cx("label")}>Username *</span>
              <input
                type="text"
                className={cx("formItem")}
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className={cx("field")}>
              <span className={cx("label")}>Email *</span>
              <input
                type="email"
                className={cx("formItem")}
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={cx("field")}>
              <span className={cx("label")}>Phone *</span>
              <input
                type="text"
                className={cx("formItem")}
                placeholder="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className={cx("field")}>
              <span className={cx("label")}>Address *</span>
              <input
                type="text"
                className={cx("formItem")}
                placeholder="District - City"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className={cx("field")}>
              <span className={cx("label")}>Password *</span>
              <input
                type="password"
                className={cx("formItem")}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className={cx("field")}>
              <span className={cx("label")}>Address code *</span>
              <input
                type="text"
                className={cx("formItem")}
                placeholder="Address code"
                value={addressCode}
                onChange={(e) => setAddressCode(e.target.value)}
              />
            </div>
            <div className={cx("field")}>
              <span className={cx("label")}>Postion *</span>
              <select
                required
                onChange={(e) => setPosition(e.target.value)}
                value={position}
              >
                <option disabled value="" className={cx("selectField")}>
                  Select position
                </option>
                <option value="1">Manager</option>
                <option value="0">Staff</option>
              </select>
            </div>
            <div className={cx("field")}>
              <span className={cx("label")}>Gender</span>
              <select
                required
                onChange={(e) => setGender(e.target.value)}
                value={gender}
              >
                <option disabled value="" className={cx("selectField")}>
                  Select gender
                </option>
                <option>Male</option>
                <option>Female</option>
                <option>Others</option>
              </select>
            </div>
          </div>
          <button className={cx("btn")} onClick={handleSubmit}>
            <span className={cx("btnText")}>Send</span>
            <i className="uil uil-navigator"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Create;
