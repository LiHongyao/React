import React, {Component} from 'react'

class Toggle extends Component {
    constructor(props) {
        super(props);
        this.state = { isOn: false }
        // *** 动态绑定this
        this.btnClick = this.btnClick.bind(this)
    }
    btnClick(msg, e) {
        console.log(msg);
        console.log(e);
        this.setState(prevState => ({
            isOn: !prevState.isOn
        }))
    }
    render() {
        return (
            // <button onClick={this.btnClick.bind(this, 'Hello, girl!')}>{this.state.isOn ? 'OFF' : 'ON'}</button>
            <button onClick={(e) => this.btnClick('Hello, girl!', e)}>{this.state.isOn ? 'OFF' : 'ON'}</button>
        )
    }
}
export default Toggle;
