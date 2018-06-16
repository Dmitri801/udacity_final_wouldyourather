import React, { Component } from "react";
import { handleSaveNewQuestionAnswer } from "../../actions/shared";
import { connect } from "react-redux";
import {
  Card,
  Button,
  Image,
  Grid,
  Divider,
  Segment,
  Form,
  Icon,
  Statistic,
  Dimmer,
  Loader,
  Message
} from "semantic-ui-react";
import { reduxForm } from "redux-form";
import { Spring } from "react-spring";

class QuestionCardDetail extends Component {
  state = {
    selectedOption: null,
    pollDetail: false,
    loading: false,
    smallScreen: window.innerWidth < 1186
  };

  componentDidUpdate() {
    if (this.state.selectedOption !== null) {
      window.scrollTo(0, 150);
    }
  }

  componentWillMount() {
    const { questions, users, authedUser } = this.props;
    const questionsArr = Object.keys(questions).map(i => questions[i]);
    const revealedCard = questionsArr.filter(
      question => question.id === this.props.match.params.question_id
    );

    revealedCard.map(question => {
      const userAnswer = users[authedUser].answers[question.id];
      if (
        question.optionOne.votes.includes(authedUser) ||
        question.optionTwo.votes.includes(authedUser)
      ) {
        this.setState({
          pollDetail: true
        });
      }
      return userAnswer;
    });

    window.addEventListener("resize", this.updatePollDetail);
  }

  updatePollDetail = () => {
    this.setState({ smallScreen: window.innerWidth < 1186 });
  };

  selectOption = e => {
    this.setState({
      selectedOption: e.target.name,
      loading: true
    });
    setTimeout(() => {
      this.setState({
        loading: false
      });
    }, 400);
  };

  onQuestionAnswerSubmit = (authedUser, qid, answer) => {
    this.setState({
      loading: true
    });
    setTimeout(() => {
      this.setState({
        loading: false
      });
      this.props.handleSaveNewQuestionAnswer({
        authedUser: authedUser,
        qid: qid,
        answer: answer
      });
    }, 400);
    this.setState({
      pollDetail: true
    });
  };

  deactivateClick = e => {
    if (
      e.target.classList.contains("button") ||
      e.target.classList.contains("hidden") ||
      e.target.classList.contains("fitted")
    ) {
    } else {
      this.setState({
        selectedOption: null
      });
    }
  };

  render() {
    const { selectedOption, loading, smallScreen, pollDetail } = this.state;
    const { questions, users, authedUser, history } = this.props;
    const questionsArr = Object.keys(questions).map(i => questions[i]);
    const revealedCard = questionsArr.filter(
      question => question.id === this.props.match.params.question_id
    );
    let card;
    if (revealedCard.length === 0) {
      card = (
        <Message negative size="massive" icon>
          <Icon name="circle notched" loading />
          <Message.Content>
            <Message.Header>404 Not Found</Message.Header>
            <p>This Question Doesn't Actually Exist...</p>
          </Message.Content>
        </Message>
      );
    }
    revealedCard.map(question => {
      const userAnswer = users[authedUser].answers[question.id];
      if (
        question.optionOne.votes.includes(authedUser) ||
        question.optionTwo.votes.includes(authedUser)
      ) {
        return (card = (
          <div>
            <Card
              image={users[revealedCard[0].author].avatarURL}
              header={users[authedUser].name}
              meta={`${question.author} Asked You..`}
              description={`Would You Rather? 
               ${question.optionOne.text} Or
             ${question.optionTwo.text}`}
              extra={
                <div>
                  <Icon color="yellow" name="trophy" size="large" circular />{" "}
                  {selectedOption !== null
                    ? question[selectedOption].text
                    : question[userAnswer].text}
                </div>
              }
            />
          </div>
        ));
      } else {
        return (card = (
          <div>
            <Dimmer active={loading ? true : false}>
              <Loader size="large">Loading</Loader>
            </Dimmer>
            <Card key={question.id} fluid>
              <Card.Content>
                <Image
                  className="cardDetailImage"
                  avatar
                  centered
                  src={
                    question.author === users[question.author].id
                      ? users[question.author].avatarURL
                      : null
                  }
                />
                <Card.Meta>{question.author} Asks..</Card.Meta>
                <Card.Header textAlign="center" style={{ fontSize: "30px" }}>
                  Would You Rather?
                </Card.Header>
                <Card.Description>
                  {loading === false ? (
                    <div>
                      <strong style={{ color: "black", fontSize: "20px" }}>
                        A:{" "}
                      </strong>{" "}
                      <span style={{ fontSize: "20px" }}>
                        {question.optionOne.text}
                      </span>
                    </div>
                  ) : null}
                </Card.Description>
                <Card.Description>
                  {loading === false ? (
                    <div>
                      <strong style={{ color: "black", fontSize: "20px" }}>
                        B:{" "}
                      </strong>
                      <span style={{ fontSize: "20px" }}>
                        {question.optionTwo.text}
                      </span>
                    </div>
                  ) : null}
                </Card.Description>
              </Card.Content>
              {selectedOption !== null &&
                loading === false && (
                  <Card.Content>
                    <Card.Description>
                      {selectedOption === "optionOne" && loading === false ? (
                        <div>
                          <Divider />
                          <p style={{ color: "green" }}>
                            <Icon
                              color="yellow"
                              name="trophy"
                              size="large"
                              circular
                            />{" "}
                            {question.optionOne.text.toUpperCase()}
                          </p>
                        </div>
                      ) : null}
                      {selectedOption === "optionTwo" && loading === false ? (
                        <div>
                          <Divider />
                          <p style={{ color: "red" }}>
                            <Icon
                              color="yellow"
                              name="trophy"
                              size="large"
                              circular
                            />{" "}
                            {question.optionTwo.text.toUpperCase()}
                          </p>
                        </div>
                      ) : null}
                    </Card.Description>
                    <Divider />
                    <Image
                      size="mini"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-ABApllJfJ_9hkM8uc4FcE3cr4zdtFa0vVFxDGQjvP_yOZllw"
                      bordered
                    />
                  </Card.Content>
                )}
              <Card.Content extra>
                <div className="ui two buttons">
                  <Button
                    basic
                    color="green"
                    name="optionOne"
                    onClick={this.selectOption}
                    active={selectedOption === "optionOne" ? true : false}
                  >
                    A
                  </Button>
                  <Button
                    basic
                    color="red"
                    name="optionTwo"
                    onClick={this.selectOption}
                    active={selectedOption === "optionTwo" ? true : false}
                  >
                    B
                  </Button>
                </div>
              </Card.Content>
              <Card.Content extra>
                <div>
                  <Form
                    onSubmit={this.onQuestionAnswerSubmit.bind(
                      this,
                      authedUser,
                      question.id,
                      selectedOption
                    )}
                  >
                    <Button
                      color="black"
                      fluid
                      disabled={
                        selectedOption === null || loading ? true : false
                      }
                      animated={selectedOption === null ? false : "fade"}
                    >
                      <Button.Content visible>Submit</Button.Content>
                      {selectedOption && (
                        <Button.Content hidden>
                          Final Answer <Icon name="angle double right" fitted />
                        </Button.Content>
                      )}
                    </Button>
                  </Form>
                </div>
              </Card.Content>
            </Card>
          </div>
        ));
      }
    });
    //QuestionCardDetail Statistics
    let stats;
    if (this.state.pollDetail) {
      let optionOnePercentage;
      let optionTwoPercentage;
      let totalVotes =
        revealedCard[0].optionOne.votes.length +
        revealedCard[0].optionTwo.votes.length;
      let decimalOne = revealedCard[0].optionOne.votes.length / totalVotes;
      let decimalTwo = revealedCard[0].optionTwo.votes.length / totalVotes;
      optionTwoPercentage = decimalTwo * 100;

      optionOnePercentage = decimalOne * 100;
      stats = (
        <div>
          <Dimmer active={loading && !smallScreen ? true : false}>
            <Loader size="large">Loading</Loader>
          </Dimmer>
          <Statistic.Group>
            <Statistic>
              <Statistic.Value>{totalVotes}</Statistic.Value>
              <Statistic.Label>Total Votes</Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value>
                {revealedCard[0].optionOne.votes.length}
              </Statistic.Value>
              <Statistic.Label>
                {revealedCard[0].optionOne.text}
              </Statistic.Label>
            </Statistic>

            <Statistic>
              <Statistic.Value>
                {revealedCard[0].optionTwo.votes.length}
              </Statistic.Value>
              <Statistic.Label>
                {revealedCard[0].optionTwo.text}
              </Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value>
                {Math.round(optionOnePercentage)}%
              </Statistic.Value>
              <Statistic.Label>
                {revealedCard[0].optionOne.text}
              </Statistic.Label>
            </Statistic>

            <Statistic>
              <Statistic.Value>
                {Math.round(optionTwoPercentage)}%{" "}
              </Statistic.Value>
              <Statistic.Label>
                {revealedCard[0].optionTwo.text}
              </Statistic.Label>
            </Statistic>
          </Statistic.Group>
        </div>
      );
    }
    // RETURN //
    return (
      <div className="cardDetail">
        <Grid columns="equal">
          <Grid.Column className="leaderBtnCol">
            {revealedCard.length > 0 && (
              <Button
                onClick={() => history.goBack()}
                color="grey"
                className="leaderGoBackBtn"
              >
                Go Back
              </Button>
            )}
          </Grid.Column>
          <Grid.Column width={8}>
            <Divider section />
            <Segment
              stacked
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "30px"
              }}
              className="leaderSegment"
              onClick={this.deactivateClick}
            >
              <Card.Group>{card}</Card.Group>
            </Segment>
            <Divider hidden />
            {pollDetail &&
              smallScreen && (
                <div>
                  <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
                    {styles => (
                      <div style={styles}>
                        <Segment
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            padding: "30px"
                          }}
                          className="leaderSegment"
                          stacked
                        >
                          <Card fluid color="red">
                            <Card.Content>
                              <Card.Header textAlign="center">
                                <h1>Stats</h1>
                              </Card.Header>
                            </Card.Content>
                          </Card>
                        </Segment>
                        <Divider hidden />
                        <Dimmer active={loading ? true : false} />
                        <Segment
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            padding: "30px"
                          }}
                          className="leaderSegment"
                          stacked
                        >
                          <Card fluid color="red">
                            <Card.Content>{stats}</Card.Content>
                          </Card>
                        </Segment>
                      </div>
                    )}
                  </Spring>
                </div>
              )}
          </Grid.Column>
          <Grid.Column>
            {pollDetail &&
              !smallScreen && (
                <div>
                  <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
                    {styles => (
                      <div style={styles}>
                        <Segment
                          style={{ marginRight: "30px", minHeight: "100px" }}
                          className="leaderSegment"
                        >
                          <Card fluid color="red">
                            <Card.Content>
                              <Card.Header>
                                <h1>Stats</h1>
                              </Card.Header>
                            </Card.Content>
                          </Card>
                        </Segment>
                        <Divider hidden />
                        <Segment
                          style={{
                            marginRight: "30px",
                            minHeight: "300px",
                            marginTop: "20px"
                          }}
                          className="leaderSegment"
                        >
                          <Card fluid color="red">
                            <Card.Content>{stats}</Card.Content>
                          </Card>
                        </Segment>
                      </div>
                    )}
                  </Spring>
                </div>
              )}
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  questions: state.questions,
  users: state.users,
  authedUser: state.authedUser
});

export default connect(
  mapStateToProps,
  { handleSaveNewQuestionAnswer }
)(reduxForm({ form: "eventForm" })(QuestionCardDetail));
