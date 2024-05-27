import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

function ShowHideNavbar({ children }) {
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(true);
  const {name,email}=useParams()
  useEffect(() => {
    if (
      location.pathname === "/login" ||
      location.pathname === "/Analyzer" ||
      location.pathname === "/Data" ||
      location.pathname === "/Analyzerlogin" ||
      location.pathname === "/profile" ||
      location.pathname === `/otp-verification/${email}`
    ) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
  }, [location]);

  return <div>{showNavbar && children}</div>;
}

export default ShowHideNavbar;
