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
  const [customerId, setCustomerId] = useState("");
  const [productCode, setProductCode] = useState("");
  const [quantity, setQuantity] = useState("");
  const [errorName, setErrorName] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    try {
      const data = {
        customerNumber: customerId,
        productCode,
        quantity,
        errorName,
        storeCode: "s_btl",
        status: "Pending",
      };
      const url = "store/warranty_invoice/create";
      await httpRequest.postData(url, data);

      const _type = "success";
      const title = "Create order successfully!";
      const fade = true;
      dispatch(fadeToast({ type: _type, title, fade }));

      navigate("/store/warranty_invoice");

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
        <Link to="/store/warranty_invoice" className={cx("icon")}>
          <ArrowBackIcon />
        </Link>
        <span>Create Invoice</span>
      </div>
      <div className={cx("container")}>
        <div className={cx("header")}>
          <span className={cx("titleHeader")}>Store</span>
          <span className={cx("addressStore")}>
            {new Date().toLocaleDateString()}
          </span>
        </div>

        <div className={cx("content")}>
          <span className={cx("title")}>Warranty Invoice Details</span>
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
              <span className={cx("label")}>Error Name *</span>
              <input
                type="text"
                className={cx("formItem")}
                placeholder="Error name"
                value={errorName}
                onChange={(e) => setErrorName(e.target.value)}
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
