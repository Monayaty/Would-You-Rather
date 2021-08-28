// Imports
import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Segment, Menu, Image, Button } from "semantic-ui-react";
import { setAuthedUser } from "../../actions/authedUser.action";

// Main Class
class Header extends Component {
  state = { activeItem: "dashboard" };
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  handleLogout = (e) => {
    const { dispatch } = this.props;
    dispatch(setAuthedUser(null));
  };
  render() {
    const { activeItem } = this.state;
    return (
      <Segment>
        <Menu attached="top" tabular>
          <Image src="https://i.ibb.co/XzcyqRF/logo.png" size="small" />
          <Menu.Item
            name="Dashboard"
            as={NavLink}
            to="/"
            exact
            active={activeItem === "dashboard"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="New Question"
            as={NavLink}
            to="/add"
            exact
            active={activeItem === "new"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="Leader Board"
            as={NavLink}
            to="/leaderboard"
            exact
            active={activeItem === "leader"}
            onClick={this.handleItemClick}
          />
          <Menu.Menu position="right">
            <Menu.Item style={{ marginRight: "5px" }}>
              {this.props.authedUser ? (
                <Image
                  src={this.props.users[this.props.authedUser].avatarURL}
                  avatar
                  spaced="right"
                  verticalAlign="bottom"
                />
              ) : null}

              {this.props.authedUser
                ? " Hello," + this.props.users[this.props.authedUser].name
                : null}
              <Button
                content="Logout"
                labelPosition="right"
                basic
                compact
                icon="log out"
                size="mini"
                onClick={this.handleLogout}
              />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </Segment>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users,
  };
}

// Export
export default connect(mapStateToProps, mapDispatchToProps)(Header);
