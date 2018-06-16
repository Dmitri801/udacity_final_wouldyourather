import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { handleSaveNewQuestion } from "../../actions/shared";
import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthGreaterThan
} from "revalidate";

import TextInput from "../../common/form/TextInput.js";
import {
  Grid,
  Button,
  Divider,
  Form,
  Segment,
  Image,
  Header,
  Dimmer,
  Loader
} from "semantic-ui-react";

import { Spring } from "react-spring";

const validate = combineValidators({
  optionOneText: composeValidators(
    isRequired({ message: "First Question Is Required" }),
    hasLengthGreaterThan(4)({
      message: "Question has to be at least 5 characters"
    })
  )(),
  optionTwoText: composeValidators(
    isRequired({ message: "Second Question Is Required" }),
    hasLengthGreaterThan(4)({
      message: "Question has to be at least 5 characters"
    })
  )()
});

class NewQuestionForm extends Component {
  state = {
    loading: false
  };

  onFormSubmit = values => {
    this.props.reset();
    this.setState({
      loading: true
    });
    let question = {
      optionOneText: values.optionOneText,
      optionTwoText: values.optionTwoText,
      author: this.props.authedUser
    };
    this.props.handleSaveNewQuestion(question);
    setTimeout(() => {
      this.setState({
        loading: false
      });
      this.props.history.push("/home");
    }, 1000);
  };
  render() {
    const { invalid, submitting, pristine, history } = this.props;
    return (
      <div className="newQuestion">
        <Grid columns="equal">
          <Grid.Column className="leaderBtnCol">
            <Button
              onClick={() => history.goBack()}
              color="grey"
              className="newQuestionSegment"
            >
              Go Back
            </Button>
          </Grid.Column>
          <Grid.Column width={8}>
            <h1 style={{ textAlign: "center" }}>Would You Rather?</h1>
            <Divider />
            <Segment inverted className="leaderSegment">
              <Form
                inverted
                onSubmit={this.props.handleSubmit(this.onFormSubmit)}
              >
                <Header sub color="red" content="A:" />
                <Field
                  name="optionOneText"
                  type="text"
                  component={TextInput}
                  placeholder="Do This??"
                />

                {!this.state.loading ? (
                  <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
                    {styles => (
                      <div style={styles}>
                        <Image
                          src="https://images.unsplash.com/photo-1484069560501-87d72b0c3669?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f0a61f73dbc747e7d9907bbfa8a87c45&auto=format&fit=crop&w=1350&q=80"
                          circular
                          size="medium"
                          centered
                          disabled={invalid ? true : false}
                        />
                      </div>
                    )}
                  </Spring>
                ) : (
                  <Dimmer active={this.state.loading ? true : false}>
                    <Loader size="large">Loading</Loader>
                  </Dimmer>
                )}

                <Header sub color="red" content="B:" />
                <Field
                  name="optionTwoText"
                  type="text"
                  component={TextInput}
                  placeholder="Do That??"
                />
                <Divider hidden section />
                <Button
                  fluid
                  style={{ marginTop: "20px" }}
                  type="submit"
                  disabled={invalid || submitting || pristine}
                >
                  Submit
                </Button>
              </Form>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <div />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authedUser: state.authedUser,
  questions: Object.keys(state.questions).map(i => state.questions[i])
});

export default connect(
  mapStateToProps,
  { handleSaveNewQuestion }
)(
  reduxForm({ form: "newQuestionForm", enableReinitialize: true, validate })(
    NewQuestionForm
  )
);
