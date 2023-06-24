import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword } from "../authAPI";
import { useAlert } from "react-alert";
import { clearMessage } from "../authSlice";

const logo =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAZlBMVEX///8BAQEAAAChoaGSkpLY2NhFRUVzc3Pm5ub09PSbm5uwsLCFhYWKiorR0dEKCgrBwcErKys3Nzerq6t9fX1ZWVnHx8e5ubkwMDBOTk5AQEBiYmJqamry8vJTU1NwcHASEhIgICAfXgZ8AAAD9klEQVR4nO3d63baMBCFUVdAQ+KEXLiFNrTN+79kgZULELBnZM2cMTnf/7C0F2AbyXKqijHGGGOMMcYYY4wxxhhjjDHGGGvpejn7lRTdP83vHtCDVjT6rdF99jJCj1zWer4Z7I+MNn/2Z40evaCHPN47cooef2vDLsAtcYYWtHTXybczXqENjXUHBieWAIYmlgEGJpYChiWWAwYllgSGJJYFBiSWBoYjlgcGI1oAQxFtgIGIVsAwRDtgEKIlMATRFhiAaA2EE+2BYKIHEEr0AQKJXkAY0Q+4IdaXDrwlkEACj7u5dOCi29pEfOC1Cti2aBgQWP3VAZfjhibNRAxwrHkLU2pZvB41vRoGWM1KAhuJIGCleAsFwAYiCjgpDDxLRAEV50Ih8AwRBpQfScXAk0QcsFoJhQrgCSIQWD3LhCrgFyISWD2KhErgEREKlAnVwAMiFigSZgD3iGCgRJjSIueV34hooEy4zHrpHREOFH5K8+bGNkQ8UHqkySXigeKzRR5xXHi0OYnP+IhJ3CLJr9r6SlRcefeUOFD8euonUfULuJ9E1SxGL4m3qpmoPhLXutnEPhI104nbHRQjQeNrtOqgorP6n3uC8i7XTWqZis9qh7wN805ObdaeNsYBmvae1QJiSis07b0bqyXE9C/KJ9WOeE+iWyReBtFGSKJnJF4G8RscbkgkkcQIfYsjKokk9oL4DQ43JJJIYoR4RL0E4vTyiZPMp7X1iFjNjIzpFS37aH0nf5KgivgbLdtrNLha/RT0qiMGWkQV96RbT0YPNycdMf5jFU+kIaZH9GizUhEj3J6pT0GMs9CvS05ML+ixZiYmpif0UHOTEvt5vtglJCKF00m3v5cRgcI6pY7PqhYRccJ6exXtQIQJ691+nq5EwS8NlLB+25PVjSi5bxUkrD/21XUhim7MxQjrvb2R+UTZnccQYb3/9ckmCm+tRgjrw+NDJlF67zhAWB8fALOI4pvj/X8gfgFmEeV3/6e5haKhE8AMomJ7QxraQM51Eqgmqh4H0/HqV9kZoJKoe96NneZEZ4Eqom4HjuuHtAGoICq3GHkuXTQCt4MZSnrRzXl7voUtQPF+JxXQ82TYCjQoeU6WYoCOZwoCCQwONLsXIQqw0p3CegisqitvojfQnegPdCYigK5EDNCRiAK6EXFAJyIS6ELEAh2IaKA5EQ80JkYAmhJjAA2JUYBmxDhAI2IkoAkxFtCAGA1YnBgPWJgYEViUGBO4JRYyRgVu/z9SEWLnO8cMWxTYC5TSPMzeplMNtatlx7z0nPWkc8/qlXzD09dmUb+Bh42W00FG9aKfGykYY4wxxhhjjDHGGGOMMcYYY4wxxj77Dy4PSeZ9ts6OAAAAAElFTkSuQmCC";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const [email, setEmail] = useState("");
  const { user, loading, message } = useSelector((state) => state.user);

  const handleForgotPassword = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if (message) {
      if (message === "Unauthorized please login first!") {
        return;
      }
      alert.success(message);
      dispatch(clearMessage());
    }
  }, [message,alert,dispatch]);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8">
      {user ? navigate("/") : ""}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-[150px] w-auto"
          src={logo}
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Forgot Password
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          onSubmit={handleForgotPassword}
          className="space-y-6"
          action="#"
          method="POST"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <p></p>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {loading ? "Sening Mail..." : "Send Recovery Mail"}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already a member?{" "}
          <Link
            to="/login"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Back to login?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
