/*
 * @Author: Lee
 * @Date: 2023-02-08 10:07:01
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-08 11:00:25
 * @Description:
 */

import React from 'react';
import SearchBar from './SearchBar';
import ProductTable from './ProductTable';

interface IState {
  filterText: string;
  inStockOnly: boolean;
}
class Search extends React.Component<any, IState> {
  // -- constructor
  constructor(props: any) {
    super(props);
    this.state = {
      filterText: '',
      inStockOnly: false,
    };
  }
  // -- events
  onChange = (k: string, v: string | boolean) => {
    this.setState({
      [k]: v,
    } as Pick<IState, keyof IState>);
  };
  // -- render
  render(): React.ReactNode {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onChange={this.onChange}
        />
        <ProductTable
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
        />
      </div>
    );
  }
}

export default Search;
