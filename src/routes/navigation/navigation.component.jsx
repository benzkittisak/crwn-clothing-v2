import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";

import { UserContext } from "../../contexts";
import { signOutUser } from "../../utils";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";

import "./navigation.styles.scss";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {currentUser ? (
            <Fragment>
              <div className="nav-user-section dropdown">
                <img src={currentUser.photoURL} alt="" />
                <span>{currentUser.displayName}</span>
                <div className="dropdown-item">
                  <span onClick={signOutUser} className="nav-link">
                    sign out
                  </span>
                </div>
              </div>
            </Fragment>
          ) : (
            <Link className="nav-link" to="/auth">
              sign in
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
