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
  const { id } = useParams();
  const [isSendToWarranty, setIsSendToWarranty] = useState(false);
  const [isReturnToCustomer, setIsReturnToCustomer] = useState(false);

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
      setIsSendToWarranty(
        invoice.status === "Pending" &&
          invoice.description !== "Transferred to the warranty"
      );
      setIsReturnToCustomer(
        (invoice.status === "Successful" || invoice.status === "Failure") &&
          invoice.description !== "Delivered warranty products to customers" &&
          invoice.description !== "Delivered new products to customers"
      );

      setInvoice(invoice);
    };
    getData();
  }, [id]);

  const handleReturnToCustomer = async () => {
    const url = `/store/warranty_invoice/return/customer/${id}`;
    await httpRequest.putData(url);
    navigate("/store/warranty_invoice");
  };
  const handleSendToWarranty = async () => {
    const url = `/store/warranty_invoice/return/product/${id}`;
    await httpRequest.putData(url);
    navigate("/store/warranty_invoice");
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("nav")}>
        <Link to="/store/warranty_invoice" className={cx("icon")}>
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
            {isReturnToCustomer && (
              <button className={cx("btn")} onClick={handleReturnToCustomer}>
                Return to customer
              </button>
            )}
            {isSendToWarranty && (
              <button className={cx("btn")} onClick={handleSendToWarranty}>
                Send to the Warranty
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
