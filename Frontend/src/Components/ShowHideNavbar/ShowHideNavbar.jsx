import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function ShowHideNavbar({ children }) {
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    if (location.pathname === '/login' || location.pathname ==='/Analyzer' || location.pathname === '/Data' || location.pathname === '/Analyzerlogin') {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
  }, [location]);

  return <div>{showNavbar && children}</div>;
}

export default ShowHideNavbar;
