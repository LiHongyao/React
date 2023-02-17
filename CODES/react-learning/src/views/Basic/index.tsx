import React from 'react';
import JSXs from 'src/components/JSXs';
import Comps from 'src/components/Comps';
import State from 'src/components/State';
import LifeCircles from 'src/components/LifeCircles';
import Events from 'src/components/Events';
import ConditionalRendering from 'src/components/ConditionalRendering';
import ListRendering from 'src/components/ListRendering';
import { Forms } from 'src/components/Forms';
import StateLift from 'src/components/StateLift';
import Combination from 'src/components/Combination';
import Search from 'src/components/Search';
import AppContext from 'src/AppContext';
import RefsExample from 'src/components/Refs';
const Basic: React.FC = () => {
  return (
    <div className='App'>
      {/* 1. JSX */}
      {/* <JSXs /> */}
      {/* 2. Components */}
      {/* <Comps /> */}
      {/* 3. State */}
      {/* <State /> */}
      {/* 4. Life Circles */}
      {/* <LifeCircles defaultCount={1} /> */}
      {/* 5. Events */}
      {/* <Events /> */}
      {/* 6. Conditional Rendering */}
      {/* <ConditionalRendering /> */}
      {/* 7. List Rendering */}
      {/* <ListRendering /> */}
      {/* 8. Forms */}
      {/* <Forms /> */}
      {/* 9. State Lift */}
      {/* <StateLift /> */}
      {/* 10. Combination */}
      {/* <Combination /> */}
      {/* 11. Search */}
      {/* <Search /> */}
      {/* 12. Context */}
      {/* <AppContext /> */}
      {/* 13. refs */}
      <RefsExample />
    </div>
  );
};

export default Basic;
