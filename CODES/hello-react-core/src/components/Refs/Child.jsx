/*
 * @Author: Lee
 * @Date: 2022-04-26 13:47:14
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-26 13:52:15
 */

import React from 'react';

const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className='FancyButton'>
    {props.children}
  </button>
));
export default FancyButton;
