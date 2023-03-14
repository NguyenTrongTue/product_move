import React from "react";
import classNames from "classnames/bind";
import styles from "./NotFound.module.scss";
const cx = classNames.bind(styles);

function NotFound() {
  return (
    <div className={cx("container")}>
      <div className={cx("code")}>404</div>
      <div>Couldn't find this page</div>
    </div>
  );
}

export default NotFound;
