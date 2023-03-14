import React from "react";

import Widget from "../../../components/widget/Widget";
import Featured from "../../../components/featured/Featured";
import Chart from "../../../components/chart/Chart";
import classNames from "classnames/bind";
import styles from "./AdminHome.module.scss";
import Table from "../../../components/table/Table";

const cx = classNames.bind(styles);

function AdminHome() {
  return (
    <>
      <div className={cx("widgets")}>
        <Widget type="user" />
        <Widget type="order" />
        <Widget type="earning" />
        <Widget type="balance" />
      </div>
      <div className={cx("charts")}>
        <Featured />
        <Chart aspect={2 / 1} title="Last 6 months Revenue" />
      </div>

    </>
  );
}

export default AdminHome;
