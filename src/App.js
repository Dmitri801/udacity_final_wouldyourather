import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import { fakeAuth } from "./util/fakeAuth";
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect
} from "react-router-dom";
import { handleInitialData } from "./actions/shared";
import Test from "./components/test/test";
import NewQuestionForm from "./components/NewQuestion/NewQuestionForm";
import QuestionCardDetail from "./components/Question/QuestionCardDetail";
import HomePage from "./components/Home/HomePage";
import LeaderBoard from "./components/Leaderboard/LeaderBoard.js";
import Navbar from "./components/Layout/Nav/Navbar";
import Login from "./components/Auth/Login";
import NoMatch from "./components/Layout/NoMatch";
import LoadingBar from "react-redux-loading";
import Footer from "./components/Layout/Footer/Footer";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      fakeAuth.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

class App extends Component {
  componentDidMount() {
    this.props.handleInitialData();
  }
  render() {
    return (
      <Router>
        <div className="App">
          <LoadingBar
            style={{ backgroundColor: "rgba(59, 59, 59, 1)", height: "5px" }}
          />

          {this.props.loading ? null : (
            <div
              style={{
                display: "flex",
                minHeight: "100vh",
                flexDirection: "column"
              }}
            >
              <Navbar />
              <div style={{ flex: 1 }}>
                <Container className="main">
                  <Switch>
                    <Route path="/login" component={Login} />
                    <PrivateRoute path="/leaderboard" component={LeaderBoard} />
                    <PrivateRoute path="/home" component={HomePage} />
                    <PrivateRoute path="/add" component={NewQuestionForm} />
                    <PrivateRoute
                      path="/question/:question_id"
                      component={QuestionCardDetail}
                    />
                    <Route path="/test" component={Test} />
                    <Redirect exact from="/" to="/login" />
                    <Route component={NoMatch} />
                  </Switch>
                </Container>
              </div>
              <Footer />
            </div>
          )}
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.authedUser === null,
    authedUser: state.authedUser
  };
};

export default connect(
  mapStateToProps,
  { handleInitialData }
)(App);
