import React from "react";
import { Link } from "react-router-dom";
import { Menu, Image, Dropdown } from "semantic-ui-react";

const LoggedInDropdown = ({ onLogoutClick, mobileView, user, avatar }) => {
  return (
    <Menu.Item
      position={!mobileView ? "right" : "left"}
      style={
        !mobileView
          ? {
              padding: "20px",
              fontSize: "21px"
            }
          : {
              fontSize: "25px",
              padding: "20px"
            }
      }
      className="navMenuItem"
      id="usernameDropdown"
    >
      <Image avatar spaced="right" src={avatar} />
      <Dropdown pointing="top left" text={user}>
        <Dropdown.Menu>
          {mobileView && (
            <Dropdown.Item as={Link} to="/home" text="Home" icon="home" />
          )}
          <Dropdown.Item as={Link} to="/add" text="New Question" icon="add" />
          {mobileView && (
            <Dropdown.Item
              as={Link}
              to="/leaderboard"
              text="Leaderboard"
              icon="dashboard"
            />
          )}
          <Dropdown.Item
            text="Sign Out"
            icon="power"
            as={Link}
            to="/login"
            onClick={onLogoutClick}
          />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
};

export default LoggedInDropdown;
