/*
 * @Author: Lee
 * @Date: 2023-02-08 09:53:05
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-08 10:01:06
 * @Description:
 */
import React from 'react';
import Dialog from './Dialog';

class Combination extends React.Component {
  // -- render
  render(): React.ReactNode {
    return (
      <>
        <Dialog title='Tips' message='Please login after operation.' />
      </>
    );
  }
}
export default Combination;
