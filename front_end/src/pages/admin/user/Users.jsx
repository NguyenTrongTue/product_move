import React from "react";

import Datatable from "~/components/datable/Datatable";
import { userColumns } from "~/data/datatablesource";
import { category } from "~/api/httpRequest";

import classNames from "classnames/bind";
import styles from "./Users.module.scss";

const cx = classNames.bind(styles);

const Users = () => {
  return (
    <Datatable
      columns={userColumns}
      type={category.users}
      detail
      page={"admin"}
      linkCreate="/admin/users/create"
    />
  );
};

export default Users;
