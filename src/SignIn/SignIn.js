import "./SignIn.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faSignal } from "@fortawesome/free-solid-svg-icons";

export const SignIn = () => {
  const signInUser = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    const response = await fetch(
      `https://grasperapi.azurewebsites.net/api/v1/Users/authenticate`,
      {
        method: "POST",
        headers: { "Content-Type": "text/json" },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    );
    const data = await response.json();

    function setCookie(cname, cvalue, exdays) {
      const d = new Date();
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
      let expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
    setCookie("token", data.token, 90);

    // function saveToken() {
    //   setCookie("token", data.token, {
    //     expires: "Fri Jan 01 11:59:59 UTC",
    //     path: "/",
    //   });
    // }

    // saveToken();

    if (response.status === 200) {
      localStorage.email = email;
      localStorage.password = password;
      window.location = "/signals";
    } else {
      alert("Incorrect e-mail or password.");
    }
  };

  return (
    <div className="signinContainer container-fluid">
      <div className="center text-center featured-img">
        <h1>
          <Icon icon={faSignal} />
        </h1>
        <h2>Sign In</h2>
        <p className="text-center">Welcome Back!</p>
        <form id="signinForm" onSubmit={signInUser}>
          <label htmlFor="email" className="col-form-label"></label>
          <input
            id="email"
            type="email"
            placeholder="email"
            className="text-center"
            required
          />
          <label htmlFor="password" className="col-form-label"></label>
          <input
            type="password"
            placeholder="password"
            className="text-center"
            id="password"
            required
          />
          <div className="col-sm-12 d-flex justify-content-center">
            <button type="submit" className="btn btnCustom">
              Sign In
            </button>
          </div>
        </form>

        <p className="registerLink">
          Don't have an account?{" "}
          <Link className="regLink" to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};
