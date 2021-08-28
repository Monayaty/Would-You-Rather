// Imports
import React, { Fragment, Component } from 'react';
import { Segment, Label, Header, Image, Grid, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const color = ['blue','green','yellow'];
class Leader extends Component{
    static propTypes = {
        leaderData: PropTypes.array.isRequired
    }
    render(){
        const { leaderData } = this.props;

        return(
            <Fragment>
                {
                    leaderData.map((user, id) => (
                        <Segment key={user.id}>
                            <Label corner="left" icon="trophy" color={color[id]} />
                            <Grid padded divided>
                                <Grid.Row>
                                    <Grid.Column width={3}>
                                        <Image src={user.avatarURL} />
                                    </Grid.Column>
                                    <Grid.Column width={9}>
                                        <Header as='h2' textAlign="center">
                                            {user.name}
                                        </Header>
                                        <Grid>
                                            <Grid.Column width={12}>
                                                Answered Questions
                                            </Grid.Column>

                                            <Grid.Column width={4}>
                                                {user.answerCount}
                                            </Grid.Column>
                                        </Grid>
                                        <Divider />
                                        <Grid>
                                            <Grid.Column width={12}>
                                                Created Questions
                                            </Grid.Column>
                                            <Grid.Column width= {4}>
                                                {user.questionCount}    
                                            </Grid.Column>
                                        </Grid>
                                    </Grid.Column>
                                    <Grid.Column textAlign = "center" width={4}>
                                        <Segment>
                                            <Header as="h5" attached="top" content="Total" block />
                                            <Segment>
                                                <Label circular color = "red" size = "big">
                                                    {user.questionCount + user.answerCount}
                                                </Label>
                                            </Segment>
                                        </Segment>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Segment>
                    ))
                }
            </Fragment>
        )
    }
}

function mapStateToProps({ users }) {
    const leaderData = Object.values(users).map(user =>({
        id: user.id,
        name: user.name,
        avatarURL : user.avatarURL,
        questionCount : user.questions.length,
        answerCount: Object.values(user.answers).length,
        total: Object.values(user.answers).length + user.questions.length
    })).sort((a, b) => a.total - b.total).reverse().slice(0, 3);
    return {
        leaderData
    }
}
// Export
export default connect(mapStateToProps)(Leader);