import React, { useEffect, useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faBars,
//   faHome,
//   faQuestionCircle,
//   faUser,
// } from "@fortawesome/free-solid-svg-icons";

function Sidebar() {
  //   const location = useLocation(); // Get current route
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    var r = document.querySelector(":root");
    r.style.setProperty("--sideBarWidth", "100px");
  }, []);

  const toggleExpand = () => {
    setExpanded(!expanded);
    var r = document.querySelector(":root");
    if (expanded) {
      r.style.setProperty("--sideBarWidth", "200px");
    } else {
      r.style.setProperty("--sideBarWidth", "100px");
    }
    console.log(expanded);
  };

  return (
    <aside className={`sidebar${expanded ? "-expanded" : ""}`}>
      {/* <button className="sidebar-btn" onClick={toggleExpand}>
        <FontAwesomeI
        con icon={faBars} />
      </button> */}
      <div>Test</div>
      {/* <Link
        to="/"
        className={`btn sidebar-btn ${
          location.pathname === "/" ? "selected" : ""
        }`}
      >
        <div
          className={`sibebar-section ${
            location.pathname === "/" ? "selected" : ""
          }`}
        >
          <FontAwesomeIcon icon={faHome} />
          {!expanded && <h2 className="sidebar-text">Home</h2>}
        </div>
      </Link>

      <Link
        to="/help"
        className={`btn sidebar-btn ${
          location.pathname === "/help" ? "selected" : ""
        }`}
      >
        <div
          className={`sibebar-section ${
            location.pathname === "/help" ? "selected" : ""
          }`}
        >
          <FontAwesomeIcon icon={faQuestionCircle} />
          {!expanded && <h2 className="sidebar-text">Help</h2>}
        </div>
      </Link>

      <Link
        to="/user"
        className={`btn sidebar-btn ${
          location.pathname === "/user" ? "selected" : ""
        }`}
      >
        <div
          className={`sibebar-section ${
            location.pathname === "/user" ? "selected" : ""
          }`}
        >
          <FontAwesomeIcon icon={faUser} />
          {!expanded && <h2 className="sidebar-text">User</h2>}
        </div>
      </Link> */}
    </aside>
  );
}

export default Sidebar;
