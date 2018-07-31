
import React, {Component} from 'react';

// 导出一个显示时间的组件
export default class LocaleTime extends Component {
    // 1. 构造器
    constructor(props) {
        // 在ES6中，子类的constructor中必须先调用super才能引用this
        super(props);
        // 初始化state
        this.state = {
            date: new Date()
        }
    }
    // 2. 渲染函数
    render() {
        return (
            <h1>北京时间：{this.state.date.toLocaleTimeString()}</h1>
        );
    }

    // 3. 生命周期 -> 组件挂载完成
    componentDidMount() {
        // 初始化定时器，并将该定时器绑定在组件实例上
        this.timer = setInterval(() => {
            // 更新state值
            this.setState({
                date: new Date()
            });
        }, 1000)
    }
    // 4. 生命周期 -> 组件即将卸载
    componentWillUnmount() {
        // 清除定时器
        clearInterval(this.timer);
    }
}