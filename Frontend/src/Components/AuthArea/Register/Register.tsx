import "./Register.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import notifyService from "../../../Services/NotifyService";
import useAuth from "../../../Services/useAuth";
import UserModel from "../../../Models/UserModel";

function Register(): JSX.Element {

    const { registerUser } = useAuth();
    const { register, handleSubmit } = useForm<UserModel>();
    const navigate = useNavigate();

    async function submit(user: UserModel) {
        try {      
            await registerUser(user);
            notifyService.success("Welcome!");
            navigate("/");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="Register">
          <form className="form form-signup" onSubmit={handleSubmit(submit)}>
            <fieldset>
            <legend>Please, enter your First Name, Last Name, Username and password for sign up.</legend>
              <div className="input-block">
                <input id="role" type="hidden" value='User' {...register("role")} />
                <label htmlFor="firstName">First Name</label>
                <input id="firstName" type="text" {...register("firstName")} required/>
              </div>
              <div className="input-block">
                <label htmlFor="lastName">Last Name</label>
                <input id="lastName" type="text" {...register("lastName")}required/>
              </div>
              <div className="input-block">
                <label htmlFor="username">Username</label>
                <input id="username" type="text" {...register("userName")} required/>
              </div>
              <div className="input-block">
                <label htmlFor="signup-password">Password</label>
                <input id="signup-password" type="password" {...register("password")} required/>
              </div>
            </fieldset>
            <button type="submit" className="btn-signup">Continue</button>
          </form>
        </div>
    );
}

export default Register;