import React, { useState } from "react";
import { flushSync } from "react-dom";

const Test: React.FC = () => {
  // -- state
  const [times, setTimes] = useState(0);
  // -- renders
  return (
    <div className="page">
      <p>You Click the Button {times /** 读取State*/} times.</p>
      <button
        type="button"
        onClick={() => {
          /** 更新State*/
          setTimes(times + 1);
        
        }}
      >
        Tap
      </button>
    </div>
  );
};

export default Test;
