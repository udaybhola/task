import axios from "axios";
import React, { useEffect, useState } from "react";
import Timer from "./Timer";

const TimerList = () => {
  const [timers, setTimers] = useState([]);
  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:9000/timers")
      .then((response) => setTimers(response.data))
      .catch((error) => console.error(error));
  }, []);

  const addTimer = () => {
    const newTimer = {
      name,
      startTime: parseInt(startTime, 10),
    };
    axios
      .post("http://localhost:9000/timers", newTimer)
      .then((response) => setTimers([...timers, response.data]))
      .catch((error) => console.error(error));
  };

  const removeTimer = (id) => {
    axios
      .delete(`http://localhost:9000/timers/${id}`)
      .then(() => setTimers(timers.filter((timer) => timer._id !== id)))
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Timer Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Start Time in seconds"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
      />
      <button onClick={addTimer}>Add Timer</button>
      <div>
        {timers.map((timer) => (
          <Timer key={timer._id} timer={timer} onRemove={removeTimer} />
        ))}
      </div>
    </div>
  );
};

export default TimerList;
