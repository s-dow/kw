import "../SignIn/SignIn.scss";
import { Link } from "react-router-dom";
import runtimeEnv from "@mars/heroku-js-runtime-env";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faSignal } from "@fortawesome/free-solid-svg-icons";

const env = runtimeEnv();

export const Register = () => {
  const registerUser = async (event) => {
    event.preventDefault();
    const firstname = event.target.firstname.value;
    const lastname = event.target.lastname.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    await fetch(`https://grasperapi.azurewebsites.net/api/v1/Users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: firstname,
        lastName: lastname,
        email: email,
        password: password,
        authCode: env.REACT_APP_AUTH_CODE,
      }),
    }).then((res) => {
      function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
      }
      setCookie("password", password, 90);

      const getCookie = (cname) => {
        let name = cname + "=";
        let ca = document.cookie.split(";");
        for (let i = 0; i < ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) === " ") {
            c = c.substring(1);
          }
          if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      };

      async function signInUser() {
        event.preventDefault();
        const email2 = email;
        const password2 = await getCookie("password");

        const response = await fetch(
          `https://grasperapi.azurewebsites.net/api/v1/Users/authenticate`,
          {
            method: "POST",
            headers: { "Content-Type": "text/json" },
            body: JSON.stringify({
              email: email2,
              password: password2,
            }),
          }
        );
        const responseData = await response.json();

        function setCookieToken(cname, cvalue, exdays) {
          const d = new Date();
          d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
          let expires = "expires=" + d.toUTCString();
          document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        }
        setCookieToken("token", responseData.token, 90);

        if (response.status === 200) {
          window.location = "/signals";
        } else {
          alert("Try Again.");
        }
      }
      signInUser();
    });
  };

  return (
    <div className="registerContainer container-fluid">
      <div className="center text-center featured-img">
        <h1>
          <Icon icon={faSignal} />
        </h1>
        <h2>Register</h2>
        <form id="registerForm" onSubmit={registerUser}>
          <label htmlFor="firstname" className="col-form-label"></label>
          <input
            type="firstname"
            className=" text-center"
            id="firstname"
            placeholder="first name"
            required
          />
          <label htmlFor="lastname" className="col-form-label"></label>

          <input
            type="lastname"
            className=" text-center"
            id="lastname"
            placeholder="last name"
            required
          />
          <label htmlFor="email" className="col-form-label"></label>
          <input
            type="email"
            placeholder="email"
            id="email"
            className="text-center"
            required
          />
          <label htmlFor="password" className="col-form-label"></label>
          <input
            type="password"
            id="password"
            placeholder="password"
            className="text-center"
            required
          />
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btnCustom">
              Create Account
            </button>
          </div>
        </form>
        <p className="registerLink">
          Already have an account?{" "}
          <Link className="regLink" to="/signin">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};
