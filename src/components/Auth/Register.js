import React, { Component } from "react";
import { Modal, Header, Icon, Button, Form } from "semantic-ui-react";
import { handleRegisterNewUser } from "../../actions/userActions";
import { connect } from "react-redux";
class Register extends Component {
  state = {
    userName: "",
    password: "",
    name: "",
    avatarURL: "",
    loading: false
  };

  onInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  createNewUser = () => {
    const { userName, password, name, avatarURL } = this.state;
    this.setState({ loading: true });
    this.props.handleRegisterNewUser(userName, password, name, avatarURL);
    setTimeout(() => {
      this.props.onModelClick();
      this.setState({ loading: false });
    }, 500);
  };

  render() {
    const { registerOpen, onModelClick } = this.props;

    return (
      <Modal
        open={registerOpen}
        trigger={
          <Button
            color="black"
            fluid
            onClick={onModelClick}
            className="registerOpenBtn"
          >
            Register A New User
          </Button>
        }
        dimmer="blurring"
      >
        <Header icon="archive" content="Register A New User" />
        <Modal.Content>
          <Form onSubmit={this.createNewUser} loading={this.state.loading}>
            <Form.Field required>
              <label>Username</label>
              <input
                placeholder="Enter Your Username.."
                onChange={this.onInputChange}
                name="userName"
                value={this.state.userName}
              />
            </Form.Field>
            <Form.Field required>
              <label>Password</label>
              <input
                placeholder="Password"
                type="password"
                onChange={this.onInputChange}
                name="password"
                value={this.state.password}
              />
            </Form.Field>
            <Form.Field>
              <label>Name</label>
              <input
                placeholder="Full Name"
                onChange={this.onInputChange}
                name="name"
                value={this.state.name}
              />
            </Form.Field>
            <Form.Field>
              <label>Avatar</label>
              <input
                placeholder="Image URL"
                onChange={this.onInputChange}
                name="avatarURL"
                value={this.state.avatarURL}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={onModelClick} color="red">
            <Icon name="remove" /> Cancel
          </Button>
          <Button color="green" onClick={this.createNewUser}>
            <Icon name="checkmark" /> Register
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapStateToProps = ({ users }) => ({
  users
});

export default connect(
  mapStateToProps,
  { handleRegisterNewUser }
)(Register);
