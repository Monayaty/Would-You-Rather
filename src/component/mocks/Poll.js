// imports
import React, { Component, Fragment } from "react";
import { Grid, Image, Header, Form, Button } from "semantic-ui-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";

class Poll extends Component {
  static propTypes = {
    authedUser: PropTypes.string.isRequired,
    question: PropTypes.object.isRequired,
  };

  state = {
    value: "",
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { id } = this.props.question;

    this.props.history.push(`/questions/${id}`);
  };

  render() {
    const buttonColor = {
      blue: {
        name: "blue",
        hex: "#2185d0",
      },
      green: {
        name: "green",
        hex: "#21ba45",
      },
    };
    const { author } = this.props.question;
    // const disabled =
    //   this.props.unanswered && this.state.value === "" ? true : false;
    // const radioDiabled = this.props.unanswered === false ? true : false;
    const btnColor =
      this.props.unanswered === true ? buttonColor.green : buttonColor.blue;
    const btnContent = "View Poll";
    const user = Object.values(this.props.users).filter(
      (user) => user.id === author
    );
    return (
      <Grid celled>
        <Grid.Row>
          <Grid.Column width={3}>
            <Image src={user[0].avatarURL} />
          </Grid.Column>
          <Grid.Column width={13}>
            <Header as="h3">{`${user[0].name} Asks:`}</Header>
            <Fragment>
              <Header as="h2">Would you rather</Header>
              <Form onSubmit={this.onSubmit}>
                <p>...{this.props.question.optionOne.text}</p>
                
                <Form.Field>
                  <Button
                    color={btnColor.name}
                    size="tiny"
                    fluid
                    positive
                    content={btnContent}
                  />
                </Form.Field>
              </Form>
            </Fragment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return { users: state.users };
}
const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};
// Export
export default withRouter(connect(mapStateToProps)(Poll));
