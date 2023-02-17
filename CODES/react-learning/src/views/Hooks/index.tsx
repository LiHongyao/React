/*
 * @Author: Lee
 * @Date: 2023-02-09 17:47:11
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-10 15:41:32
 * @Description:
 */
/*
 * @Author: Lee
 * @Date: 2023-02-09 17:47:11
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-10 13:26:47
 * @Description:
 */
/*
 * @Author: Lee
 * @Date: 2023-02-09 17:47:11
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-10 12:21:26
 * @Description:
 */

import React, { useReducer } from 'react';
import { initialState, reducer } from 'src/store';
import { AppContext } from 'src/context_for_reducer';
import IUseState from './IUseState';
import IUseEffect from './IUseEffect';
import IUseContext from './IUseContext';
import IUseReducer from './IUseReducer';
import ReducerContextTest from './ReducerContextTest';
import MemoAndCallback from './MemoAndCallback';
import IUseRefs from './IUseRefs';
import IUseImperativeHandle from './IUseImperativeHandle';
import IUseLayoutEffect from './IUseLayoutEffect';
import CustomHooks from './CustomHooks/indexForTable';
const HooksTest: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div className='page'>
      {/* 1. use state */}
      <IUseState />
      {/* 2. use effect */}
      <IUseEffect />
      {/* 3. use context */}
      <IUseContext />
      {/* 4. use reducer */}
      <IUseReducer />
      {/* 5. reducer & context */}
      <AppContext.Provider value={{ state, dispatch }}>
        <ReducerContextTest />
      </AppContext.Provider>
      {/* 6. useMemo & useCallback */}
      <MemoAndCallback />
      {/* 7. useRefs & forwradref & useImperativeHandle */}
      <IUseRefs />
      {/* 8. useImperativeHandle */}
      <IUseImperativeHandle />
      {/* 9. useLayoutEffect */}
      <IUseLayoutEffect />
      {/* 10. custom hooks */}
      <CustomHooks />
    </div>
  );
};
export default HooksTest;
