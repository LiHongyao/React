import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Context from '../../context';
import ClassComp from '../classComp/classComp';

// function components
export const Child = (props) => {
	let data = useContext(Context);
	console.log(data);
	// state hook
	const [count, setCount] = useState(0);
	// effect hook
	useEffect(() => {
		console.log(count);
	})
	// events 
	const handleBtnClick = (event) => {
		event.persist();
		console.log(event);
		props.reciveData("我是子组件传递过来的数据");
	}
	
	// JSX
	return (
		<div className="child">
			<ClassComp />
			<p>「子组件」</p>
			<p>context: {data.num}</p>
			<p>{props.message}</p>
			<p>{props.number}</p>
			<button onClick={() => setCount(count + 1)}>您点击了我{count}次！</button>
			<button onClick={handleBtnClick}>传递数据给父组件</button>
		</div>
	)
}


// check props
Child.propTypes = {
	message: PropTypes.string,
	id: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	number: PropTypes.number.isRequired,
	type: PropTypes.oneOf(["手机号码", "用户名", "邮箱"])
}
// default props
Child.defaultProps = {
	message: "Hello, PropTypes!"
}