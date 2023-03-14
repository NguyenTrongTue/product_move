import React from "react";
import classNames from "classnames/bind";
import styles from "./Featured.module.scss";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

const cx = classNames.bind(styles);

function Featured() {
  return (
    <div className={cx("featured")}>
      <div className={cx("top")}>
        <h1 className={cx("title")}>Total Revenue</h1>
        <MoreVertOutlinedIcon />
      </div>
      <div className={cx("bottom")}>
        <div className={cx("featured-chart")}>
          <CircularProgressbar value={80} text={"80%"} strokeWidth={5} />
        </div>
        <p className={cx("title")}>Total sales made today</p>
        <p className={cx("amount")}>$15000</p>
        <p className={cx("desc")}>
          Previous transactions processing. Last payments may not be included.
        </p>
        <div className={cx("sumary")}>
          <div className={cx("item")}>
            <div className={cx("item-title")}>Target</div>
            <div className={cx("item-result", "negative")}>
              <KeyboardArrowDownOutlinedIcon fontSize="small" />
              <div className={cx("result-amount")}>$15k</div>
            </div>
          </div>
          <div className={cx("item")}>
            <div className={cx("item-title")}>Last Week</div>
            <div className={cx("item-result", "positive")}>
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className={cx("result-amount")}>$15k</div>
            </div>
          </div>
          <div className={cx("item")}>
            <div className={cx("item-title")}>Last Month</div>
            <div className={cx("item-result", "positive")}>
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className={cx("result-amount")}>$15k</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Featured;
