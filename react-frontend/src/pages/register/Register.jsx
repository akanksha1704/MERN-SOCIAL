import axios from "axios";
import { useRef,useContext } from "react";
import "./register.css";
import { useHistory } from "react-router";
import { CircularProgress } from "@material-ui/core";
import { AuthContext } from "../../context/AuthContext";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();
  const { isFetching, dispatch } = useContext(AuthContext);
  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        history.push("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Lamasocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              required
              ref={username}
              className="loginInput"
            />
            <input
              placeholder="Email"
              required
              ref={email}
              className="loginInput"
              type="email"
            />
            <input
              placeholder="Password"
              required
              ref={password}
              className="loginInput"
              type="password"
              minLength="6"
            />
            <input
              placeholder="Password Again"
              required
              ref={passwordAgain}
              className="loginInput"
              type="password"
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
            {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                " Sign Up"
              )}
             
            </button>
            <button className="loginRegisterButton">
            {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Log into Account"
              )}</button>
          </form>
        </div>
      </div>
    </div>
  );
}
