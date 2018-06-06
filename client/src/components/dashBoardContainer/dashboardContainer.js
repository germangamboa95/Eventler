import React from "react";
import EventTable from "../eventTable/";
import Notifications from '../Notifications';


const DashContainer = props => {
  console.log('asdfghjk')
  return (
    <div>
      <Notifications {...props}/>
      <EventTable {...props} />
    </div>
  );
};
export default DashContainer;
