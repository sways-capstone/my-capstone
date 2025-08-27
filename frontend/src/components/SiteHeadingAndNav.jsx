import { NavLink } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../contexts/current-user-context";

export default function SiteHeadingAndNav() {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a
            id="logo"
            href="/"
            className="text-2xl font-bold text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            CreditCardFinder
          </a>
          <nav>
            <ul className="flex space-x-8">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      isActive ? "text-blue-600 bg-blue-50" : ""
                    }`
                  }
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/credit-cards"
                  className={({ isActive }) =>
                    `text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      isActive ? "text-blue-600 bg-blue-50" : ""
                    }`
                  }
                >
                  Browse Cards
                </NavLink>
              </li>

              {currentUser ? (
                <>
                  <li>
                    <NavLink
                      to="/goals"
                      className={({ isActive }) =>
                        `text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                          isActive ? "text-blue-600 bg-blue-50" : ""
                        }`
                      }
                    >
                      My Goals
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/recommendations"
                      className={({ isActive }) =>
                        `text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                          isActive ? "text-blue-600 bg-blue-50" : ""
                        }`
                      }
                    >
                      Recommendations
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to={`/users/${currentUser.id}`}
                      className={({ isActive }) =>
                        `text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                          isActive ? "text-blue-600 bg-blue-50" : ""
                        }`
                      }
                    >
                      {currentUser.username}
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink
                      to="/login"
                      className={({ isActive }) =>
                        `text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                          isActive ? "text-blue-600 bg-blue-50" : ""
                        }`
                      }
                    >
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/sign-up"
                      className={({ isActive }) =>
                        `text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                          isActive ? "text-blue-600 bg-blue-50" : ""
                        }`
                      }
                    >
                      Sign Up
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
