import React, { Component } from "react";
import { fakeAuth } from "../../util/fakeAuth";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Spring } from "react-spring";
// import Register from "./Register";
import { setAuthedUser } from "../../actions/authUser";
import { Grid, List, Image, Card, Icon, Button } from "semantic-ui-react";

class Login extends Component {
  state = {
    registerOpen: false,
    loginActivated: false,
    loading: false,
    redirectToReferrer: false,
    selectedUser: ""
  };

  activateLogin = id => {
    this.props.setAuthedUser(id);
    this.setState({
      loginActivated: true,
      selectedUser: id
    });
  };

  logInSubmit = () => {
    this.setState({
      loading: true
    });
    setTimeout(() => {
      fakeAuth.authenticate();
      this.setState({
        loading: false,
        redirectToReferrer: true
      });
      // this.props.history.push("/home");
    }, 200);
  };

  deactivateLogin = e => {
    if (
      e.target.className.includes("header") ||
      e.target.className.includes("avatar") ||
      e.target.className.includes("loginListUser") ||
      e.target.className.includes("radio") ||
      e.target.className.includes("button")
    ) {
    } else {
      this.setState({ loginActivated: false, selectedUser: "" });
    }
  };

  onModelClick = () => {
    this.setState(prevState => ({
      registerOpen: !prevState.registerOpen
    }));
  };

  render() {
    const { users } = this.props;
    const { loginActivated, loading, selectedUser } = this.state;
    let userArr = Object.keys(users).map(i => users[i]);
    const { from } = this.props.location.state || {
      from: { pathname: "/home" }
    };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    let userList = userArr.map(user => {
      return (
        <List.Item
          onClick={this.activateLogin.bind(this, user.id)}
          className="loginListUser"
          key={user.id}
        >
          <List.Content floated="right" style={{ marginTop: "10px" }}>
            {selectedUser === user.id && (
              <Icon name="checkmark" color="green" />
            )}
          </List.Content>
          <Image avatar src={user.avatarURL} />
          <List.Content>
            <List.Header>{user.id}</List.Header>
          </List.Content>
        </List.Item>
      );
    });

    return (
      <Grid
        centered
        columns={2}
        style={{ marginTop: "100px" }}
        onClick={this.deactivateLogin}
      >
        <Grid.Column width={10}>
          <h1 style={{ textAlign: "center" }}>Select A Username</h1>
          <Card
            fluid
            style={{ padding: "20px 40px", marginBottom: "0" }}
            color="black"
            className="loginCard"
          >
            <List animated size="massive" className="loginList">
              {userList}
            </List>
          </Card>
          {loginActivated && (
            <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
              {styles => (
                <div style={styles}>
                  <Button
                    color="green"
                    className="loginBtn"
                    fluid
                    style={{ marginBottom: "20px", marginTop: "0" }}
                    loading={loading ? true : false}
                    onClick={this.logInSubmit}
                  >
                    Login
                  </Button>
                </div>
              )}
            </Spring>
          )}
          {/* <Register
            registerOpen={this.state.registerOpen}
            onModelClick={this.onModelClick}
          /> */}
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users
});

export default connect(
  mapStateToProps,
  { setAuthedUser }
)(Login);
