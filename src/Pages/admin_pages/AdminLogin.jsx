import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import logoImage from "../../Assets/core/images/logos/logo-red-1000.png";
import api from "../../Services/Axios";
import { Store } from "../../Services/Store";

//  Login Component

function AdminLogin() {
  // React_States-----------------------------------------------------
  const navigate = useNavigate();
  const {state,dispatch}=useContext(Store)
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  // Functions--------------------------------------------------------

  // Form-Submit-Function
  const submitHandler = async (e) => {
    e.preventDefault();
    const actualData = {
      email: email,
      password: password,
    };
    try {
      const { data } = await api.post("/admin/login", actualData);
      localStorage.setItem("UserInfo", JSON.stringify(data.user));
      dispatch({type:'UserLoggedIn',payload:data})
      toast.success("Login SuccessFully");
      navigate("/admin/dashboard");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred during login.");
      }
    }
  };

  // Use-Effect-Function
  useEffect(() => {
    const admin = () => {
      localStorage.setItem("admin",'admin')
      dispatch({ type: "Admin", payload:'admin' });
    };
    admin()
  });
  
  return (
    <>
      <Helmet>
        <title>Admin | Login</title>
      </Helmet>
      <div className="account-pages my-5 pt-sm-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-5">
              <div className="card overflow-hidden">
                <div className="bg-soft-primary">
                  <div className="row">
                    <div className="col-7">
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Welcome Back !</h5>
                        <p>
                          Sign in to <b>Continue</b>.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body pt-0">
                  <div>
                    <a href>
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src={logoImage}
                            alt=""
                            className="rounded-circle"
                            height={45}
                          />
                        </span>
                      </div>
                    </a>
                  </div>
                  <div className="p-2">
                   
                    <form onSubmit={submitHandler}>
                      <input
                        type="hidden"
                        name="csrfmiddlewaretoken"
                        defaultValue="P6CBtK0X6LQ8W4K3myIRTfGIXGIUJ0kKBKUoBzgnFkzMqnbYTIsgfcBDslpiyw4C"
                      />
                      <div id="div_id_login" className="mb-3">
                        {" "}
                        <div>
                          {error ? (
                            <>
                              <div
                                className="alert alert-danger mt-4"
                                role="alert"
                              >
                                {error}
                              </div>
                            </>
                          ) : null}
                        </div>
                        <label
                          htmlFor="id_login"
                          className="form-label requiredField"
                        >
                          Email<span className="asteriskField">*</span>{" "}
                        </label>{" "}
                        <input
                          type="email"
                          name="login"
                          placeholder="Email address"
                          autoComplete="email"
                          maxLength={320}
                          className="textinput form-control"
                          required
                          id="id_login"
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                        />{" "}
                      </div>{" "}
                      <div id="div_id_password" className="mb-3">
                        {" "}
                        <label
                          htmlFor="id_password"
                          className="form-label requiredField"
                        >
                          Password<span className="asteriskField">*</span>{" "}
                        </label>{" "}
                        <input
                          type="password"
                          name="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          className="passwordinput form-control"
                          required
                          id="id_password"
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                        />{" "}
                      </div>{" "}
                      <div className="mb-3">
                        {" "}
                        <div id="div_id_remember" className="mb-3 form-check">
                          {" "}
                          <input
                            type="checkbox"
                            name="remember"
                            className="checkboxinput form-check-input"
                            id="id_remember"
                          />{" "}
                          <label
                            htmlFor="id_remember"
                            className="form-check-label"
                          >
                            Remember Me
                          </label>{" "}
                        </div>{" "}
                      </div>
                      <input
                        type="hidden"
                        name="next"
                        defaultValue="/accounts/cross-auth/"
                      />
                      <div className="mt-3">
                        <button
                          className="btn btn-success btn-block waves-effect waves-light"
                          type="submit"
                        >
                          Log In
                        </button>
                      </div>
                    </form>
                    <div className="mt-4 text-center">
                      <Link
                        to="/accounts/password/reset/"
                        className="text-muted"
                      >
                        <i className="mdi mdi-lock mr-1" /> Forgot your
                        password?
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;
