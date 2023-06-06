import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddUser from "./components/add-user.component";
// import User from "./components/user.component";
import LoginPage from "./components/LoginPage";
import UsersList from "./components/users-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/users"} className="navbar-brand">
            Tournament App
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/users"} className="nav-link">
                Users
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<LoginPage/>} />
            {/* <Route path="/" element={<UsersList/>} /> */}
            <Route path="/users" element={<UsersList/>} />
            <Route path="/add" element={<AddUser/>} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;