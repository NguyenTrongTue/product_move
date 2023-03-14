import React from "react";

import Datatable from "~/components/datable/Datatable";
import { customerColumns } from "~/data/datatablesource";
import { category } from "~/api/httpRequest";

import classNames from "classnames/bind";
import styles from "./Customers.module.scss";

const cx = classNames.bind(styles);

const Customers = () => {
  return (
    <Datatable columns={customerColumns} type={category.customers} />
  );
};

export default Customers;
