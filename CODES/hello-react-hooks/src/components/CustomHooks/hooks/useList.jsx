/*
 * @Author: Lee
 * @Date: 2022-04-26 17:02:34
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-26 17:05:49
 */

import * as React from 'react';

export default function useList() {
  // -- state
  const [list, setList] = React.useState(null);
  // -- effects
  React.useEffect(() => {
    req().then((r) => {
      setList(r.data);
    });
  }, []);
  return {
    list,
  };
}

function req() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        code: 0,
        data: [
          { id: 1, name: '张三', job: '前端工程师' },
          { id: 2, name: '李四', job: '后端工程师' },
          { id: 3, name: '赵二', job: '测试工程师' },
        ],
      });
    }, 1000);
  });
}
