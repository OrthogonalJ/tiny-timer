import React, { useState, useCallback} from 'react';

import { useInterval } from '../../utils/intervalHooks';
import { formatTime, millisecondsSince } from '../../utils/timeUtils';
import './App.less';

const { ipcRenderer } = window.require('electron');

function App() {
  const [duration, setDuration] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(null);
  const [isOn, setIsOn] = useState<boolean>(false);

  // HELPERS & EVENT HANDLERS //

  const updateDuration = useCallback(() => {
    setDuration(millisecondsSince(startTime));
  }, [startTime, isOn]);

  const start = useCallback(() => {
    setStartTime(new Date().getTime() - duration);
    setIsOn(true);
  }, [startTime, duration]);

  const stop = useCallback(() => {
    setIsOn(false);
  }, []);

  const reset = useCallback(() => {
    setIsOn(false);
    setStartTime(new Date().getTime());
    setDuration(0);
  }, []);

  const toggleAlwaysOnTop = useCallback((event: any) => {
    if (event.target.checked) {
      ipcRenderer.send('enable-always-on-top');
    } else {
      ipcRenderer.send('disable-always-on-top');
    }
  }, []);

  // EFFECTS //

  useInterval(updateDuration, isOn ? 1 : null);

  // RENDERING //

  const startStopBtn = (
    <button onClick={isOn ? stop : start}>
      {isOn ? 'stop' : 'start'}
    </button>
  );

  return (
    <div className="app">
      <div className="time-container"
           onClick={isOn ? stop : start}
           onDoubleClick={reset}>
        <div className="time">
          {formatTime(duration)}
        </div>
      </div>
      <div className="button-container">
        {startStopBtn}
        <button onClick={reset}>reset</button>
      </div>
      <div className="options-container">
        <label>
          Always on top:
          <input type="checkbox" onChange={toggleAlwaysOnTop}/>
        </label>
      </div>
    </div>
  );
}

export default App;
