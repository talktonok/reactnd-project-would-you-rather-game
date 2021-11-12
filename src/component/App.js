import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import { initialDataHandler } from '../actions/index';
import { connect } from 'react-redux';
import Login from './login/Login';
import NavBar from './NavBar';
import Home from './Home';
import Cards from './Cards';
import NewPoll from './NewPoll';
import Leaderboard from './Mazaje';
import Error404 from './Error404';
import {mapAuthStateToProps} from './Map'

class App extends Component {
  componentDidMount() {
    this.props.initialDataHandler();
  }
  render() {
    const { authUser } = this.props;
    return (
      <Router>
        <div className="App">
          {authUser === null ? (
            <Route
              render={() => (
                <ContentGrid>
                  <Login />
                </ContentGrid>
              )}
            />
          ) : (
            <Fragment key={authUser.id}>
              <NavBar />
              <ContentGrid>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/questions/bad_id" component={Error404} />
                  <Route path="/questions/:questionID" component={Cards} />
                  <Route path="/add" component={NewPoll} />
                  <Route path="/leaderboard" component={Leaderboard} />
                  <Route component={Error404} />
                </Switch>
              </ContentGrid>
            </Fragment>
          )}
        </div>
      </Router>
    );
  }
}

const ContentGrid = ({ children }) => (
  <Grid padded="vertically" columns={1} centered>
    <Grid.Row>
      <Grid.Column style={{ maxWidth: 550 }}>{children}</Grid.Column>
    </Grid.Row>
  </Grid>
);




export default connect(
  mapAuthStateToProps,
  { initialDataHandler }
)(App);
