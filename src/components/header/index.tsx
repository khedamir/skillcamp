import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { MdOutlineLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { logout } from "../../redux/auth/slice";

import { FaCopy } from "react-icons/fa6";
import { BiSolidCalendarEvent } from "react-icons/bi";
import { FaListAlt } from "react-icons/fa";
import { FaClipboardUser } from "react-icons/fa6";
import { MdAdminPanelSettings } from "react-icons/md";

const LOCATIONS = [
  { name: "Курсы", link: "/courses", icon: <FaCopy /> },
  { name: "События", link: "/events", icon: <BiSolidCalendarEvent /> },
  { name: "Рейтинг", link: "/leader-board", icon: <FaListAlt /> },
  { name: "Профиль", link: "/profile", icon: <FaClipboardUser /> },
  { name: "Админ", link: "/admin", icon: <MdAdminPanelSettings /> },
];

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuth, autharizationData } = useSelector(
    (state: RootState) => state.auth
  );
  const [currentLocation, setCurrentLocation] = useState(
    LOCATIONS.find((item) => item.link === location.pathname)
  );

  useEffect(() => {
    setCurrentLocation(
      LOCATIONS.find((item) => item.link === location.pathname)
    );
  }, [location.pathname]);

  const logoutClick = () => {
    localStorage.setItem("SKUToken", "-");
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="main-header">
      <div className="logo">
        <h2 className="page-name">{currentLocation?.name}</h2>
        <Link to="/courses">
          <img src={Logo} alt="Logo" />
          <h2 className="logo-text">SkillCamp</h2>
        </Link>
      </div>
      <nav className="menu">
        <ul className="menu-items">
          {LOCATIONS.map(
            ({ name, link }) =>
              link !== "/admin" && (
                <li
                  key={link}
                  className={`menu-item ${
                    currentLocation?.link === link && "is--active"
                  }`}
                >
                  <Link to={link}>{name}</Link>
                </li>
              )
          )}
        </ul>
      </nav>
      <div className="authorization">
        {isAuth ? (
          <div className="auth">
            {autharizationData?.user_role === "admin" && (
              <Link
                className={`${location.pathname === "/admin" && "is--active"}`}
                to="/admin"
              >
                Админ
              </Link>
            )}
            <span onClick={logoutClick} className="logout">
              <MdOutlineLogout />
            </span>
          </div>
        ) : (
          <Link to="/signin">Войти</Link>
        )}
      </div>

      <nav className="mobile-menu">
        <ul className="menu-items">
          {LOCATIONS.map(({ link, icon }) =>
            link === "/admin" ? (
              autharizationData?.user_role === "admin" ? (
                <li
                  key={link}
                  className={`menu-item ${
                    currentLocation?.link === link && "is--active"
                  }`}
                >
                  <Link to={link}>{icon}</Link>
                </li>
              ) : (
                ""
              )
            ) : (
              <li
                key={link}
                className={`menu-item ${
                  currentLocation?.link === link && "is--active"
                }`}
              >
                <Link to={link}>{icon}</Link>
              </li>
            )
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
