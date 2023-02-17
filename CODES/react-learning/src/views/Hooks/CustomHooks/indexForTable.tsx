/*
 * @Author: Lee
 * @Date: 2023-02-10 16:35:36
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-10 20:54:06
 * @Description:
 */
import React from 'react';
import { Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import useTableHooks from './useTableHooks';

const mockjs = require('mockjs');

interface DataSourceProps {
  id: string;
  name: string;
  age: string;
}
interface Response {
  code: number;
  data: DataSourceProps[];
  total: number;
}
const Friends: React.FC = () => {
  // -- state
  const service = () => {
    return new Promise<Response>((resolve) => {
      setTimeout(() => {
        resolve(
          mockjs.mock({
            code: 0,
            'data|5': [{ id: '@guid', name: '@cname', 'age|18-50': 0 }],
            total: 20,
          })
        );
      }, 1000);
    });
  };
  const getDataSource = async (current: number) => {
    console.log('当前请求页码：', current);
    const { data, total } = await service();
    return {
      list: data,
      total,
    };
  };

  const { dataSource, onChange, current, loading, total } =
    useTableHooks<DataSourceProps>(getDataSource);

  // -- columns
  const columns: ColumnProps<DataSourceProps>[] = [
    { title: '姓名', dataIndex: 'name' },
    { title: '年龄', dataIndex: 'age' },
  ];

  return (
    <Table
      loading={loading}
      rowKey={'id'}
      dataSource={dataSource}
      columns={columns}
      onChange={onChange}
      pagination={{ current, total, pageSize: 5, showSizeChanger: false }}
    />
  );
};

export default Friends;
