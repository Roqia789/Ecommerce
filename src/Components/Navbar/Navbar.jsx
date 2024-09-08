import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../Imgs/freshcart-logo.svg";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { cartContext } from "../../Context/CartContext";

const Navbar = () => {
  const { token, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const { numOfItems } = useContext(cartContext);

  function logout() {
    localStorage.removeItem("tkn");
    setToken(null);
    navigate("/login");
  }
 // fixed w-full
  return (
    <>
      <nav className="bg-slate-300 border-gray-200 dark:bg-slate-50">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <NavLink
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} className="h-8" alt="cart" />
          </NavLink>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-slate-50 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <span className="flex flex-wrap font-light">
              <ul className="flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 ">
                {token ? (
                  <>
                    <li>
                      <NavLink
                        to="/home"
                        className="block py-2 px-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-black dark:hover:bg-gray-700 dark:hover:text-black md:dark:hover:bg-transparent"
                      >
                        Home
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/cart"
                        className="block py-2 px-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-black dark:hover:bg-gray-700 dark:hover:text-black md:dark:hover:bg-transparent"
                      >
                        Cart
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/wishList"
                        className="block py-2 px-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-black  dark:hover:bg-gray-700 dark:hover:text-black md:dark:hover:bg-transparent"
                      >
                        Wish List
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/products"
                        className="block py-2 px-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-black  dark:hover:bg-gray-700 dark:hover:text-black md:dark:hover:bg-transparent"
                      >
                        Products
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/categories"
                        className="block py-2 px-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-black  dark:hover:bg-gray-700 dark:hover:text-black md:dark:hover:bg-transparent"
                      >
                        Categories
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/brands"
                        className="block py-2 px-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-black  dark:hover:bg-gray-700 dark:hover:text-black md:dark:hover:bg-transparent"
                      >
                        Brands
                      </NavLink>
                    </li>
                  </>
                ) : (
                  ""
                )}
              </ul>

              <span className="ms-56 bg-gray-50 flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 ">
                {token ? (
                  <div className="flex flex-wrap">
                  <NavLink
                  to="/cart"
                  className="me-4 relative block py-2 px-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-black  dark:hover:bg-gray-700 dark:hover:text-black md:dark:hover:bg-transparent"
                >
                  <i className="fa-solid fa-cart-shopping"></i>{" "}
                  <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-5 dark:border-gray-900">
                    {numOfItems}
                  </div>
                </NavLink>

                <button onClick={logout} className="ms-4">log out</button>
                  </div>
                ) : (
                  <>
                    <NavLink to="/register"> Register</NavLink>
                    <NavLink to="/login" className="me-2">
                      login
                    </NavLink>
                  </>
                )}
              </span>
            </span>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
