import React, {Component} from 'react';
// 定义Input组件
class Input extends Component {
    constructor(props) {
        super(props);
        // 初始化状态属性
        this.state = {
            val: 'Please enter ...'
        }
        // 绑定this
        this.inputChange = this.inputChange.bind(this);
    }
    // 表单输入处理函数
    inputChange(event) {
        // 更新this.state.val
        this.setState({
            val: event.target.value
        });
    }
    render() {
        let val = this.state.val;
        return (
            <form name='myForm'>
                <input type='text' value={val} onChange={this.inputChange}/>
                <p>{val}</p>
            </form>
        )
    }
}

// 导出Input组件
export default Input;