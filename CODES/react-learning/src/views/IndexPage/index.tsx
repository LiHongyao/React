/*
 * @Author: Lee
 * @Date: 2023-02-08 13:53:44
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-09 11:29:36
 * @Description:
 */

import React from 'react';
import { Link } from 'react-router-dom';
const IndexPage: React.FC = () => {
  return (
    <div className='page'>
      <b style={{ letterSpacing: 1, color: 'green' }}>
        This is 「Index」 page.
      </b>
      <p>
        <Link className='link'  to={'/details?id=9527'} state={{ name: '张三', job: '前端工程师' }}>
          Jump To Details
        </Link>
      </p>
    </div>
  );
};
export default IndexPage;
