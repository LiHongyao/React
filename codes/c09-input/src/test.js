import React, {Component} from 'react';
class Reservation extends Component {
    constructor(props) {
      super(props);
      this.state = {
      };
      this.handleInputChange = this.handleInputChange.bind(this);
    }
  
    handleInputChange(event) {
        let name  = event.target.name; 
        let value = event.target.value;
        this.setState({
            [name]: value
        })
    }
  
    render() {
      return (
        <form>
            <label>账号：</label>
            <input type='text' name='username' onChange={this.handleInputChange} />

            <br />

            <label>密码：</label>
            <input type='password' name='password' onChange={this.handleInputChange} />

            <p>账号：{this.state.username} <br/> 密码：{this.state.password}</p>
        </form>
      );
    }
  }
  export default Reservation;