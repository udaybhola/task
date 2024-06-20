import React from "react";
import TimerList from "./components/TimerList";
import WorldClock from "./components/WorldClock";

const App = () => {
  return (
    <div>
      <h1>Countdown Timer & World Clock</h1>
      <WorldClock />
      <TimerList />
    </div>
  );
};

export default App;
