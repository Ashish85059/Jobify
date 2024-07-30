import {RouterProvider, createBrowserRouter} from "react-router-dom";
import {
  HomeLayout,Landing,Register,Login,DashboardLayout,Error,AddJob,AllJobs,Stats,Profile,Admin
} from "./pages"

import {action as registerAction} from  "./pages/Register.jsx"
import {action as loginAction} from  "./pages/Login.jsx"
import { loader as dashboardLoader } from "./pages/DashboardLayout.jsx";
import { action as addJobAction } from "./pages/AddJob.jsx";

export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme); // adds class dark-theme to body of document
  return isDarkTheme;
};

checkDefaultTheme();

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement:<Error/>,
    children: [
      {
        index:true,
        element: <Landing />,
      },
      {
        path: "register",
        element: <Register />,
        action:registerAction
      },
      {
        path: "login",
        element: <Login />,
        action:loginAction
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        loader:dashboardLoader,
        children:[
          {
            index:true,
            element:<AddJob/>,
            action:addJobAction
          },
          {
            path:"stats",
            element:<Stats/>
          },
          {
            path:"all-jobs",
            element:<AllJobs/>
          },
          {
            path:"profile",
            element:<Profile/>
          },
          {
            path:"admin",
            element:<Admin/>
          },
        ]
      },
    ],
  },
]);


function App() {

  return <RouterProvider router={router}/>
}

export default App
