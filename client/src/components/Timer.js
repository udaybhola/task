import React, { useEffect, useState } from "react";

const Timer = ({ timer, onRemove }) => {
  const [time, setTime] = useState(timer.startTime);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval = null;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  const handlePause = () => {
    setIsActive(false);
  };

  const handleResume = () => {
    setIsActive(true);
  };

  return (
    <div>
      <h3>{timer.name}</h3>
      <div>{time}s</div>
      <button onClick={handlePause}>Pause</button>
      <button onClick={handleResume}>Resume</button>
      <button onClick={() => onRemove(timer.id)}>Remove</button>
    </div>
  );
};

export default Timer;
