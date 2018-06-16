import React, { Component } from "react";
import { formatQuestion } from "../../util/helpers";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Moment from "react-moment";
import { Card, Image, Icon } from "semantic-ui-react";

class QuestionCardUnanswered extends Component {
  questionReveal = id => {
    this.props.history.push(`/question/${id}`);
  };
  render() {
    const { question } = this.props;
    let date = question.timestamp;
    date = (date - (date % 1000)) / 1000;
    date = new Date(date * 1000);
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
              <Card.Description>
                <Card.Header> {this.props.question.name} Asked..</Card.Header>
              </Card.Description>
              <Card.Description>
                <Image
                  onClick={this.questionReveal.bind(this, question.id)}
                  style={{ marginTop: "30px" }}
                  rounded
                  className="revealImage"
                  floated="right"
                  size="mini"
                  src="https://images.unsplash.com/photo-1458419948946-19fb2cc296af?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=909aa3b2057ec129c465bfa17d6497ff&auto=format&fit=crop&w=1050&q=80"
                />
              </Card.Description>
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
    question: question
      ? formatQuestion(question, users[question.author], authedUser)
      : null,
    questionIds: id
  };
};

export default withRouter(connect(mapStateToProps)(QuestionCardUnanswered));
