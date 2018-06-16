import React, { Component } from "react";
import { connect } from "react-redux";
import QuestionCardAnswered from "../Question/QuestionCardAnswered";
import QuestionCardUnanswered from "../Question/QuestionCardUnanswered";

import { Tab } from "semantic-ui-react";

class QuestionTabMenu extends Component {
  render() {
    const { users, authedUser, questionIds } = this.props;
    const currentUser = users.filter(user => user.id === authedUser);

    const questionsAnsweredIds = questionIds.filter(
      questionId => questionId in currentUser[0].answers
    );

    const questionsUnansweredIds = questionIds.filter(
      questionId => !currentUser[0].answers.hasOwnProperty(questionId)
    );

    const panes = [
      {
        menuItem: "Unanswered",
        pane: {
          key: "tab2",
          content: (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-around"
              }}
            >
              {questionsUnansweredIds.map(id => (
                <QuestionCardUnanswered
                  key={id}
                  questions={this.props.questions}
                  questionsUnansweredIds={questionsUnansweredIds}
                  id={id}
                />
              ))}
            </div>
          )
        }
      },
      {
        menuItem: "Answered",
        pane: {
          key: "tab3",
          content: (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-around"
              }}
            >
              {questionsAnsweredIds.map(id => (
                <QuestionCardAnswered id={id} key={id} />
              ))}
            </div>
          )
        }
      }
    ];
    return (
      <Tab
        className="homeTab"
        panes={panes}
        renderActiveOnly={false}
        grid={{ paneWdith: 2, tabWidth: 16 }}
      />
    );
  }
}

const mapStateToProps = ({ questions, authedUser, users }) => {
  return {
    questionIds: Object.keys(questions).sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    ),
    users: Object.keys(users).map(i => users[i]),
    authedUser
  };
};

export default connect(mapStateToProps)(QuestionTabMenu);
