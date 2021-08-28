// Imports
import React, { Component, Fragment } from "react";
import LoadingBar from "react-redux-loading";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { connect } from "react-redux";
import { setInitialData } from "../../actions/user-question.action";
import PropTypes from "prop-types";
import Header from "../mocks/Header";
import Leader from "../mocks/Leader";
import Login from "../mocks/Login";
import NewPoll from "../mocks/NewPoll";
import Poll from "../mocks/Poll";
import Results from "../mocks/Results";
import Tabs from "../mocks/Tabs";
import Pagenotexist from "../mocks/Pagenotexist";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(setInitialData());
  }

  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <LoadingBar />
          <Header />
          <div className="container">
            <Switch>
              <PrivateRoute
                Component={Tabs}
                exact={true}
                path="/"
                authedUser={this.props.authedUser}
              />
              <Route
                exact
                path="/login"
                name="Login"
                // authedUser={this.props.authedUser}
                component={Login}
              />
              <PrivateRoute
                Component={Poll}
                exact={true}
                path="/poll"
                // name="Tabs"
                authedUser={this.props.authedUser}
              />

              <PrivateRoute
                Component={Results}
                exact={true}
                path="/questions/:question_id"
                // name="Tabs"
                authedUser={this.props.authedUser}
              />
              <PrivateRoute
                Component={NewPoll}
                exact={true}
                path="/add"
                // name="Tabs"
                authedUser={this.props.authedUser}
              />
              <PrivateRoute
                Component={Leader}
                exact={true}
                path="/leaderboard"
                // name="Tabs"
                authedUser={this.props.authedUser}
              />
              <PrivateRoute
                Component={Pagenotexist}
                exact={true}
                path="/404"
                authedUser={this.props.authedUser}
              />
              <Redirect to="/404" />
            </Switch>
          </div>
        </Fragment>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  loading: PropTypes.bool.isRequired,
  // loggedOut : PropTypes.bool.isRequired
};

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null,
    authedUser: authedUser,
    // loggedOut: authedUser === "LOGGED_OUT"
  };
}

// Export
export default connect(mapStateToProps)(App);
