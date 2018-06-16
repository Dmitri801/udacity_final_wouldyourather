import React from "react";
import {
  Grid,
  Segment,
  Button,
  Table,
  Image,
  Header,
  Divider,
  Label
} from "semantic-ui-react";
import { connect } from "react-redux";

const LeaderBoard = ({ users, history, authedUser }) => {
  let tableList = users.map(user => {
    let total = [Object.keys(user.answers).length + user.questions.length];
    return (
      <Table.Row
        key={user.id}
        id={Object.keys(user.answers).length + user.questions.length}
      >
        <Table.Cell>
          {user.id === authedUser && (
            <Label ribbon color="yellow" icon="trophy" content="You're Here" />
          )}
          <Header as="h4" image>
            <Image src={user.avatarURL} rounded size="mini" />
            <Header.Content>{user.id}</Header.Content>
          </Header>
        </Table.Cell>
        <Table.Cell>{user.questions.length}</Table.Cell>
        <Table.Cell>{Object.keys(user.answers).length}</Table.Cell>
        <Table.Cell>{total}</Table.Cell>
      </Table.Row>
    );
  });
  tableList.sort((a, b) => b.props.id - a.props.id);

  return (
    <div className="leaderboard">
      <Grid columns="equal">
        <Grid.Column className="leaderBtnCol">
          <Button
            onClick={() => history.goBack()}
            color="grey"
            className="leaderGoBackBtn"
          >
            Go Back
          </Button>
        </Grid.Column>
        <Grid.Column width={8}>
          <h1 style={{ textAlign: "center" }}>LeaderBoard</h1>
          <Divider section />
          <Segment
            stacked
            style={{ display: "flex", justifyContent: "center" }}
            className="leaderSegment"
          >
            <Table padded size="large" fixed celled selectable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell style={{ padding: "20px" }}>
                    {" "}
                    User
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ padding: "20px" }}>
                    Questions Asked
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ padding: "20px" }}>
                    Questions Answered
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ padding: "20px" }}>
                    Total
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>{tableList}</Table.Body>
            </Table>
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <div />
        </Grid.Column>
      </Grid>
    </div>
  );
};

const mapStateToProps = state => ({
  authedUser: state.authedUser,
  users: Object.keys(state.users).map(i => state.users[i])
});

export default connect(mapStateToProps)(LeaderBoard);
