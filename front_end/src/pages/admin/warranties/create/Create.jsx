import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Create.module.scss";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import httpRequest from "~/api/httpRequest";
import { useDispatch } from "react-redux";
import { hideToast, fadeToast } from "~/store/toastSlice";
const cx = classNames.bind(styles);

const Create = () => {
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const [addressCode, setAddressCode] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    try {
      const data = {
        address,
        phone,
        warrantyCode: addressCode,
        status: "Is Active",
      };
      const url = "/warranties/create";
      await httpRequest.postData(url, data);

      const type = "success";
      const title = "Create warranty successfully!";
      const fade = true;
      dispatch(fadeToast({ type, title, fade }));

      navigate("/admin/warranties");

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
        <Link to="/admin/warranties" className={cx("icon")}>
          <ArrowBackIcon />
        </Link>
        <span>Create New Warranty</span>
      </div>
      <div className={cx("container")}>
        <div className={cx("header")}>
          <span className={cx("titleHeader")}>Overview</span>
          <span className={cx("addressStore")}>
            {new Date().toLocaleDateString()}
          </span>
        </div>

        <div className={cx("content")}>
          <span className={cx("title")}>Warranty Details</span>
          <div className={cx("fields")}>
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
              <span className={cx("label")}>Address code *</span>
              <input
                type="text"
                className={cx("formItem")}
                placeholder="Warranty code"
                value={addressCode}
                onChange={(e) => setAddressCode(e.target.value)}
              />
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
