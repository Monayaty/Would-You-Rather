// Imports
import React, { Component } from "react";
import { Container, Header, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

class Pagenotexist extends Component { 
  render() {
    return (
      <Container>
        <Header as="h1">Page is not Exit, Please Go to Dashboard</Header>
        <Link to="/">
          <Button secondary>Go Home</Button>
        </Link>
      </Container>
    );
  }
}

// Export
export default Pagenotexist;
