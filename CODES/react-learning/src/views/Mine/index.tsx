/*
 * @Author: Lee
 * @Date: 2023-02-08 15:28:03
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-09 11:00:56
 * @Description:
 */
import React from 'react';
import { redirect, useLoaderData } from 'react-router-dom';

// +++++++++++++
interface InfosType {
  name: string;
  job: string;
}
interface ResponseType {
  code: number;
  data: InfosType;
}
const getInfos = () =>
  new Promise<ResponseType>((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        data: { name: '张三', job: '程序猿' },
      });
    }, 2000);
  });
export const loader = async () => {
  console.log('页面加载前请求用户信息...');
  const { code, data } = await getInfos();
  if (code === 401) {
    return redirect('/login');
  }
  return data;
};
// +++++++++++++

const Mine: React.FC = () => {
  // +++++++++++++
  // -- 访问 loader 传递的数据
  const infos = useLoaderData() as InfosType;
  // +++++++++++++
  return (
    <div className='page'>
      <b style={{ letterSpacing: 1, color: 'blue' }}>This is 「Mine」 page.</b>
      {/* +++++++++++++ */}
      <p>{infos.name} - {infos.job}</p>
      {/* +++++++++++++ */}
    </div>
  );
};
export default Mine;
