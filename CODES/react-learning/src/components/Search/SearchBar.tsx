/*
 * @Author: Lee
 * @Date: 2023-02-08 10:13:15
 * @LastEditors: Lee
 * @LastEditTime: 2023-02-08 10:46:13
 * @Description:
 */
import React from 'react';

interface IProps {
  filterText: string;
  inStockOnly: boolean;
  onChange: (k: string, v: string | boolean) => void;
}
class SearchBar extends React.Component<IProps> {
  // -- events
  onInputChange = ($event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = $event.target;
    this.props.onChange(name, name === 'filterText' ? value : checked);
  };

  // -- render
  render(): React.ReactNode {
    return (
      <div className='searchBar'>
        <input
          name='filterText'
          placeholder='Search...'
          value={this.props.filterText}
          onChange={this.onInputChange}
        />
        <div>
          <input
            name='inStockOnly'
            type='checkbox'
            defaultChecked={this.props.inStockOnly}
            onChange={this.onInputChange}
          />
          <span>Only show products in stock</span>
        </div>
      </div>
    );
  }
}

export default SearchBar;
