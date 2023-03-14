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
  const [quantity, setQuantity] = useState("");
  const [inputCode, setInputCode] = useState("");
  const [outputCode, setOutputCode] = useState("");
  const [productCode, setProductCode] = useState("");
  const [type, setType] = useState("");
  const [isError, setIsError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    const _isError = isError === "error" ? true : false;
    try {
      const data = {
        quantity,
        inputCode,
        outputCode,
        productCode,
        type,
        isError: _isError,
      };
      const url =
        type === "import"
          ? `/factory/import/${outputCode}`
          : `/factory/export/${inputCode}`;
      await httpRequest.postData(url, data);

      const _type = "success";
      const title = "Create invoice successfully!";
      const fade = true;
      dispatch(fadeToast({ type: _type, title, fade }));

      navigate("/factory/invoices");

      setTimeout(() => {
        dispatch(hideToast(false));
      }, 4000);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(type);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("nav")}>
        <Link to="/factory/invoices" className={cx("icon")}>
          <ArrowBackIcon />
        </Link>
        <span>Create Invoice</span>
      </div>
      <div className={cx("container")}>
        <div className={cx("header")}>
          <span className={cx("titleHeader")}>Factory</span>
          <span className={cx("addressStore")}>
            {new Date().toLocaleDateString()}
          </span>
        </div>

        <div className={cx("content")}>
          {/* Thong tin khách hàng*/}
          <span className={cx("title")}>Invoice Details</span>
          <div className={cx("fields")}>
            <div className={cx("field")}>
              <span className={cx("label")}>Product code *</span>
              <input
                type="text"
                className={cx("formItem")}
                placeholder="code"
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
              <span className={cx("label")}>Input Code *</span>
              <input
                type="text"
                className={cx("formItem")}
                placeholder="input code"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
              />
            </div>
            <div className={cx("field")}>
              <span className={cx("label")}>Output Code *</span>
              <input
                type="text"
                className={cx("formItem")}
                placeholder="Phone number"
                value={outputCode}
                onChange={(e) => setOutputCode(e.target.value)}
              />
            </div>

            <div className={cx("field")}>
              <span className={cx("label")}>Type</span>
              <select
                required
                onChange={(e) => setType(e.target.value)}
                value={type}
              >
                <option disabled value="" className={cx("selectField")}>
                  Select type
                </option>
                <option value="import">Import</option>
                <option value="export">Export</option>
              </select>
            </div>
            <div className={cx("field")}>
              <span className={cx("label")}>Status *</span>
              <select
                required
                onChange={(e) => setIsError(e.target.value)}
                value={isError}
              >
                <option disabled value="">
                  Select shipment status
                </option>
                <option value="error">Error</option>
                <option value="normal">Normal</option>
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
