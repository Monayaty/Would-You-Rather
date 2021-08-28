// Imports
import React, { Fragment, Component } from "react";
import { Divider, Grid, Image, Header, Form, Button } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAddQuestion } from "../../actions/questions.actions";

class NewPoll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionOneText: "",
      optionTwoText: "",
      submitted: false,
    };
  }
  onChangeOption1 = (e) => {
    const optionOneText = e.target.value;
    this.setState(() => ({
      optionOneText,
    }));
  };
  onChangeOption2 = (e) => {
    const optionTwoText = e.target.value;
    this.setState(() => ({
      optionTwoText,
    }));
  };
  onSubmit = (e) => {
    e.preventDefault();
    const { optionOneText, optionTwoText } = this.state;
    const { dispatch, authedUser } = this.props;
    dispatch(
      setAddQuestion({ optionOneText, optionTwoText, author: authedUser })
    ).then(() => {
      this.setState(() => ({
        submitted: true,
        optionOneText: "",
        optionTwoText: "",
      }));
    });
  };

  render() {
    const disabled =
      this.state.optionOneText === "" || this.state.optionTwoText === "";
    const { optionOneText, optionTwoText, submitted } = this.state;
    if (submitted) {
      return <Redirect to="/" />;
    }
    return (
      <Grid celled>
        <Grid.Row>
          <Grid.Column width={3}>
            <Image src={this.props.users[this.props.authedUser].avatarURL} />
          </Grid.Column>
          <Grid.Column width={13}>
            <Header as="h3">
              {this.props.users[this.props.authedUser].name}: Create a new Poll
            </Header>
            <Fragment>
              <Header as="h2">Would you rather</Header>
              <Form onSubmit={this.onSubmit}>
                <Form.Input
                  id="option1"
                  placeholder="Enter option one..."
                  value={optionOneText}
                  onChange={this.onChangeOption1}
                  required
                />
                <Divider horizontal>Or</Divider>
                <Form.Input
                  id="option2"
                  placeholder="Enter option two..."
                  value={optionTwoText}
                  onChange={this.onChangeOption2}
                  required
                />
                <Form.Field>
                  <Button
                    color="green"
                    size="tiny"
                    fluid
                    positive
                    disabled={disabled}
                    content="Submit"
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

function mapStateToProps({ users, authedUser }) {
  return { users, authedUser };
}
// Export
export default connect(mapStateToProps)(NewPoll);
