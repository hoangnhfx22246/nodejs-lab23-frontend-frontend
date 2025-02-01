import { useDispatch, useSelector } from "react-redux";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { logout } from "../featuredUser/authSlice";

const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="navbar">
      <div className="navContainer">
        <span
          className="logo"
          onClick={() => {
            navigate("/");
          }}
        >
          Booking
        </span>
        {!isAuthenticated && (
          <div className="navItems">
            <button
              className="navButton"
              onClick={() => {
                navigate("/register");
              }}
            >
              Sign Up
            </button>
            <button
              className="navButton"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </button>
          </div>
        )}
        {isAuthenticated && (
          <div className="navItems">
            <div>{user.username}</div>
            <button
              className="navButton"
              onClick={() => {
                navigate("/transactions");
              }}
            >
              Transactions
            </button>
            <button
              className="navButton"
              onClick={() => {
                dispatch(logout());
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
