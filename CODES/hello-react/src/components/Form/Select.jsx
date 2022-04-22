/*
 * @Author: Lee
 * @Date: 2022-04-22 18:10:15
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-22 18:12:26
 */
import { Component } from 'react';

export default class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }
  handleChange(event) {
    this.setState({
      value: event.target.value,
    });
  }
  render() {
    return (
      <form >
        <select value={this.state.value} onChange={this.handleChange.bind(this)}>
          <option value=''>-请选择您所在的城市-</option>
          <option value='北京'>北京</option>
          <option value='上海'>上海</option>
          <option value='成都'>成都</option>
          <option value='广州'>广州</option>
          <option value='西安'>西安</option>
          <option value='昆明'>昆明</option>
        </select>
        <p>您所在的城市是：{this.state.value}</p>
      </form>
    );
  }
}
