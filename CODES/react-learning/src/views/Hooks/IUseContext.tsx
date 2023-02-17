/*
 * @Author: Lee
 * @Date: 2023-02-09 20:45:36
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-09 20:48:31
 * @Description:
 */
import React, { useContext } from 'react';
import { AppContext } from 'src/context';

const Test: React.FC = () => {
  // -- context
  const context = useContext(AppContext);
  return (
    <p>
      {context?.name} - {context?.job}
    </p>
  );
};
export default Test;
