import "./SignIn.scss";

export const SignIn = () => {
  const signInUser = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    const response = await fetch(
      `https://grasperapi.azurewebsites.net/api/v1/Users/authenticate`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    );
    console.log(response);
    const data = await response.json();
    console.log(data);

    if (response.status === 200) {
      localStorage.email = email;
      localStorage.password = password;
      window.location = "/signals";
    } else {
      alert("Try Again.");
    }
  };

  return (
    <main className="signinContent container-fluid">
      <div className="row justify-content-center">
        <section className="signin col-sm-9 col-md-6">
          <h2 className="title text-center">Sign In</h2>
          <p className="text-center">Welcome Back!</p>
          <form id="signinForm" onSubmit={signInUser}>
            <div className="form-group row justify-content-center">
              <label htmlFor="email" className="col-form-label"></label>
              <div className="col-sm-10 col-md-6">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Email"
                  required
                />
                <small></small>
              </div>
            </div>
            <div className="form-group row justify-content-center">
              <label htmlFor="password" className="col-form-label"></label>
              <div className="col-sm-10 col-md-6">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  required
                />
                <small></small>
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-12 d-flex justify-content-center">
                <button type="submit" className="btn btnCustom">
                  Sign In
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
};
