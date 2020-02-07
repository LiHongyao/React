import React from 'react';
import Test from './components/Test';
import AppContext from './context';
const App = () => {
  return (
    <AppContext.Provider value={{username: 'Muzili', tel: '17398888669'}}>
      <div className="App">
        < Test />
      </div>
    </AppContext.Provider>
  );
}
export default App;



