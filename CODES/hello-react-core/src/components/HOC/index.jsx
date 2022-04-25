/*
 * @Author: Lee
 * @Date: 2022-04-25 17:43:19
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-25 18:03:12
 */
import React from 'react';

// -- 1. 定义高阶组件
function Hoc(Component) {
  return class extends React.Component {
    getBirth(idCard) {
      let year = idCard.slice(6, 10);
      let month = idCard.slice(10, 12);
      let day = idCard.slice(12, 14);
      return `${year}年${month}月${day}日`;
    }
    render() {
      return <Component getBirth={this.getBirth} {...this.props} />;
    }
  };
}

// => 2. 定义A/B两个组件
const A = (props) => {
  const idCard = '510000198807162324';
  return <p>组件A - {props.getBirth(idCard)} - {props.job}</p>;
};
const B = (props) => {
  const idCard = '510000199901062324';
  return <p>组件A - {props.getBirth(idCard)} - {props.job}</p>;
};

// => 3. 用Hoc组件包裹（加工）A/B组件
const HocA = Hoc(A);
const HocB = Hoc(B);

// => 4. 定义一个HocTest组件呈现A/B组件
const HocTest = () => {
  return (
    <>
      <HocA job='后端工程师' />
      <HocB job='前端工程师'/>
    </>
  );
};

export default HocTest;
