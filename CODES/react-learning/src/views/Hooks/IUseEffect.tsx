import React, { useEffect, useState } from 'react';

const App: React.FC = () => {
  // -- state
  const [times, setTimes] = useState(0);
  // -- effects
  // -- 相当于 componentDidMount 和 componentDidUpdate
  useEffect(() => {
    document.title = `You clicked ${times} times`;
  });

  // -- renders
  return (
    <div className='page'>
      <p>You Click the Button {times} times.</p>
      <button type='button' onClick={() => setTimes(times + 1)}>
        Tap me.
      </button>
    </div>
  );
};

export default App;
