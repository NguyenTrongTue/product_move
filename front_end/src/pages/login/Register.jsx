import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import images from "~/assets/images";

import classNames from "classnames/bind";
import styles from "./Register.module.scss";
import httpRequest from "~/api/httpRequest";
import { useDispatch } from "react-redux";
import { login } from "~/store/userSlice";
import { hideToast, fadeToast } from "~/store/toastSlice";
const cx = classNames.bind(styles);

const Login = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
        username.trim() &&
        password.length >= 6
    );
  }, [username, password, fullName, address, email, phone]);

  const handleLogin = async () => {
    const data = {
      fullName,
      email,
      phone,
      address,
      username,
      password,
    };

    const url = "auth/register";
    const user = await httpRequest.postData(url, data);
    dispatch(login(user));
    const type = "success";
    const title = "Successful signup!";
    const fade = true;
    dispatch(fadeToast({ type, title, fade }));
    navigate("/admin/dashboard");
    setTimeout(() => {
      dispatch(hideToast(false));
    }, 4000);
  };

  return (
    <>
      <div className={cx("login")}>
        <div
          className={cx("login__bg")}
          style={{ backgroundImage: `url(${images.bg})` }}
        >
          <div className={cx("login__content")}>
            <Link to="/" className={cx("logo")}>
              <img src={images.logo} alt="" />
              <span>BigCorp</span>
            </Link>
            <div className={cx("title")}>Log in to BigCorp</div>
            <div className={cx("login-email")}>
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
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className={cx("btn__submit", `${!isValid ? "disabled" : ""}`)}
                onClick={handleLogin}
              >
                Sign up
              </button>
            </div>

            <div className={cx("login__content__dnt-have-acc")}>
              <span>
                You have an account? <Link to="/login">Sign in</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
