import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Product.module.scss";
import Datatable from "~/components/datable/Datatable";
import httpRequest, { category } from "~/api/httpRequest";
import { productColumns } from "~/data/datatablesource";

const cx = classNames.bind(styles);

const Product = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const products = await httpRequest.getAll(category.products);
        setData(
          products.map((product, index) => {
            return {
              id: index + 1,
              ...product,
              productImage: product.images[0],
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

  console.log(data);

  return (
    <div>
      <Datatable
        columns={productColumns}
        type={category.products}
        detail
        mydata={data}
        page="admin"
        linkCreate={"/admin/products/create"}
      />
    </div>
  );
};

export default Product;
