import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Invoice.module.scss";
import Datatable from "~/components/datable/Datatable";
import httpRequest, { category } from "~/api/httpRequest";
import { InvoiceColumns } from "~/data/datatablesource";
import formatDate from "~/util/formatDate";

const cx = classNames.bind(styles);

const Invoice = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const url = "factory/" + category.invoices;
        const invoices = await httpRequest.getStoreWarehouse(url);
        const products = await httpRequest.getAll(category.products);

        setData(
          invoices.map((invoice, index) => {
            const product = products.find(
              (product) => product.productCode === invoice.productCode
            );
            return {
              ...invoice,
              id: index + 1,
              productName: product.name,
              createdAt: formatDate(invoice.createdAt),
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
        columns={InvoiceColumns}
        type={category.invoices}
        mydata={data}
        hideAction
        linkCreate="/factory/invoices/create"
      />
    </div>
  );
};

export default Invoice;
