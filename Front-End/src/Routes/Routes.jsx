import { createBrowserRouter } from 'react-router-dom';
import Register from '../Components/Authentication/Register';
import LogIn from '../Components/Authentication/LogIn';
import Dashboard from '../Components/Dashboard/Dashboard';
import PrivateRoute from './PrivateRoute';
import AdminDashBoard from '../Components/Dashboard/DashBoardComponents/AdminDashBoard';
import UploadData from '../Components/Dashboard/DashBoardComponents/UploadData';
import NewApplication from '../Components/Dashboard/DashBoardComponents/NewApplication/NewApplication';
import ApplicationHistory from '../Components/Dashboard/DashBoardComponents/ApplicationHistory/ApplicationHistory';

const Routes = createBrowserRouter([
    {
      path: "/",
      element: <PrivateRoute><Dashboard/></PrivateRoute>,
      children:[
        {
          path:'/adminDashboard',
          element:<AdminDashBoard/>
        },
        {
          path:'/newApplication',
          element:<NewApplication/>
        },
        {
          path:'/applicationHistory',
          element:<ApplicationHistory/>
        },
        {
          path:'/upload',
          element:<UploadData/>
        },
      ]
    },
    {
      path:"/register",
      element:<Register/>
    },
    {
      path:"logIn",
      element:<LogIn/>
    }
  ]);

export default Routes;

// children: [
//   {
//     path: "/register",
//     element: <Register />,
//   },
//   {
//     path:"/logIn",
//     element:<LogIn/>
//   }
// ],