import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Detail.module.scss";
import { Link, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import httpRequest, { category } from "~/api/httpRequest";
import formatDate from "~/util/formatDate";

const cx = classNames.bind(styles);

const Detail = () => {
  const [product, setProduct] = useState();
  const { id } = useParams();

  const [image, setImage] = useState();

  useEffect(() => {
    const getData = async () => {
      const data = await httpRequest.getDetail(category.products, id);
      const product = {
        ...data,
        productImage: data.images[0],
      };
      setProduct(product);
      setImage(product.images[0]);
    };
    getData();
  }, [id]);

  console.log(product);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("nav")}>
        <Link to="/store/products" className={cx("icon")}>
          <ArrowBackIcon />
        </Link>
        <span>Product #{id}</span>
      </div>
      {product && (
        <div className={cx("container")}>
          <div className={cx("header")}>
            <span className={cx("titleHeader")}>Overview</span>
            <span className={cx("time")}>{formatDate(product.createdAt)}</span>
          </div>

          <div className={cx("content")}>
            <div className={cx("contentLeft")}>
              <div className={cx("imgContainer")}>
                <img src={image} alt="Error" />
              </div>
              <div className={cx("hoverContainer")}>
                {product.images.map((image, index) => {
                  return (
                    <div key={index} onClick={() => setImage(image)}>
                      <img src={image} alt="" />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={cx("contentRight")}>
              <span className={cx("productName")}>{product.name}</span>
              <ul className={cx("parameterList")}>
                <li>
                  <p ul className={cx("liLeft")}>
                    Product line:{" "}
                  </p>
                  <p ul className={cx("liRight")}>
                    {product.productLine}
                  </p>
                </li>
                <li>
                  <p ul className={cx("liLeft")}>
                    Product code:
                  </p>
                  <p ul className={cx("liRight")}>
                    {product.productCode}
                  </p>
                </li>
                <li>
                  <p ul className={cx("liLeft")}>
                    Price:
                  </p>
                  <p ul className={cx("liRight")}>
                    {product.price}$
                  </p>
                </li>
                <li>
                  <p ul className={cx("liLeft")}>
                    Chip:{" "}
                  </p>
                  <p ul className={cx("liRight")}>
                    {product.chip}
                  </p>
                </li>
                <li>
                  <p ul className={cx("liLeft")}>
                    RAM:
                  </p>
                  <p ul className={cx("liRight")}>
                    {product.ram}
                  </p>
                </li>
                <li>
                  <p ul className={cx("liLeft")}>
                    Camera:
                  </p>
                  <p ul className={cx("liRight")}>
                    {product.camera}
                  </p>
                </li>
                <li>
                  <p ul className={cx("liLeft")}>
                    Display:{" "}
                  </p>
                  <p ul className={cx("liRight")}>
                    {product.screen}" 2k
                  </p>
                </li>
                <li>
                  <p ul className={cx("liLeft")}>
                    Storage capacity:
                  </p>
                  <p ul className={cx("liRight")}>
                    {product.capacity}
                  </p>
                </li>
                <li>
                  <p ul className={cx("liLeft")}>
                    SIM:
                  </p>
                  <p ul className={cx("liRight")}>
                    1 Nano SIM & 1 eSIM support 5G
                  </p>
                </li>
                <li>
                  <p ul className={cx("liLeft")}>
                    Warranty period :
                  </p>
                  <p ul className={cx("liRight")}>
                    {product.warrantyPeriod} month
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
