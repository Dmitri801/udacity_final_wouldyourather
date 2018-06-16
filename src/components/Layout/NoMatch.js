import React from "react";
import { Message, Icon } from "semantic-ui-react";

const NoMatch = () => {
  return (
    <div style={{ marginTop: "100px", textAlign: "center" }}>
      <Message negative size="massive" icon>
        <Icon name="circle notched" loading />
        <Message.Content>
          <Message.Header>404 Not Found</Message.Header>
          <p>This Page Doesn't Actually Exist...</p>
        </Message.Content>
      </Message>
    </div>
  );
};

export default NoMatch;
