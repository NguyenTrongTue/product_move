import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import classNames from "classnames/bind";
import styles from "./Datatable.module.scss";
import { Link } from "react-router-dom";
import httpRequest from "~/api/httpRequest";
import formatDate from "~/util/formatDate";
import { useDispatch } from "react-redux";
import { hideToast, fadeToast } from "~/store/toastSlice";
const cx = classNames.bind(styles);

function Datatable({
  columns,
  type,
  linkCreate,
  detail,
  mydata,
  hidedeleteBtn,
  hideAction,
  page,
}) {
  const [rows, setRows] = useState([]);
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (!mydata) {
      const getData = async () => {
        try {
          const data = await httpRequest.getAll(type);

          setRows(
            data.map((item, index) => {
              return {
                ...item,
                id: index + 1,
                createdAt: formatDate(item.createdAt),
              };
            })
          );
        } catch (e) {
          console.log(e);
        }
      };
      getData();
    } else {
      setRows(mydata);
    }
  }, [type, mydata]);

  const handleDelete = async (id) => {
    await httpRequest.delele(type, id);
    setRows(rows.filter((item) => item._id !== id));

    const _type = "success";
    const title = "You have successfully deleted!";
    const fade = true;
    dispatch(fadeToast({ type: _type, title, fade }));

    setTimeout(() => {
      dispatch(hideToast(false));
    }, 4000);
  };

  useEffect(() => {
    if (type.includes("_")) {
      const title = type.split("_");
      setTitle(
        title[0][0].toUpperCase() +
          title[0].substring(1, title[0].length) +
          " " +
          title[1][0].toUpperCase() +
          title[1].substring(1, title[1].length)
      );
    } else {
      setTitle(type[0].toUpperCase() + type.substring(1, type.length));
    }
  }, [type]);
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div className={cx("cell-action")}>
            {detail && (
              <Link
                to={`/${page}/${type}/${params.row._id}`}
                style={{ textDecoration: "none" }}
              >
                <div className={cx("view-button")}>Detail</div>
              </Link>
            )}
            {hidedeleteBtn ? (
              ""
            ) : (
              <div
                className={cx("delete-button")}
                onClick={() => handleDelete(params.row._id)}
              >
                Delete
              </div>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div className={cx("datatable")}>
      <div className={cx("header")}>
        <h3 className={cx("title")}>{title}</h3>
        {linkCreate && (
          <Link to={linkCreate}>
            <span className={cx("label")}>CREATE NEW</span>
          </Link>
        )}
      </div>
      <DataGrid
        className="data-grid"
        rows={rows}
        columns={hideAction ? columns : columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
}

export default Datatable;
