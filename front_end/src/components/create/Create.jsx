import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Create.module.scss";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { useDispatch } from "react-redux";
import { hideToast, fadeToast } from "~/store/toastSlice";
import { productInputs } from "~/data/formSource";
const cx = classNames.bind(styles);

const Create = () => {
  const [input, setInput] = useState({});
  const [images, setImages] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(input);

  const handleSubmit = async () => {
    try {
      const newProduct = {
        ...input,
      };

      if (images) {
        const data = new FormData();
        var fileName = Date.now() + images.name;
        data.append("name", fileName);
        data.append("file", images);
        try {
          await axios.post(`/admin/upload/image`, data);
        } catch (error) {
          console.log(error);
        }
      }
      newProduct.image = [fileName];

      console.log(newProduct);

      const url = "/products/create";
      await axios.post(url, newProduct);

      const type = "success";
      const title = "Create product successfully!";
      const fade = true;
      dispatch(fadeToast({ type, title, fade }));

      navigate("/admin/products");
      setTimeout(() => {
        dispatch(hideToast(false));
      }, 4000);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChooseImage = async (e) => {
    setImages(e.target.files[0]);
  };

  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  console.log(input);

  const handleChange = (e) => {
    switch (e.target.type) {
      case "text":
        handleChangeInput(e);
        break;
      default:
        handleChooseImage(e);
        break;
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("nav")}>
        <Link to="/admin/products" className={cx("icon")}>
          <ArrowBackIcon />
        </Link>
        <span>Create New Product</span>
      </div>
      <div className={cx("container")}>
        <div className={cx("header")}>
          <span className={cx("titleHeader")}>Overview</span>
          <span className={cx("addressStore")}>
            {new Date().toLocaleDateString()}
          </span>
        </div>

        <div className={cx("content")}>
          <span className={cx("title")}>Product Details</span>
          <div className={cx("fields")}>
            {productInputs.map((item, index) => {
              return (
                <div className={cx("field")} key={index}>
                  <span className={cx("label")}>{item.label}</span>
                  <input
                    type={item.type}
                    name={item.name}
                    className={cx("formItem")}
                    onChange={handleChange}
                  />
                </div>
              );
            })}
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
