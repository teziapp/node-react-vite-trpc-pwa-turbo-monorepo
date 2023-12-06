import { Dispatch, SetStateAction } from "react";
import { T_User_Online } from '../../../api/src/controllers/sseEvents.controller';
import { be_url } from "../config";

export const sseSubscription = (setOtherUsersOnline: Dispatch<SetStateAction<Omit<T_User_Online, 'res'>[] | null>>) => {
  const eventSource = new EventSource(`${be_url}/server-side-events`, {withCredentials: true});

  console.log({eventSource});

  eventSource.onerror = (ev) => {
    console.log('sse error', ev, ev.eventPhase);
    eventSource.close();
    // setting an empty array to make it attempt to connect again.
    setOtherUsersOnline((oldState) => (Array.isArray(oldState) && oldState.length === 0)
      ? oldState
      :[]
    );
    
    // need to setInterval & check for active-session-tab closed. Then setup a new connection.
  }

  eventSource.onopen = () => {
    console.log('event source open');
  };

  eventSource.onmessage = (event) => {
    //event.type could be notification / update;
    const parsedData = (event.data[0] === '{' || event.data[0] === '[')
      ? JSON.parse(event.data)
      : event.data;
    console.log({parsedData});
    //do something with the data.
    if (parsedData === 'Success') {
      // setting null so it doesnt attempt to reconnect.
      setOtherUsersOnline(null);
    }
    else {
      eventSource.close();
      if(parsedData === 'Active Connection exists.') {
        // setting null so it doesnt attempt to reconnect.
        setOtherUsersOnline(null);

        // need to setInterval & check for active-session-tab closed. Then setup a new connection.
      }
      else if (parsedData?.activeSessions) {
        setOtherUsersOnline(parsedData.activeSessions);
      }
      else {
        setOtherUsersOnline((oldState) => (Array.isArray(oldState) && oldState.length === 0)
          ? oldState
          :[]
        );
      }
    }
  };

  return {
    eventSource
  };
};