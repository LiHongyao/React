/*
 * @Author: Lee
 * @Date: 2022-04-11 16:11:01
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-18 15:51:43
 */
import { Component } from 'react';
import PropTypes from 'prop-types';

class Child extends Component {
  // -- render
  render() {
    return (
      <div className='page'>
        {this.props.name} - {this.props.age} - {this.props.job}
        <br />
        <br />
        <button
          type='button'
          onClick={() => {
            this.props.tap('天道酬勤');
          }}
        >
          发送消息给父组件
        </button>
      </div>
    );
  }
}

// -- 属性验证
Child.propTypes = {
  // → 字符串
  name: PropTypes.string,
  // → 字符串 或 数值
  age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  // → 字符串 且 必填
  job: PropTypes.string.isRequired,
  // → 指定类型中的一个
  type: PropTypes.oneOf(['手机号', '用户', '邮箱']),
};
Child.defaultProps = {
  age: 18,
};
export default Child;
