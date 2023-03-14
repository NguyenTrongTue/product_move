import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Chart.module.scss";
import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  ResponsiveContainer,
} from "recharts";
import { month, quarter, year } from "~/data/datachart";
import { useEffect } from "react";

const cx = classNames.bind(styles);

function Chart({ aspect, title }) {
  const [data, setData] = useState(month);
  const [select, setSelect] = useState("month");
  useEffect(() => {
    switch (select) {
      case "month":
        setData(month);
        break;
      case "quarter":
        setData(quarter);
        break;
      default:
        setData(year);
        break;
    }
  }, [select]);

  return (
    <div className={cx("chart")}>
      <div className={cx("header")}>
        <div className={cx("title")}>{`Last ${data.length} ${
          select === "month"
            ? "month"
            : select === "quarter"
            ? "quarter"
            : "year"
        } revenue`}</div>
        <div className={cx("field")}>
          <div className={cx("label")}>According to</div>
          <select
            required
            onChange={(e) => setSelect(e.target.value)}
            value={select}
          >
            <option value="month">Month</option>
            <option value="quarter">Quarter</option>
            <option value="year">Year</option>
          </select>
        </div>
      </div>
      <ResponsiveContainer width="100%" aspect={aspect || 2 / 1}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" color="gray" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" className={cx("chart-grid")} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;
