import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import "./App.css";
import Header from "./Components/Header/Header";
import Login from "./Components/login/login";
import store from "./store";
import { loadUser } from "./Actions/User";
import Home from "./Components/Home/Home";
import { Provider as AlertProvider, positions, transitions } from "react-alert";
//import Template from "react-alert-template-basic";
//import { TimeToLeaveOutlined } from "@mui/icons-material";
import AlertTemplate from "react-alert-template-basic";
import Account from "./Components/Account/Account";

const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  transitions: transitions.SCALE,
};

// Separate component to handle the dispatch of loadUser
function AppInner() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <>
      <Router>
        {isAuthenticated && <Header />}
        <Routes>
          <Route path="/" element={isAuthenticated ? <Home /> : <Login />} />
          <Route
            path="/account"
            element={isAuthenticated ? <Account /> : <Login />}
          />
        </Routes>
      </Router>
    </>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...options}>
        <AppInner />
      </AlertProvider>
    </Provider>
  );
}

export default App;
