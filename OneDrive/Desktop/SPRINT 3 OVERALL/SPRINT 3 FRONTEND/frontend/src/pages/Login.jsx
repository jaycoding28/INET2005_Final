import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const setIsLoggedIn = useOutletContext();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_HOST}/users/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        setIsLoggedIn(true);
        navigate("/");
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="card p-4 shadow" style={{ maxWidth: "400px", width: "90%" }}>
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <input
              {...register("email", { required: true })}
              className="form-control"
              placeholder="Email"
              type="email"
            />
            {errors.email && (
              <small className="text-danger">Email is required</small>
            )}
          </div>
          <div className="mb-3">
            <input
              {...register("password", { required: true })}
              type="password"
              className="form-control"
              placeholder="Password"
            />
            {errors.password && (
              <small className="text-danger">Password is required</small>
            )}
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
        <p className="text-center mt-3 mb-0">
          <Link to="/signup" className="text-decoration-none">
            Need an account? Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;