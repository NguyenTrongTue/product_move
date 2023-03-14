import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Warehouse.module.scss";
import Datatable from "~/components/datable/Datatable";
import httpRequest, { category } from "~/api/httpRequest";
import { factoryWarehousesColumns } from "~/data/datatablesource";

const cx = classNames.bind(styles);

const Warehouse = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const url = "factory/" + category.storeWarehouse + "/product";
        const warehouses = await httpRequest.getStoreWarehouse(url);
        const products = await httpRequest.getAll(category.products);

        setData(
          warehouses.map((warehouse, index) => {
            const product = products.find(
              (product) => product.productCode === warehouse.productCode
            );
            return {
              ...warehouse,
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
        columns={factoryWarehousesColumns}
        type={category.storeWarehouse}
        mydata={data}
        hideAction
      />
    </div>
  );
};

export default Warehouse;
