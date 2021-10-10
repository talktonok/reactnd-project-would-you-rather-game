import React from "react";
import { Header } from 'semantic-ui-react';

const LoginHeader = () => (
    <Header as="h4" block attached="top" textAlign="center">
      <Header.Content>Welcome to the Would You Rather App!</Header.Content>
      <Header.Subheader>Please sign in to continue</Header.Subheader>
    </Header>
  );
  export default LoginHeader
