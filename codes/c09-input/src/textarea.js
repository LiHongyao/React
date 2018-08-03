import React, {Component} from 'react';
class TextArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            val: '请用一句话介绍自己...'
        }
        this.inputChange  = this.inputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    inputChange(event) {
        this.setState({
            val: event.target.value
        });
    }
    handleSubmit(event) {
        alert(this.state.val);
        event.preventDefault();
    }
    render() {
        let val = this.state.val;
        return (
            <form name='myForm' onSubmit={this.handleSubmit}>
                <textarea  type='text' value={val} onChange={this.inputChange}/>
                <p><button type='submit'>确定</button></p>
            </form>
        )
    }
}

export default TextArea;