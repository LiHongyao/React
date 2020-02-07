import React from 'react'

// => 1. 定义高阶组件
const Hoc = (Component) => {
    const getBirth = (idCard) => {
        let year = idCard.slice(6, 10);
        let month = idCard.slice(10, 12);
        let day = idCard.slice(12, 14);
        return `${year}年${month}月${day}日`;
    }
    return () => (<Component getBirth={getBirth}></Component>);
}

// => 2. 定义A/B两个组件
const A = (props) => {
    const idCard = '510000198807162324';
    return (<p>组件A - {props.getBirth(idCard)}</p>)
}
const B = (props) => {
    const idCard = '510000199901062324';
    return (<p>组件B - {props.getBirth(idCard)}</p>);
}

// => 3. 用Hoc组件包裹（加工）A/B组件
const HocA = Hoc(A);
const HocB = Hoc(B);

// => 4. 定义一个HocTest组件呈现A/B组件
const HocTest = () => {
    return (
        <>
            <HocA />
            <HocB />
        </>
    )
}

export default HocTest;






