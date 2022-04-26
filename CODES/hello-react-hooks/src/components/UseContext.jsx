/*
 * @Author: Lee
 * @Date: 2022-04-26 14:02:11
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-26 14:04:28
 */

import * as React from 'react';
import AppContext from '../context';
export default function Test() {
  // -- context
  const { name, job } = React.useContext(AppContext);
  return (
    <div className='test'>
      {name} - {job}
    </div>
  );
}
