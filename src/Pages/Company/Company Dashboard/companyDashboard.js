import React from "react";
import "./companyDashboard.css";
import { useSelector } from "react-redux";



export default function CompanyDashboard() {
  const menu = useSelector((state) => state.toggleMenu);
  const titleSelection = useSelector(
    (state) => state.sidebarMenuSelectionReducer
  );
  const data = JSON.parse(sessionStorage.getItem("company_loggedin_user_data"));

  const logout = () => {
    sessionStorage.clear();
    window.location.pathname = "/";
  };

  const searchItem = useSelector((state) => state.searchBar);


  return (
    <>
      <h1>Coming Soon</h1>
    </>
  );
}
