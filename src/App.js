import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import "./App.css";
import Header from "./Components/Header/Header";
import Login from "./Components/login/login";
import store from "./store";
import { loadUser } from "./Actions/User";

// Separate component to handle the dispatch of loadUser
function AppInner() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppInner />
    </Provider>
  );
}

export default App;
