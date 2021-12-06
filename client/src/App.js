import routes from './routes';
import { useRoutes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import React from 'react';

function App() {

  const routing = useRoutes(routes(localStorage.getItem('access_token')));

  return (
    <React.Fragment>
      <>
        {routing}
      </>
      <ToastContainer />
    </React.Fragment>
  );
}

export default App;


// import { Routes, Route, Navigate } from "react-router-dom";
// import Register from "./Pages/Register";
// import Login from "./Pages/Login";
// import Home from "./Pages/Home";

// function App() {
//   return (
//     <Routes>
//       <Route path="/register" element={<Register />} />
//       <Route path="/login" element={<Login />} />
//       <Route
//         path="/"
//         element={
//           // Good! Do your composition here instead of wrapping <Route>.
//           // This is really just inverting the wrapping, but it's a lot
//           // more clear which components expect which props.
//           <RequireAuth redirectTo="/login">
//             <Home />
//           </RequireAuth>
//         }
//       />
//     </Routes>
//   );
// }

// function RequireAuth({ children, redirectTo }) {
//   let isAuthenticated = localStorage.getItem('access_token');
//   return isAuthenticated ? children : <Navigate to={redirectTo} />;
// }

// export default App;