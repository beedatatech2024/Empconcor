import { Component } from "react";
import "./index.css";
import axios from "axios";
import Cookies from "js-cookie";
import { baseUrl } from "../config";

class LoginFarm extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
    loginStatus: "ADMIN",
  };

  onSubmitForm = async event => {
    const { history } = this.props;
    event.preventDefault();
    const { username, password, loginStatus } = this.state;
    
    let endpoint = '';
    let redirectPath = '';
    
    if (loginStatus === "ADMIN") {
        endpoint = 'login';
        redirectPath = '/hrr';
    } else if (loginStatus === "HR") {
        endpoint = 'hrlogin';
        redirectPath = '/admin';
    } else if (loginStatus === "EMPLOYE") {
        endpoint = 'employelogin';
        redirectPath = '/employedb';
    }

    try {
      const res = await axios.post(`${baseUrl}${endpoint}`, { username, password });
      if (res.data) {
          history.replace(redirectPath);
          Cookies.set("jwt_token", username, { expires: 30 });
          Cookies.set("login_status", loginStatus, { expires: 30 });
          this.setState({ username: "", password: "" });
      } else {
          this.setState({ errorMsg: "User Not Found. Please enter valid credentials." });
      }
    } catch (err) {
      console.error(err);
      this.setState({ errorMsg: err.response?.data?.message || 'An unexpected error occurred' });
    }
  }

  onEnterUsername = event => {
    this.setState({ username: event.target.value });
  }

  onChangePassword = event => {
    this.setState({ password: event.target.value });
  }

  onChangeLoginStatus = event => {
    this.setState({ loginStatus: event.target.value });
  }

  renderUsername = () => {
    const { username } = this.state;
    return (
      <>
        <label className="label" htmlFor="userName">
          USERNAME
        </label>
        <input
          type="text"
          id="userName"
          placeholder="Username"
          className="user-input"
          value={username}
          onChange={this.onEnterUsername}
        />
      </>
    );
  }

  renderPassword = () => {
    const { password } = this.state;
    return (
      <>
        <label className="label" htmlFor="password">
          Password
        </label>
        <input
          className="user-input"
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={this.onChangePassword}
        />
      </>
    );
  }

  render() {
    const { errorMsg, loginStatus } = this.state;
    return (
      <div className="ssh-app-container">
        <select className="login-selection" onChange={this.onChangeLoginStatus}>
          <option value="ADMIN">Admin</option>
          <option value="HR">HR</option>
          <option value="EMPLOYE">Employe</option>
        </select>
        <div className="ssh-card-container">
          <img
            src="img/applogo.png"
            alt="website logo"
            className="website-logo"
          />
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <div className="input-container">{this.renderUsername()}</div>
            <div className="input-container">{this.renderPassword()}</div>
            <button className="login-button" type="submit">
              {loginStatus} Login
            </button>
          </form>
          {errorMsg && <p className="err-msg">{errorMsg}</p>}
        </div>
      </div>
    );
  }
}

export default LoginFarm;
