import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Menu,
  Image,
  Button,
  Segment,
  Container
} from 'semantic-ui-react';
import { createMedia } from "@artsy/fresnel";
import { setUserAuth } from '../actions/AuthUsers';

class NavBar extends Component {
  logoutHandler = e => {
    e.preventDefault();
    this.props.setUserAuth(null);
  };



  render() {
    const { authUser, users } = this.props;
    const AppMedia = createMedia({
      breakpoints: {
        mobile: 320,
        tablet: 768,
        computer: 992,
        largeScreen: 1200,
        widescreen: 1920
      }
    });

    const mediaStyles = AppMedia.createMediaStyle();

    //const { Media, MediaContextProvider } = AppMedia;
    const {MediaContextProvider } = AppMedia;


    return (
      <Container>

<style>{mediaStyles}</style>
    <MediaContextProvider>
      <Segment as={Menu} key={authUser} at="mobile">
      <Menu.Item name="home" as={NavLink} to="/" exact />
          <Menu.Item name="new poll" as={NavLink} to="/add" />
          <Menu.Item name="leader board" as={NavLink} to="/leaderboard" />
          <Menu.Menu position="right">
            <Menu.Item>
              <span>
                <Image
                  src={users[authUser].avatarURL}
                  avatar
                  spaced="right"
                  verticalAlign="bottom"
                />
                {users[authUser].name}
              </span>
            </Menu.Item>
            <Menu.Item>
              <Button
                content="Logout"
                labelPosition="right"
                basic
                compact
                icon="log out"
                size="mini"
                onClick={this.logoutHandler}
              />
            </Menu.Item>
          </Menu.Menu>
      </Segment>
      

    </MediaContextProvider>        
      </Container>
    );
  }
}

function mapStateToProps({ users, authUser }) {
  return {
    authUser,
    users
  };
}

export default connect(
  mapStateToProps,
  { setUserAuth }
)(NavBar);
