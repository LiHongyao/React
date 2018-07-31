
import React, {Component} from 'react';

export default class InfoBox extends Component {

    static defaultProps = {
        name: '木子李'
    }

    constructor(props) {
        super(props);
        this.state = {
            job: 'Web前端工程师'
        };
    }
    
    // 组件将要挂载，在render之前执行，但仅执行一次，即使多次重复渲染该组件，或者改变了组件的state
    componentWillMount() {
        console.log('componentWillMount')
    }
    // 组件已经挂载，在render之后执行，同一个组件重复渲染只执行一次
    // 一般做外部数据操作，比如ajax
    componentDidMount() {
        console.log('componentDidMount');
    }
    // 已加载组件，收到新的props之前调用，注意组件初始化渲染时则不会执行
    // nextProps -> object
    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps');
    }
    // 组件判断是否重新渲染时调用，该接口实际是在组件接收到了新的 props 或者新的 state 时会立即调用
    // nextProps, nextState -> object
    shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate');
        return true;
    }
    // 接收到新的props或者state后，进行渲染之前调用，此时不允许更新props或state。
    // nextProps, nextState -> object
    componentWillUpdate(nextProps, nextState) {
        console.log('componentWillUpdate');
    }
    // 完成渲染新的props或者state后调用，此时可以访问到新的DOM元素。
    // prevProps, prevState -> object
    componentDidUpdate(prevProps, prevState) {
        console.log('componentDidUpdate');
    }
    // 组件被移除之前被调用，可以用于做一些清理工作，在componentDidMount方法中添加的所有任务都需要在该方法中撤销，比如创建的定时器或添加的事件监听器。
    componentWillUnmount() {
        console.log('componentWillUnmount');
    }
    // 必选的方法，创建虚拟DOM，该方法具有特殊的规则：
    // 1. 只能通过this.props和this.state访问数据 
    // 2. 可以返回null、false或任何React组件 
    // 3. 只能出现一个顶级组件（不能返回数组） 
    // 4. 不能改变组件的状态 
    // 5. 不能修改DOM的输出
    render() {
        // 渲染并返回一个虚拟DOM
        return (
            <p>{this.props.name} - {this.state.job}</p>
        )
    }
}