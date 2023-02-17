/*
 * @Author: Lee
 * @Date: 2023-02-08 10:15:15
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-08 12:00:44
 * @Description:
 */

import React from 'react';
import json from './data.json';

interface IProps {
  filterText: string;
  inStockOnly: boolean;
}

class ProductTable extends React.Component<IProps> {
  // -- methods
  groupBy<T = any>(source: Array<T>, field: keyof T) {
    return source.reduce((group: Record<string, T[]>, product: T) => {
      const k = product[field] as string;
      group[k] = group[k] ?? [];
      group[k].push(product);
      return group;
    }, {});
  }

  getData = () => {
    const { filterText, inStockOnly } = this.props;
    // -- 过滤数据
    const filters = json.filter((item) => {
      const r = new RegExp(filterText);
      return r.test(item.name);
    });
    // --
    let t = inStockOnly
      ? filters.filter((item) => item.stocked === inStockOnly)
      : filters;
    // -- 组合数据
    return this.groupBy<typeof json[0]>(t, 'category');
  };
  render(): React.ReactNode {
    const data = this.getData();
    return (
      <div>
        <b>Name —— Price</b>
        {Object.keys(data).map((groupName: string) => (
          <div key={groupName}>
            <h5>{groupName}</h5>
            {data![groupName].map((item) => (
              <div key={item.name}>
                {item.name} - {item.price}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}
export default ProductTable;
