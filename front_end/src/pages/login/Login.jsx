import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import images from "~/assets/images";

import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import httpRequest from "~/api/httpRequest";
import { login } from "~/store/userSlice";
import { useDispatch } from "react-redux";
import { hideToast, fadeToast } from "~/store/toastSlice";

const cx = classNames.bind(styles);

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    setIsValid(username.trim() && password.length >= 6);
  }, [username, password]);

  const handleLogin = async () => {
    try {
      const data = {
        username,
        password,
      };

      const url = "auth/login";
      const user = await httpRequest.postData(url, data);
      dispatch(login(user));

      const type = "success";
      const title = "Successful login!";
      const fade = true;
      dispatch(fadeToast({ type, title, fade }));
      switch (user.addressCode[0]) {
        case "s":
          navigate("/store/dashboard");
          break;
        case "f":
          navigate("/factory/dashboard");
          break;
        case "w":
          navigate("/warranty/dashboard");
          break;
        default:
          navigate("/admin/dashboard");
          break;
      }

      setTimeout(() => {
        dispatch(hideToast(false));
      }, 4000);
    } catch (err) {
      console.log(err);
    }
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
                Login
              </button>
            </div>

            <div className={cx("login__content__dnt-have-acc")}>
              <span>
                Don't have account? <Link to="/register">Sign up</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
