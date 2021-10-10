import React from 'react';
import {
    Label,
    Icon
  } from 'semantic-ui-react';

const VoteLabel = () => (
    <Label color="orange" ribbon="right" className="vote">
      <Icon name="check circle outline" size="big" className="compact" />
      <div style={{ float: 'right' }}>
        Your
        <br />
        Vote
      </div>
    </Label>
  );
  export default VoteLabel;