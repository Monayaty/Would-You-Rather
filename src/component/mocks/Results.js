// imports
import React, { Component, Fragment } from "react";
import { Segment, Button, Label, Icon, Progress } from "semantic-ui-react";
import { Grid, Image, Header, Form, Radio } from "semantic-ui-react";
import { connect } from "react-redux";
import { setAnswerQuestion } from "../../actions/questions.actions";

class Results extends Component {
  onChange = ({ value }) =>
    this.setState({
      value,
    });
  state = {
    value: "",
  };
  onSubmit = () => {
    let id = this.props.match.params["question_id"];

    const { questions, authedUser, dispatch } = this.props;
    const question = questions[id];
    dispatch(
      setAnswerQuestion({
        authedUser,
        qid: question.id,
        answer: this.state.value,
      })
    );
  };
  render() {
    let id = this.props.match.params["question_id"];

    const { questions, authedUser, users } = this.props;
    const question = questions[id];
    const user = users[question.author];
    const answer = users[authedUser].answers[id];

    const optionOne = question.optionOne.text;
    const optionTwo = question.optionTwo.text;
    const opt1Votes = question.optionOne.votes.length;
    const opt2Votes = question.optionTwo.votes.length;
    const totalVotes = opt1Votes + opt2Votes;
    const opt1Percentage = Math.round((opt1Votes / totalVotes) * 100);
    const opt2Percentage = Math.round((opt2Votes / totalVotes) * 100);
    
    const unanswered = (
      <Grid celled>
        <Grid.Row>
          <Grid.Column width={3}>
            <Image src={user.avatarURL} />
          </Grid.Column>
          <Grid.Column width={13}>
            <Header as="h3">{`${user.name} Asks:`}</Header>
            <Fragment>
              <Header as="h2">Would you rather</Header>
              <Form onSubmit={this.onSubmit}>
                <Form.Field>
                  <Radio
                    label={question.optionOne.text}
                    name="radioGroup"
                    value="optionOne"
                    checked={this.state.value === "optionOne"}
                    onChange={this.onChange}
                  />
                  <br />
                  <Radio
                    label={question.optionTwo.text}
                    name="radioGroup"
                    value="optionTwo"
                    checked={this.state.value === "optionTwo"}
                    onChange={this.onChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Button
                    color="green"
                    size="tiny"
                    fluid
                    positive
                    onSubmit={this.onSubmit}
                    content="Submit"
                  />
                </Form.Field>
              </Form>
            </Fragment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
    const answered = (
      <Grid celled>
        <Grid.Row>
          <Grid.Column width={3}>
            <Image src={user.avatarURL} />
          </Grid.Column>
          <Grid.Column width={13}>
            <Header as="h3">{`${user.name} Asks:`}</Header>
            <Fragment>
              <Header as="h2">Results: </Header>
              <Segment color="green" style={{ backgroundColor: "#baffc0" }}>
                {user.answers[id] === "optionOne" ? (
                  <Label color="pink" ribbon="right" className="vote">
                    <Icon
                      name="outline check circle"
                      size="big"
                      className="compact"
                    />

                    <div style={{ float: "right" }}>
                      You
                      <br />
                      Voted for
                    </div>
                  </Label>
                ) : null}
                <p style={{ fontWeight: "bold" }}>{optionOne}</p>
                <Progress percent={opt1Percentage} progress color="green">
                  {`${opt1Votes} out of ${totalVotes} Votes`}
                </Progress>
              </Segment>
              <Segment color="red" style={{ backgroundColor: "#ffe8ed" }}>
                {user.answers[id] === "optionTwo" ? (
                  <Label color="pink" ribbon="right" className="vote">
                    <Icon
                      name="outline check circle"
                      size="big"
                      className="compact"
                    />

                    <div style={{ float: "right" }}>
                      You
                      <br />
                      Voted for
                    </div>
                  </Label>
                ) : null}
                <p style={{ fontWeight: "bold" }}>{optionTwo}</p>
                <Progress percent={opt2Percentage} progress>
                  {`${opt2Votes} out of ${totalVotes} Votes`}
                </Progress>
              </Segment>
              <Button
                size="tiny"
                floated="right"
                // onClick={this.handleClick}
              >
                Back
              </Button>
            </Fragment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
    return question ? (
      answer ? (
        answered
      ) : (
        unanswered
      )
    ) : (
      <Label>Sorry, This Question does not Exist</Label>
    );
  }
}

function mapStateToProps({ questions, users, authedUser }) {
  return {
    users,
    authedUser,
    questions,
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};
// Export
export default connect(mapStateToProps)(Results);
