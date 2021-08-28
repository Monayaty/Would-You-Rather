// Imports
import React, { Component } from "react";
import { Segment, Image, Form } from "semantic-ui-react";
import "../../assets/style/login.css";
import { setAuthedUser } from "../../actions/authedUser.action";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Tap from "./Tabs";

// Main Class
class Login extends Component {
  state = {
    authedUser: null,
  };
  componentDidMount() {
    if (this.state.authedUser) {
      return (
        <Redirect
          to={{
            pathname: "/",
            Component: Tap,
            exact: true,
            authedUser: this.props.authedUser,
          }}
        />
      );
    }
  }
  componentDidUpdate() {
    if (this.state.authedUser) {
      if (this.props.location.path) {
        if (this.props.location.path === "/questions/:question_id") {
          this.props.history.push("/404");
        } else this.props.history.push(this.props.location.path);
      } else this.props.history.push("/");
    }
  }
  onChange = (e, { value }) => {
    this.setState({
      value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.setState({ authedUser: this.state.value });
    this.props.dispatch(setAuthedUser(this.state.value));
  };

  selectOptions = () => {
    const { users } = this.props;
    return Object.keys(users).map((userId) => ({
      key: users[userId].id,
      text: users[userId].name,
      value: users[userId].id,
      image: users[userId].avatarURL,
    }));
  };

  render() {
    const { value } = this.state;
    const disabled = value === "" ? true : false;
    return (
      <Segment>
        <Form onSubmit={this.onSubmit}>
          <Image src="https://i.ibb.co/XzcyqRF/logo.png" size="medium" centered />
          <Form.Select
            placeholder="Select User Name"
            centered="true"
            scrolling
            required
            label="Please, Log in to Continue playing"
            options={this.selectOptions()}
            value={value}
            onChange={this.onChange}
          />
          <Form.Button
            type="submit"
            disabled={disabled}
            // onClick={this.onSubmit}
            className="signinBtn"
            primary
          >
            Login
          </Form.Button>
        </Form>
      </Segment>
    );
  }
}

const mapStateToProps = (state) => state;

// Export
export default connect(mapStateToProps)(Login);
