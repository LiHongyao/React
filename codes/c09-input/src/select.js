import React, {Component} from 'react';
class Select extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({
            value: event.target.value
        });
    }
    render() {
        return (
            <form name='myForm' onSubmit={this.handleSubmit}>
                <select value={this.state.value} onChange={this.handleChange}>
                    <option value=''>-请选择您所在的城市-</option>
                    <option value='北京'>北京</option>
                    <option value='上海'>上海</option>
                    <option value='成都'>成都</option>
                    <option value='广州'>广州</option>
                    <option value='西安'>西安</option>
                    <option value='昆明'>昆明</option>
                </select>
                <p>您所在的城市是：{this.state.value}</p>
            </form>
        )
    }
}

export default Select;