import React from "react";
import EventTable from "../eventTable/";
import Notifications from '../Notifications';

const DashContainer = props => {
  console.log(props, "asdf");
  return (
    <div>
      <Notifications {...props}/>
      <EventTable {...props} />
    </div>
  );
};
export default DashContainer;
