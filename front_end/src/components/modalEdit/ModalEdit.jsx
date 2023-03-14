import React, { useRef, useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import classNames from "classnames/bind";
import styles from "./ModalEdit.module.scss";
import { useSelector } from "react-redux";
import httpRequest from "~/api/httpRequest";
import { useDispatch } from "react-redux";
import { hideToast, fadeToast } from "~/store/toastSlice";
import { update } from "~/store/userSlice";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function ModalEdit({ setModal, user }) {
  const [fullName, setFullName] = useState(user.fullName);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [address, setAddress] = useState(user.address);
  const [username, setUsername] = useState(user.username);
  const [isValid, setIsValid] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    setIsValid(
      regex.test(email) &&
        phone.trim() &&
        fullName.trim() &&
        address.trim() &&
        username.trim()
    );
  }, [username, fullName, address, email, phone]);

  const handleUpdate = async () => {
    try {
      const data = {
        fullName,
        email,
        phone,
        address,
        username,
      };

      const url = `users/update/${user._id}`;
      await httpRequest.putData(url, data);

      const type = "success";
      const title = "Employee update successful!";
      const fade = true;
      dispatch(fadeToast({ type, title, fade }));
      dispatch(update(data));
      navigate("/admin/users");
      setModal(false);

      setTimeout(() => {
        dispatch(hideToast(false));
      }, 4000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={cx("container")}>
      <div className={cx("wrapper")}>
        <div className={cx("header")}>
          <div className={cx("title")}>Edit Employee</div>
          <div className={cx("icon")} onClick={() => setModal(false)}>
            <CloseIcon />
          </div>
        </div>
        <div className={cx("content")}>
          <input
            type="text"
            placeholder="Fullname"
            autoFocus
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Address"
            autoFocus
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="email"
            placeholder="Phone"
            autoFocus
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="text"
            placeholder="Username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className={cx("btn")}>
            <button
              className={cx(
                "btn__submit",
                "save",
                `${!isValid ? "disabled" : ""}`
              )}
              onClick={handleUpdate}
            >
              Save
            </button>
            <button
              className={cx("btn__submit", "close")}
              onClick={() => setModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalEdit;
