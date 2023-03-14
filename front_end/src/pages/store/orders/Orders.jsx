import React, { useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Orders.module.scss";
import Datatable from "~/components/datable/Datatable";
import httpRequest, { category } from "~/api/httpRequest";
import { orderColumns } from "~/data/datatablesource";
import { useState } from "react";
import formatDate from "~/util/formatDate";

const cx = classNames.bind(styles);

const Orders = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const orders = await httpRequest.getAll(category.orders);
        const products = await httpRequest.getAll(category.products);

        setData(
          orders.map((order, index) => {
            const product = products.find(
              (product) => product.productCode === order.productCode
            );
            return {
              ...order,
              id: index + 1,
              createdAt: formatDate(order.createdAt),
              productName: product.name,
              productImage: product.images[0],
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
        columns={orderColumns}
        type={category.orders}
        createBtn
        detail
        mydata={data}
        linkCreate="/store/orders/create"
        page='store'
      />
    </div>
  );
};

export default Orders;
