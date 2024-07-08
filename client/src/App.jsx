import {RouterProvider, createBrowserRouter} from "react-router-dom";
import {
  HomeLayout,Landing,Register,Login,DashboardLayout,Error,AddJob,AllJobs,Stats,Profile,Admin
} from "./pages"

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
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        children:[
          {
            index:true,
            element:<AddJob/>
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
