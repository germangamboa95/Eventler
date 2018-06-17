import React from "react";
import { InputGroup, Input } from 'reactstrap';

const InviteLink = props => {

  return (
    <InputGroup>
      <Input   readOnly value={window.location.origin + "/joinEvent/" + props.event_id} />
    </InputGroup>
  );
};

export default InviteLink;
