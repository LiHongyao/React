import React, {Component} from 'react';
import {Link} from 'react-router-dom';
class App extends Component {
  render() {
    return <div>
      <ul>
        <li><Link to='/'>主页</Link></li>
        <li><Link to='/news'>新闻</Link></li>
        <li><Link to='/course'>课程</Link></li>
        <li><Link to='/about'>关于</Link></li>
      </ul>
      {this.props.children}
    </div>
  }
}
export default App;