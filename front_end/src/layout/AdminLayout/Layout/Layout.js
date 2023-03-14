import PropTypes from "prop-types";

import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import FactoryIcon from "@mui/icons-material/Factory";
import StoreMallDirectoryIcon from "@mui/icons-material/StoreMallDirectory";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import NavBar from "../../components/navBar/Navbar";
import SideBar from "../../components/sideBar/SideBar";
import '~/layout/scss/Layout.scss';

function Layout({ children }) {
  const lists = [
    { to: "/admin/users", title: "Staff", icon: PersonOutlinedIcon },
    { to: "/admin/products", title: "Product", icon: Inventory2Icon },
    { to: "/admin/factories", title: "Factory", icon: FactoryIcon },
    { to: "/admin/stores", title: "Store", icon: StoreMallDirectoryIcon },
    {
      to: "/admin/warranties",
      title: "Warranty",
      icon: MiscellaneousServicesIcon,
    },
  ];
  return (
    <div className="wrapper">
      <SideBar lists={lists} dashboard={"/admin/dashboard"} />
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
