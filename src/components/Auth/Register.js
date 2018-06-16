import React, {Component} from 'react';
import { Modal, Header, Icon, Button, Form } from 'semantic-ui-react';

class Register extends Component {
  
  render() {
    const {registerOpen, onModelClick} = this.props;
    return <Modal open={registerOpen} trigger={<Button color="black" fluid onClick={onModelClick} className="registerOpenBtn">
            Register A New User
          </Button>} dimmer='blurring'>
        <Header icon="archive" content="Register A New User" />
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Username</label>
              <input placeholder="Enter Your Username.." />
            </Form.Field>
            <Form.Field>
              <label>Image URL</label>
              <input placeholder="URL" />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={onModelClick}  color="red">
            <Icon name="remove" /> Cancel
          </Button>
          <Button color="green">
            <Icon name="checkmark" /> Register
          </Button>
        </Modal.Actions>
      </Modal>;
  }
}

export default Register
