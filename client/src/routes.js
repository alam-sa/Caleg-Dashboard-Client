import { Navigate,Outlet } from 'react-router-dom';
import Login from './Pages/Login';
import Home from './Pages/Home';
import DaftarCaleg from './Pages/DaftarCaleg';
import DaftarBacaleg from './Pages/DaftarBacaleg';
import Header from './components/Header';
import SideNav from './components/SideNav';
import DetailCalon from './Pages/DetailCalon';
import Register from './Pages/Register';

const routes = (isLoggedIn) => [
  {
    path: '/',
    element: isLoggedIn ? (
      <>
        <Header />
        <SideNav />
        <Outlet />
      </>
    ) : <Navigate to="/login" />,
    children: [
      { path: '/dashboard', element: <Home /> },
      { path: '/bacaleg', element: <DaftarBacaleg /> },
      { path: '/caleg', element: <DaftarCaleg /> },
      { path: '/data', element: <DetailCalon /> },
      { path: '/', element: <Navigate to="/dashboard" /> },
    ],
  },
  {
    path: '/register', element: <Register />
  },
  {
    path: '/',
    element: !isLoggedIn ? <Login /> : <Navigate to="/dashboard" />,
    children: [
      { path: 'login', element: <Login /> },
      { path: '/', element: <Navigate to="/login" /> },
    ],
  },
];

export default routes;