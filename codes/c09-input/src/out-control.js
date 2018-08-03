import React, {Component} from 'react';

class OutControlComp extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
        // 访问ref
        alert(this.input.value);
        event.preventDefault();
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                {/* ref */}
                <input 
                    type='text' 
                    ref={(input) => this.input = input} 
                    defaultValue='Today is very nice.'/>
                <p>
                    <button type='submit' >SUBMIT</button>
                </p>
            </form>
        )
    }
}
export default OutControlComp;