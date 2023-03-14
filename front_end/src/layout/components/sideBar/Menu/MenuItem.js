import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import "./Menu.scss";
import "../Sidebar.scss";

function MenuItem({ title, to, icon }) {
  return (
    <NavLink
      className={(nav) => `menu-item ${nav.isActive ? "active" : ""}`}
      to={to}
    >
      <span className="icon">{icon}</span>

      <span className="title">{title}</span>
    </NavLink>
  );
}

MenuItem.proTotypes = {
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  activeIcon: PropTypes.node.isRequired,
};
export default MenuItem;
