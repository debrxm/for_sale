import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { AntDesign, FontAwesome, Ionicons } from "react-web-vector-icons";
import { colors } from "../../../constants/Colors";

import "./styles.scss";

const Navbar = ({
  collapsSidebar,
  sidebarCollapsed,
  dropdownVisible,
  setDropdownVisible,
}) => {
  const currentUser = useSelector(({ user }) => user.currentUser);
  const history = useHistory();
  return (
    <nav className="flex-vertical-center admin-navbar">
      <div className="toggler">
        {!sidebarCollapsed ? (
          <div
            className="menu-holder"
            onClick={() => collapsSidebar(!sidebarCollapsed)}
          >
            <AntDesign name="menu-unfold" size={25} color="black" />
          </div>
        ) : (
          <div
            className="menu-holder"
            onClick={() => collapsSidebar(!sidebarCollapsed)}
          >
            <AntDesign name="menu-fold" size={25} color="black" />
          </div>
        )}
      </div>
      <div className="notification-user">
        <div
          className="notification"
          onClick={() => {
            history.push("notifications");
          }}
        >
          <Ionicons name="md-notifications" size={30} color={colors.black} />
          <span className="notification-count">{0}</span>
        </div>
        <div
          className="user"
          onClick={() => setDropdownVisible(!dropdownVisible)}
        >
          <div className="avatar-container">
            <FontAwesome name="user-circle" size={28} color="black" />
          </div>
          <div>
            <h5 style={{ textTransform: "capitalize" }}>{currentUser.role}</h5>
            <span>{`${currentUser.name.split(" ")[0]}`}</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
