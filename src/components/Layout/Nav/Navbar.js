import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { Menu, Container, Segment } from "semantic-ui-react";
import { fakeAuth } from "../../../util/fakeAuth";
import { setAuthedUser } from "../../../actions/authUser";
import { connect } from "react-redux";

import LoggedInDropdown from "./LoggedInDropdown";

class Navbar extends Component {
  state = {
    authedUser: false,
    mobileView: window.innerWidth < 650
  };

  componentDidMount() {
    window.addEventListener("resize", this.updateNavBar);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      authedUser: fakeAuth.isAuthenticated
    });
  }
  onLoginClick = () => {
    this.setState({
      authedUser: true
    });
  };

  onLogoutClick = () => {
    fakeAuth.signout();
    this.props.setAuthedUser("");
    this.setState({
      authedUser: false
    });
  };

  updateNavBar = () => {
    this.setState({ mobileView: window.innerWidth < 650 });
  };

  render() {
    let currentUser = this.props.users.filter(
      user => user.id === this.props.authenticUser
    );
    let avatar;
    if (currentUser.length > 0) {
      avatar = currentUser[0].avatarURL;
    }
    const { authedUser, mobileView } = this.state;

    return (
      <Segment>
        <Menu
          inverted
          fixed="top"
          widths={!mobileView ? 3 : 1}
          className="menuForNav"
        >
          <Container>
            {authedUser && (
              <div>
                {!mobileView ? (
                  <Menu.Item
                    as={NavLink}
                    to="/home"
                    className="navMenuItem"
                    style={
                      !mobileView ? { padding: "35px", fontSize: "25px" } : null
                    }
                    name="Home"
                  />
                ) : null}
                {!mobileView ? (
                  <Menu.Item
                    as={NavLink}
                    to="/leaderboard"
                    className="navMenuItem"
                    style={
                      !mobileView ? { padding: "35px", fontSize: "25px" } : null
                    }
                  >
                    Leaderboard
                  </Menu.Item>
                ) : null}
                <LoggedInDropdown
                  onLogoutClick={this.onLogoutClick}
                  mobileView={mobileView}
                  user={this.props.authenticUser}
                  avatar={avatar}
                />
              </div>
            )}
            {!authedUser && (
              <Menu.Item
                as={NavLink}
                to="/login"
                style={{
                  padding: "35px",
                  fontSize: "25px"
                }}
              >
                Login
              </Menu.Item>
            )}
          </Container>
        </Menu>
      </Segment>
    );
  }
}

const mapStateToProps = state => ({
  authenticUser: state.authedUser,
  users: Object.keys(state.users).map(i => state.users[i])
});

export default withRouter(
  connect(
    mapStateToProps,
    { setAuthedUser }
  )(Navbar)
);
