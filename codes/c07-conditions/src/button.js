
import React, {Component} from 'react' 

// 注销按钮
class CancellationBtn extends Component {
    render() {
        return (<button onClick={this.props.onClick}>注销</button>)
    }
}
// 登陆按钮
class LoginBtn extends Component {
    render() {
        return (<button onClick={this.props.onClick}>登陆</button>)
    }
}

class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {isLogin:false}
    }
    handleCancellationBtnClick() {
        this.setState(prevState => ({
            isLogin: false
        }))
    }
    handleLoginBtnClick() {
        this.setState(prevState => ({
            isLogin: true
        }))
    }
    render() {
        return (
            <div>
                {
                    this.state.isLogin ? (<CancellationBtn onClick={this.handleCancellationBtnClick.bind(this)}/>) : (<LoginBtn onClick={this.handleLoginBtnClick.bind(this)}/>)
                }
            </div>
        )
    }
}

export default Button;