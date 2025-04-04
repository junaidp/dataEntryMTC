import React from "react";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setupSignIn } from "../../global-redux/reducers/onBoard/slice";

const Login = ({ setShowLoginDialog }) => {
  const dispatch = useDispatch();
  const { loading, signUpAddSuccess } = useSelector((state) => state?.onBoard);
  const [showpassword, setShowPassword] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [userName, setUserName] = React.useState("");

  function handleLogin(event) {
    event.preventDefault();
    if (!loading) {
      if (userName === "" || password === "") {
        toast.error("Provide all values");
      }

      if (userName !== "" && password !== "") {
        dispatch(setupSignIn(`?userName=${userName}&password=${password}`));
      }
    }
  }

  React.useEffect(() => {
    if (signUpAddSuccess) {
      setShowLoginDialog(false);
    }
  }, [signUpAddSuccess]);

  return (
    <div className="px-4 py-4">
      <div>
        <h2 className="pb-4 heading">Sign In</h2>

        <section className=" fxt-template-layout31">
          <div className="fxt-content-wrap">
            <div className="fxt-form-content">
              <div className="fxt-page-switcher">
                <h2 className="fxt-page-title mr-3">Login</h2>
                <ul className="fxt-switcher-wrap"></ul>
              </div>
              <div className="fxt-main-form">
                <div className="fxt-inner-wrap">
                  <form onSubmit={handleLogin}>
                    <div className="row">
                      <div className="col-12">
                        <div className="form-group">
                          <input
                            type="email"
                            id="email"
                            className="form-control"
                            placeholder="User Name"
                            required="required"
                            name="loginEmail"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group relative">
                          <input
                            id="password"
                            type={showpassword ? "password" : "string"}
                            className="form-control"
                            placeholder="********"
                            required="required"
                            name="loginPassword"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <div className="t-12 r-12 absolute">
                            {!showpassword && (
                              <div
                                onClick={() => setShowPassword(true)}
                                className="cursor-pointer"
                              >
                                <i className="bi bi-eye-fill"></i>
                              </div>
                            )}
                            {showpassword && (
                              <div
                                onClick={() => setShowPassword(false)}
                                className="cursor-pointer"
                              >
                                <i className="bi bi-eye-slash-fill"></i>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="form-group">
                          <button
                            type="submit"
                            className={`btn fxt-btn-fill ${
                              loading && "disabled"
                            }`}
                            onClick={handleLogin}
                          >
                            {loading ? "Loading..." : "Log in"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="flex mb-2 flex-end">
          <button
            type="button"
            className="btn btn-danger float-end mt-4 "
            onClick={() => setShowLoginDialog(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
