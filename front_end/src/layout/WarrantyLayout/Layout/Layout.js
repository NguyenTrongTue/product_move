import PropTypes from "prop-types";

import WarehouseIcon from "@mui/icons-material/Warehouse";
import DescriptionIcon from "@mui/icons-material/Description";

import NavBar from "../../components/navBar/Navbar";
import SideBar from "../../components/sideBar/SideBar";

function Layout({ children }) {
  const lists = [
    { to: "/warranty/warehouses", title: "Warehouse", icon: WarehouseIcon },
    {
      to: "/warranty/warranty_invoice",
      title: "Warranty Invoice",
      icon: DescriptionIcon,
    },
  ];
  return (
    <div className="wrapper">
      <SideBar lists={lists} dashboard={"/warranty/dashboard"}/>
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
