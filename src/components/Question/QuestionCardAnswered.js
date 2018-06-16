import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { formatQuestion } from "../../util/helpers.js";
import { connect } from "react-redux";
import Moment from "react-moment";
import { Card, Image, Button, Divider, Icon } from "semantic-ui-react";

class QuestionCardAnswered extends Component {
  questionReveal = id => {
    this.props.history.push(`/question/${id}`);
  };
  render() {
    const { question, authedUser, users } = this.props;
    let date = question.timestamp;
    date = (date - (date % 1000)) / 1000;
    date = new Date(date * 1000);
    const selectedOption = users[authedUser].answers[question.id];
    return (
      <div>
        <div
          style={{
            fontWeight: "bold",
            color: "grey",
            fontSize: "20px",
            textTransform: "capitalize",
            padding: "10px"
          }}
        >
          <Icon bordered inverted circular name="calendar" />
          <Moment format="MM/DD/YYYY">{date}</Moment>
        </div>
        <Card.Group>
          <Card>
            <Card.Content>
              <Image
                floated="right"
                size="mini"
                src="https://images.unsplash.com/photo-1458419948946-19fb2cc296af?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=909aa3b2057ec129c465bfa17d6497ff&auto=format&fit=crop&w=1050&q=80"
              />
              <Card.Header>{question.name} Asked</Card.Header>
              <Card.Meta>Would You Rather?</Card.Meta>
              <Card.Description>
                <em>{question.optionOne.text}</em>
                <p>Or</p>
              </Card.Description>
              <Card.Description>
                <em>{question.optionTwo.text}</em>
                <Divider />
                <Card.Content>
                  <h1 style={{ textTransform: "capitalize" }}>
                    {question[selectedOption].text}
                  </h1>
                </Card.Content>
              </Card.Description>
            </Card.Content>
            <Card.Content>
              <Button
                fluid
                content="Details"
                color="green"
                onClick={this.questionReveal.bind(this, question.id)}
              />
            </Card.Content>
          </Card>
        </Card.Group>
      </div>
    );
  }
}

const mapStateToProps = ({ authedUser, users, questions }, { id }) => {
  const question = questions[id];

  return {
    authedUser,
    users,
    question: formatQuestion(question, users[question.author], authedUser)
  };
};

export default withRouter(connect(mapStateToProps)(QuestionCardAnswered));
