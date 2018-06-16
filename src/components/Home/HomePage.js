import React, { Component } from "react";
import QuestionTabMenu from "../Question/QuestionTabMenu";
import { handleInitialData } from "../../actions/shared";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Grid, Button } from "semantic-ui-react";

class HomePage extends Component {
  render() {
    return (
      <div className="home">
        <Grid columns={1} padded>
          <Grid.Row>
            <Grid.Column>
              <QuestionTabMenu questions={this.props.questions} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Button
                as={Link}
                to="/add"
                circular
                style={{ color: "black" }}
                fluid
                inverted
                color="black"
                className="askBtn"
              >
                Ask A Question..
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  questions: Object.keys(state.questions).map(i => state.questions[i])
});

export default connect(
  mapStateToProps,
  { handleInitialData }
)(HomePage);
