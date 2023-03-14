import React, { useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import "./Toast.scss";

function Toast({ title, icon, type }) {
  const [toast, setToast] = useState(null);
  useEffect(() => {
    var toast = document.querySelector(".toast");
    setToast(toast);
  }, []);
  setTimeout(() => {
    if (toast) {
      toast.style.animation = "hide_slide 1s ease forwards";
    }
  }, 2000);
  return (
    <div className={`toast ${type}`}>
      <div className="icon">
        <CheckCircleIcon />
      </div>
      <div className="title">{title}</div>
    </div>
  );
}

export default Toast;
