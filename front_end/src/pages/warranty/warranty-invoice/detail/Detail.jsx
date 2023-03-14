import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Detail.module.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import httpRequest, { category } from "~/api/httpRequest";
import formatDate from "~/util/formatDate";

const cx = classNames.bind(styles);

const Detail = () => {
  const [invoice, setInvoice] = useState();
  const [isReturn, setIsReturn] = useState(false);
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const data = await httpRequest.getDetail(category.warrantyInvoice, id);
      const products = await httpRequest.getAll(category.products);

      const product = products.find(
        (item) => item.productCode === data.productCode
      );
      const invoice = {
        ...data,
        productImage: product.images[0],
        productName: product.name,
      };
      setIsReturn(
        invoice.status === "Successful" ||
          invoice.status === "Failure" ||
          invoice.description !== "Transferred to the warranty"
      );
      setInvoice(invoice);
    };
    getData();
  }, [id]);

  const handleReturnToStore = async () => {
    const url = `/warranty/warranty_invoice/return/store/${id}`;
    await httpRequest.putData(url);
    navigate("/warranty/warranty_invoice");
  };
  const handleSendToFactory = async () => {
    const url = `/warranty/warranty_invoice/return/factory/${id}`;
    await httpRequest.putData(url);
    navigate("/warranty/warranty_invoice");
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("nav")}>
        <Link to="/warranty/warranty_invoice" className={cx("icon")}>
          <ArrowBackIcon />
        </Link>
        <span>
          Product #<span>{id}</span> warranty detail
        </span>
      </div>
      {invoice && (
        <div className={cx("container")}>
          <div className={cx("header")}>
            <span className={cx("titleHeader")}>Overview</span>
            <span className={cx("time")}>{formatDate(invoice.createdAt)}</span>
          </div>

          <div className={cx("content")}>
            <div className={cx("contentHeader")}>
              <span className={cx("contentTitle")}></span>
              <span className={cx("contentTitle")}>Product name</span>
              <span className={cx("contentTitle")}>Quantity</span>
              <span className={cx("contentTitle")}>Status</span>
              <span className={cx("contentTitle")}>Error name</span>
              <span className={cx("contentTitle")}>Warranty code</span>
              <span className={cx("contentTitle")}>Description</span>
              <span className={cx("contentTitle")}>Customer ID</span>
            </div>

            <span className={cx("detailContent")}>
              <div className={cx("detail")}>
                <div className={cx("productImage")}>
                  <img src={invoice.productImage} alt="img" />
                </div>
              </div>
              <div className={cx("contentValue")}>
                <span>{invoice.productName}</span>
              </div>
              <div className={cx("contentValue")}>
                <span>{invoice.quantity}</span>
              </div>
              <div className={cx("contentValue")}>
                <span>{invoice.status}</span>
              </div>
              <div className={cx("contentValue")}>
                <span>{invoice.errorName}</span>
              </div>
              <div className={cx("contentValue")}>
                <span>{invoice.warrantyCode}</span>
              </div>
              <div className={cx("contentValue")}>
                <span>{invoice.description}</span>
              </div>
              <div className={cx("contentValue")}>
                <span>{invoice.customerNumber}</span>
              </div>
            </span>
          </div>

          <div className={cx("footer")}>
            {!isReturn && (
              <button className={cx("btn")} onClick={handleReturnToStore}>
                Return product to store
              </button>
            )}
            {!isReturn && (
              <button className={cx("btn")} onClick={handleSendToFactory}>
                Return product to factory
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
