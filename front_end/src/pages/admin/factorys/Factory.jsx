import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Factory.module.scss";
import Datatable from "~/components/datable/Datatable";
import httpRequest, { category } from "~/api/httpRequest";
import { factoryColumns } from "~/data/datatablesource";

const cx = classNames.bind(styles);

const Factory = () => {
  return (
    <div>
      <Datatable
        columns={factoryColumns}
        type={category.factories}
        page="admin"
        linkCreate={"/admin/factories/create"}
      />
    </div>
  );
};

export default Factory;
