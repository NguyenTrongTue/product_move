import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Detail.module.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import httpRequest, { category } from "~/api/httpRequest";
import formatDate from "~/util/formatDate";
import { useDispatch } from "react-redux";
import { hideToast, fadeToast } from "~/store/toastSlice";
const cx = classNames.bind(styles);

const Detail = () => {
  const [product, setProduct] = useState();
  const { id } = useParams();
  const [price, setPrice] = useState("");
  const [chip, setChip] = useState("");
  const [ram, setRam] = useState("");
  const [camera, setCamera] = useState("");
  const [pin, setPin] = useState("");
  const [screen, setScreen] = useState("");
  const [capacity, setCapacity] = useState("");

  const [image, setImage] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      const data = await httpRequest.getDetail(category.products, id);
      const product = {
        ...data,
        productImage: data.images[0],
      };
      setImage(product.images[0]);
      setProduct(product);
      setPrice(product.price);
      setChip(product.chip);
      setRam(product.ram);
      setCamera(product.camera);
      setPin(product.pin);
      setScreen(product.screen);
      setCapacity(product.capacity);
    };
    getData();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const data = {
        price,
        chip,
        ram,
        camera,
        screen,
        capacity,
        pin,
      };
      const url = `/products/update/${id}`;

      await httpRequest.putData(url, data);
      const type = "success";
      const title = "Update product successfully!";
      const fade = true;
      dispatch(fadeToast({ type, title, fade }));

      navigate(`/admin/products`);
      setTimeout(() => {
        dispatch(hideToast(false));
      }, 4000);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(product);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("nav")}>
        <Link to="/admin/products" className={cx("icon")}>
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
                  <input
                    type="text"
                    className={cx("liRight")}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </li>
                <li>
                  <p ul className={cx("liLeft")}>
                    Chip:{" "}
                  </p>
                  <input
                    type="text"
                    className={cx("liRight")}
                    value={chip}
                    onChange={(e) => setChip(e.target.value)}
                  />
                </li>
                <li>
                  <p ul className={cx("liLeft")}>
                    RAM:
                  </p>
                  <input
                    type="text"
                    className={cx("liRight")}
                    value={ram}
                    onChange={(e) => setRam(e.target.value)}
                  />
                </li>
                <li>
                  <p ul className={cx("liLeft")}>
                    Camera:
                  </p>
                  <input
                    type="text"
                    className={cx("liRight")}
                    value={camera}
                    onChange={(e) => setCamera(e.target.value)}
                  />
                </li>
                <li>
                  <p ul className={cx("liLeft")}>
                    Screen:
                  </p>
                  <input
                    type="text"
                    className={cx("liRight")}
                    value={screen}
                    onChange={(e) => setScreen(e.target.value)}
                  />
                </li>
                <li>
                  <p ul className={cx("liLeft")}>
                    Storage capacity:
                  </p>
                  <input
                    type="text"
                    className={cx("liRight")}
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                  />
                </li>
                <li>
                  <p ul className={cx("liLeft")}>
                    PIN:
                  </p>
                  <input
                    type="text"
                    className={cx("liRight")}
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                  />
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
              <div className={cx("edit")} onClick={handleUpdate}>
                UPDATE
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
