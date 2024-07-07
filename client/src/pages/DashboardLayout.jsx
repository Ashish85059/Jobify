import React, { createContext, useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import Wrapper from "../assets/wrappers/Dashboard";
import { SmallSidebar, BigSidebar, Navbar } from "../components";

const DashboardContext = createContext();

const DashboardLayout = () => {
  const user = { name: "John" };
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleDarkTheme = () => {
    console.log("Toggle dark theme");
  };

  const toggleSidebar = () => {
    // console.log("Clicked")
    setShowSidebar(!showSidebar);
  };

  const logoutUser = async () => {
    console.log("Logout user");
  };

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              <Outlet />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = ()=>useContext(DashboardContext)

export default DashboardLayout;
