import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./Components/Context/AuthContext.jsx";

import Login from "./Components/Login/Login.jsx";
import Register from "./Components/Register/Register.jsx";
import Admin from "./Components/Admin/Admin.jsx";
import Annonce from "./Components/Annonce/Annonce.jsx";
import AnnonceDetails from "./Components/Annonce/AnnonceDetails.jsx";
import Wrapper from "./Components/Wrapper/Wrapper.jsx";
import PrivateRoute from "./Components/Security/PrivateRoute.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Account from "./Components/Account/Account.jsx";

function App() {
  return (
    <AuthProvider>
      <div>
        <ToastContainer />
      </div>
      <BrowserRouter>
        <Wrapper>
          <Routes>
            <Route path={"/"} element={<Login />} />
            <Route path={"/register"} element={<Register />} />
              <Route path={"/my-account"} element={<Account />} />
            <Route
              path={"/admin"}
              element={
                <PrivateRoute>
                  <Admin />
                </PrivateRoute>
              }
            />
            <Route
              path={"/annonces"}
              element={
                <PrivateRoute>
                  <Annonce />
                </PrivateRoute>
              }
            />
              <Route path={"/annonces/:id"} element={<PrivateRoute><AnnonceDetails /></PrivateRoute>} />
          </Routes>
        </Wrapper>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
