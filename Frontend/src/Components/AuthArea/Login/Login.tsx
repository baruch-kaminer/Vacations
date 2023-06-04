import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import notifyService from "../../../Services/NotifyService";
import "./Login.css";
import useAuth from "../../../Services/useAuth";
import { useEffect, useState } from "react";
import Register from "../Register/Register";

function Login(): JSX.Element {

  const { login } = useAuth();
  const { register, handleSubmit } = useForm<CredentialsModel>();
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState<string>("");

  async function submit(credentials: CredentialsModel) {
    try {
      await login(credentials);
      notifyService.success("Welcome Back!");
      navigate("/");
    } catch (err: any) {
      notifyService.error(err);
    }
  }

  useEffect(() => {
    setRefresh("form-wrapper");
  }, []);

  const switchers: any[] = [...document.querySelectorAll(".switcher")];
  switchers.forEach((item: any) => {
    item.addEventListener("click", function () {
      switchers.forEach((item: any) =>
        item.parentElement.classList.remove("is-active")
      );
      item.parentElement.classList.add("is-active");
    });
  });

  return (
    <div className="Login">
      <section className="forms-section">
        <p className="section-title">Welcome! Please enter your details</p>
        <div className="forms">
          <div className="form-wrapper is-active">
            <button type="button" className="switcher switcher-login"> Login
              <span className="underline"></span>
            </button>
            <form className="form form-login" onSubmit={handleSubmit(submit)}>
              <fieldset>
                <legend>
                  Please, enter your username and password for login.
                </legend>
                <div className="input-block">
                  <label htmlFor="login-Username">Username</label>
                  <input id="login-Username" type="text" {...register("userName")}/>
                </div>
                <div className="input-block">
                  <label htmlFor="login-password">Password</label>
                  <input id="login-password" type="password" {...register("password")} required/>
                </div>
              </fieldset>
              <button type="submit" className="btn-login">Login</button>
            </form>
          </div>
          <div className={refresh}>
            <button type="button" className="switcher switcher-signup"> Sign Up
              <span className="underline"></span>
            </button>
            <Register />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
