import React, { useEffect, useState } from "react";

const WorldClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>World Clock</h2>
      <div>{time.toLocaleTimeString()}</div>
    </div>
  );
};

export default WorldClock;
