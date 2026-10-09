'use client';
import React from 'react';

const formatOptions: Intl.DateTimeFormatOptions = {
  timeStyle: 'short',
  timeZone: 'America/New_York',
};

function CurrentTime() {
  const [timeString, setTimeString] = React.useState(
    new Date().toLocaleTimeString('en-US', formatOptions)
  );

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimeString(new Date().toLocaleTimeString('en-US', formatOptions));
    });
    return () => clearInterval(interval);
  }, []);

  return <span>{timeString}</span>;
}

export default CurrentTime;
