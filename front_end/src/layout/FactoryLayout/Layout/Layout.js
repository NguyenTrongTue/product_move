import PropTypes from "prop-types";

import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import NavBar from "../../components/navBar/Navbar";
import SideBar from "../../components/sideBar/SideBar";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import ReceiptIcon from "@mui/icons-material/Receipt";

function Layout({ children }) {
  const lists = [
  
    { to: "/factory/products", title: "Product", icon: Inventory2Icon },
    { to: "/factory/warehouses", title: "Warehouse", icon: WarehouseIcon },
    { to: "/factory/invoices", title: "Invoice", icon: ReceiptIcon },
  ];
  return (
    <div className="wrapper">
      <SideBar lists={lists} dashboard={"/factory/dashboard"}/>
      <div className="container">
        <NavBar />
        <div className="content">{children}</div>
      </div>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
