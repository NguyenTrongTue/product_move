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
  const [firstName, setFirstName] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [productCode, setProductCode] = useState("");
  const [quantity, setQuantity] = useState("");
  const [status, setStatus] = useState("");
  const [gender, setGender] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    const fullName = firstName + " " + lastName;
    try {
      const data = {
        customerNumber: customerId,
        fullName,
        customerAddress: address,
        customerPhone: phone,
        productCode,
        quantity,
        status,
        storeCode: "s_btl",
      };
      const url = "store/order/create";
      await httpRequest.postData(url, data);

      const _type = "success";
      const title = "Create order successfully!";
      const fade = true;
      dispatch(fadeToast({ type: _type, title, fade }));

      navigate("/store/orders");

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
        <Link to="/store/orders" className={cx("icon")}>
          <ArrowBackIcon />
        </Link>
        <span>Create Invoice</span>
      </div>
      <div className={cx("container")}>
        <div className={cx("header")}>
          <span className={cx("titleHeader")}>Store</span>
          <span className={cx("addressStore")}>Bac Tu Liem, Ha Noi</span>
        </div>

        <div className={cx("content")}>
          {/* Thong tin khách hàng*/}
          <span className={cx("title")}>Customer Details</span>
          <div className={cx("fields")}>
            <div className={cx("field")}>
              <span className={cx("label")}>Customer ID *</span>
              <input
                type="text"
                className={cx("formItem")}
                placeholder="ID"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
              />
            </div>
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
              <span className={cx("label")}>Phone *</span>
              <input
                type="text"
                className={cx("formItem")}
                placeholder="Phone number"
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

          {/* Thong tin san pham*/}
          <span className={cx("title")}>Product Details</span>
          <div className={cx("fields")}>
            <div className={cx("field")}>
              <span className={cx("label")}>Product code *</span>
              <input
                type="text"
                className={cx("formItem")}
                placeholder="Product code"
                value={productCode}
                onChange={(e) => setProductCode(e.target.value)}
              />
            </div>
            <div className={cx("field")}>
              <span className={cx("label")}>Quantity *</span>
              <input
                type="text"
                className={cx("formItem")}
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className={cx("field")}>
              <span className={cx("label")}>Status *</span>
              <select
                required
                onChange={(e) => setStatus(e.target.value)}
                value={status}
              >
                <option disabled value="">
                  Select status
                </option>
                <option value="installment">Installment</option>
                <option value="paid">Paid</option>
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
