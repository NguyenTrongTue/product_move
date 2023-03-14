import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Detail.module.scss";
import { Link, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import httpRequest, { category } from "~/api/httpRequest";
import formatDate from "~/util/formatDate";
import images from "~/assets/images";

const cx = classNames.bind(styles);

const Detail = () => {
  const [order, setOrder] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      const data = await httpRequest.getDetail(category.orders, id);
      const products = await httpRequest.getAll(category.products);

      const product = products.find(
        (product) => product.productCode === data.productCode
      );
      const order = {
        ...data,
        productName: product.name,
        productImage: product.images[0],
        chip: product.chip,
        ram: product.ram,
        pin: product.pin,
        screen: product.screen,
        camera: product.camera,
      };
      setOrder(order);
    };
    getData();
  }, [id]);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <div className={cx("nav")}>
          <Link to="/store/orders" className={cx("icon")}>
            <ArrowBackIcon />
          </Link>
          <span>Orders #{id}</span>
        </div>
        <span className={cx("fulfill")}>Fulfill order</span>
      </div>
      {order && <span className={cx("status")}>{order.status}</span>}
      {order && (
        <div className={cx("container")}>
 <div className={cx('wrapperContent')}>
            <div className={cx("overview")}>
              <div className={cx("overviewHeader")}>
                <span className={cx("title")}>Overview</span>
  
                <span className={cx("time")}>{formatDate(order.createdAt)}</span>
              </div>
              <div className={cx("content")}>
                <div className={cx("contentHeader")}>
                  <span className={cx("detailLabel")}>Product details</span>
                  <span className={cx("contentTitle")}>Price</span>
                  <span className={cx("contentTitle")}>Quantity</span>
                  <span className={cx("contentTitle")}>Total</span>
                </div>
                <span className={cx("detailContent")}>
                  <div className={cx("detail")}>
                    <div className={cx("productImage")}>
                      <img src={order.productImage} alt="img" />
                    </div>
                    <div className={cx("desc")}>
                      <span className={cx("name")}>{order.productName}</span>
                      <div className={cx("item")}>
                        <div className={cx("label")}>
                          <span>Chip:</span>
                        </div>
                        <span className={cx("value")}>{order.chip}</span>
                      </div>
                      <div className={cx("item")}>
                        <div className={cx("label")}>
                          <span>Ram:</span>
                        </div>
                        <span className={cx("value")}>{order.ram}</span>
                      </div>
                      <div className={cx("item")}>
                        <div className={cx("label")}>
                          <span>Pin:</span>
                        </div>
                        <span className={cx("value")}>{order.pin}</span>
                      </div>
                      <div className={cx("item")}>
                        <div className={cx("label")}>
                          <span>Sreen:</span>
                        </div>
                        <span className={cx("value")}>{order.screen}</span>
                      </div>
                      <div className={cx("item")}>
                        <div className={cx("label")}>
                          <span>Camera:</span>
                        </div>
                        <span className={cx("value")}>{order.camera}</span>
                      </div>
                    </div>
                  </div>
                  <span className={cx("price")}>${order.price}</span>
                  <span className={cx("quantity")}>{order.quantity}</span>
                  <span className={cx("total")}>${order.total}</span>
                </span>
              </div>
            </div>
 </div >
          <div className={cx("customer")}>
            <div className={cx("customerHeader")}>
              <span className={cx("title")}>Customer</span>
            </div>

            <div className={cx("customerContent")}>
              <div className={cx("avatar")}>
                <img src={images.avatar} alt="avatar" />
              </div>
              <div>
                <div className={cx("customerItem")}>
                  <div className={cx("customerLabel")}>
                    <span>Full Name:</span>
                  </div>
                  <span className={cx("customerName")}>{order.fullName}</span>
                </div>
                <div className={cx("customerItem")}>
                  <div className={cx("customerLabel")}>
                    <span>Phone: </span>
                  </div>
                  <span className={cx("customerValue")}>
                    {order.customerPhone}
                  </span>
                </div>
                <div className={cx("customerItem")}>
                  <div className={cx("customerLabel")}>
                    <span>Address: </span>
                  </div>
                  <span className={cx("customerValue")}>
                    {order.customerAddress}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
