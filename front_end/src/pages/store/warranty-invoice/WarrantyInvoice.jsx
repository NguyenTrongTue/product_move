import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./WarrantyInvoice.module.scss";
import Datatable from "~/components/datable/Datatable";
import httpRequest, { category } from "~/api/httpRequest";

import { invoiceColumns } from "~/data/datatablesource";
import axios from "axios";

const cx = classNames.bind(styles);

const WarrantyInvoice = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const products = await httpRequest.getAll(category.products);
        const warrantyInvoices = await httpRequest.getAll(
          category.warrantyInvoice
        );
        setData(
          warrantyInvoices.map((warrantyInvoice, index) => {
            const product = products.find(
              (product) => product.productCode === warrantyInvoice.productCode
            );
            return {
              ...warrantyInvoice,
              id: index + 1,
              productName: product.name,
            };
          })
        );
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  return (
    <div>
      <Datatable
        columns={invoiceColumns}
        type={category.warrantyInvoice}
        mydata={data}
        detail
        createBtn
        page="store"
        linkCreate="/store/warranty_invoice/create"
      />
    </div>
  );
};

export default WarrantyInvoice;
