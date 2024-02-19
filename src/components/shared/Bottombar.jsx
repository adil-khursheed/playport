import { NavLink } from "react-router-dom";
import { navLinks } from "../../constants/constants";
import { ThemeState } from "../../context/ThemeContext";

const Bottombar = () => {
  const { theme } = ThemeState();
  return (
    <nav className="md:hidden">
      <ul className="flex items-center justify-between bg-light-1 dark:bg-dark-1 border-t border-t-light-2 dark:border-t-dark-2 py-2 px-3">
        {navLinks.map((link) => (
          <NavLink key={link.route} to={link.route}>
            {({ isActive }) => (
              <li
                className={`flex flex-col items-center justify-center md:justify-normal gap-1 w-full h-12 px-3 rounded-md ${
                  isActive ? "bg-light-2 dark:bg-dark-2" : ""
                }`}>
                <div
                  className={`${
                    theme === "dark" ? "text-light-1" : "text-dark-1"
                  } w-5 h-5`}>
                  {link.label !== "History" && (
                    <span>{isActive ? link.iconFill : link.iconOutline}</span>
                  )}
                  {link.label === "History" && (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M14.97 16.95L10 13.87V7H12V12.76L16.03 15.25L14.97 16.95ZM22 12C22 17.51 17.51 22 12 22C6.49002 22 2.00002 17.51 2.00002 12H3.00002C3.00002 16.96 7.04002 21 12 21C16.96 21 21 16.96 21 12C21 7.04 16.96 3 12 3C8.81002 3 5.92002 4.64 4.28002 7.38C4.17002 7.56 4.06002 7.75 3.97002 7.94C3.96002 7.96 3.95002 7.98 3.94002 8H8.00002V9H1.96002V3H2.96002V7.74C3.00002 7.65 3.03002 7.57 3.07002 7.49C3.18002 7.27 3.30002 7.07 3.42002 6.86C5.22002 3.86 8.51002 2 12 2C17.51 2 22 6.49 22 12Z"
                        fill={`${theme === "dark" ? "#FFFFFF" : "#0F0F0F"}`}
                      />
                    </svg>
                  )}
                </div>
                <div
                  className={`text-xs hidden xs:inline-block ${
                    theme === "dark" ? "text-light-1" : "text-dark-1"
                  }`}>
                  {link.label}
                </div>
              </li>
            )}
          </NavLink>
        ))}
      </ul>
    </nav>
  );
};

export default Bottombar;
