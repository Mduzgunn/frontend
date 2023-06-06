import React, { Component } from "react";
import UserDataService from "../services/user.service";
import { Modal, Button } from "react-bootstrap";

export default class AddUser extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeAge = this.onChangeAge.bind(this);
    this.onChangeRole = this.onChangeRole.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.newUser = this.newUser.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      age: "",
      role: "NORMAL_USER",
      submitted: false,
      showModal: true
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  onChangeAge(e) {
    this.setState({
      age: e.target.value
    });
  }

  onChangeRole(e) {
    this.setState({
      role: e.target.value
    });
  }

  saveUser() {
    var data = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      age: this.state.age,
      role: this.state.role
    };

    var basicAuth = btoa(`${this.state.username}:${this.state.password}`);
    var headers = {
      Authorization: `Basic ${basicAuth}`
    };

    UserDataService.create(data, headers)
      .then(response => {
        this.setState({
          username: response.data.username,
          email: response.data.email,
          password: response.data.password,
          age: response.data.age,
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newUser() {
    this.setState({
      username: "",
      email: "",
      password: "",
      age: "",
      role: "NORMAL_USER",
      submitted: false
    });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <div className="submit-form">
        <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                required
                value={this.state.username}
                onChange={this.onChangeUsername}
                name="username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                required
                value={this.state.password}
                onChange={this.onChangePassword}
                name="password"
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" onClick={() => { this.handleCloseModal(); this.saveUser(); }}>
              Login
            </Button>
          </Modal.Footer>
        </Modal>

        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newUser}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                required
                value={this.state.username}
                onChange={this.onChangeUsername}
                name="username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                required
                value={this.state.email}
                onChange={this.onChangeEmail}
                name="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                required
                value={this.state.password}
                onChange={this.onChangePassword}
                name="password"
              />
            </div>

            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input
                type="text"
                className="form-control"
                id="age"
                required
                value={this.state.age}
                onChange={this.onChangeAge}
                name="age"
              />
            </div>

            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select
                className="form-control"
                id="role"
                value={this.state.role}
                onChange={this.onChangeRole}
                name="role"
              >
                <option value="NORMAL_USER">Normal User</option>
                <option value="ADMIN">Admin</option>
                <option value="GUEST">Guest</option>
              </select>
            </div>

            <button onClick={this.saveUser} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
