import React, {Component} from 'react';

class Input extends Component {
    // 监听输入框变化
    handleChange = (event) => {
        // 调用父级中绑定的事件
        this.props.handleChange(event.target.value)
    }
    render() {
        // 获取父级传递过来的输入的值
        const inputNumber = this.props.number;
        return (
            <p><input type='text' value={inputNumber} onChange={this.handleChange} /></p>
        )
    }
}

class Caculator extends Component {
    constructor(props) {
        super(props);
        this.state = {number: 0 }
    }
    handleChange = (number) => {
        this.setState({number})
    }
    render() {
        const number = this.state.number;
        return (
            <div>
                <Input number={number} handleChange={this.handleChange} />
                <Input number={number} handleChange={this.handleChange} />
            </div>
        )
    }
}
export default Caculator;