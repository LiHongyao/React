/*
 * @Author: Lee
 * @Date: 2023-02-10 15:41:11
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-10 16:27:41
 * @Description:
 */

import React, { useEffect, useState } from 'react';

/********************
 ** 自定义Hooks：负责处理数据逻辑
 ********************/
const useContent = (id: number) => {
  // -- state
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  // -- effects
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const msgs = [
        "This is 1'th message.",
        "This is 2'th message.",
        "This is 3'th message.",
      ];
      setLoading(false);
      setMsg(msgs[id]);
    }, 1000);
  }, [id]);

  return [loading, msg];
};

/********************
 ** Content：负责渲染
 ********************/
interface ContentProps {
  id: number;
}
const Content: React.FC<ContentProps> = (props) => {
  const [loading, msg] = useContent(props.id);
  return <p>{loading ? 'Loading...' : msg}</p>;
};

/********************
 ** Tabs：负责切换
 ********************/
const Tabs: React.FC = () => {
  // -- state
  const [id, setId] = useState(0);
  // -- renders
  return (
    <div className='tabs'>
      <div className='tab-navs'>
        <button onClick={() => setId(0)}>BUTTON-1</button>
        <button onClick={() => setId(1)}>BUTTON-2</button>
        <button onClick={() => setId(2)}>BUTTON-3</button>
      </div>
      <div className='tab-contents'>
        <Content id={id} />
      </div>
    </div>
  );
};

export default Tabs;
