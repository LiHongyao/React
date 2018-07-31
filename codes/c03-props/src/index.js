import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import PropTypes from 'prop-types';


// 1. props 传值
class Sum extends React.Component {
    render() {
        return (
            <p>{parseInt(this.props.a) + parseInt(this.props.b)}</p>
        );
    }
}

// 2. this.props
class Link extends React.Component {
    render() {
        return (
            <a {...this.props}>{this.props.name}</a>
        )
    }
};


// 3. this.props.children
class ListComponent extends React.Component {
    render() {
        return (
            <ul>
                {
                    /*
                    列表项数量以及内容不确定，在创建模板时才能确定
                    利用this.props.children从父组件获取需要展示的列表项内容
                    获取到列表项内容后，需要遍历children，逐项进行设置
                    使用React.Children.map() 方法
                    返回值：数组对象，这里数组中的元素是<li>
                     */
                    React.Children.map(this.props.children, (child) => {
                        // child 是遍历得到的父组件中的子节点
                        return <li>{child}</li>
                    })
                }
            </ul>
        )
    }
}

// 4. 属性检测
class ShowInfos extends React.Component {
    render() {
        return (
            <div>
                <p>{this.props.name}</p>
                <p>{this.props.age}</p>
            </div>
        );
    }
}
ShowInfos.propTypes = {
    name: PropTypes.string,
    age: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
};


// 5. 属性默认值
class TipBox extends React.Component {
    render(){
        return (
            <h1>{this.props.msg}</h1>
        )
    }
}
// 类型检测
TipBox.propTypes = {
    msg: PropTypes.string
}
// 设置默认值
TipBox.defaultProps = {
    msg: '通知：下午17：00，教学部在会议室1开会！'
}

ReactDOM.render(
    <TipBox />,
    document.getElementById('root')
);