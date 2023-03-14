import PropTypes from "prop-types";

import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import DescriptionIcon from "@mui/icons-material/Description";
import ListAltIcon from "@mui/icons-material/ListAlt";

import NavBar from "../../components/navBar/Navbar";
import SideBar from "../../components/sideBar/SideBar";

function Layout({ children }) {
  const lists = [
    { to: "/store/customers", title: "Customer", icon: PersonOutlinedIcon },
    { to: "/store/orders", title: "Orders", icon: ListAltIcon },
    { to: "/store/products", title: "Product", icon: Inventory2Icon },
    { to: "/store/warehouses", title: "Warehouse", icon: WarehouseIcon },
    {
      to: "/store/warranty_invoice",
      title: "Warranty Invoice",
      icon: DescriptionIcon,
    },
  ];
  return (
    <div className="wrapper">
      <SideBar lists={lists} dashboard={"/store/dashboard"} />
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
