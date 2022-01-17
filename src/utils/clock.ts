import React from 'react';
import moment from 'moment-timezone';
import { timeZones } from '../helpers/constants';

export const Clock = () => {
  const [time, setTime] = React.useState(
    moment(new Date(), 'MM/DD/YYYY HH:mm:ss')
      .tz(timeZones.kinshasa)
      .format(`MMMM D, YYYY (h:mm a)`)
  );

  React.useEffect(() => {
    const time = moment(new Date(), 'MM/DD/YYYY HH:mm:ss')
      .tz(timeZones.kinshasa)
      .format(`MMMM D, YYYY (h:mm a)`);
    setTime(time);
  }, []);

  return { time };
};
