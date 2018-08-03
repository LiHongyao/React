import React, {Component} from 'react'

import {Link} from 'react-router-dom';

class Home extends Component {
    handleClick = () => {
        // this.props.history.push('/details/hello');
        this.props.history.push({pathname:'/details', query:{text:'hello'}})
    }
    render() {
        return (
            <div>
                <h1>我是主页</h1>
                {/* <Link to='/details/hello'>详情</Link> */}
                {/* <Link to={{pathname:'/details', query:{text:'hello'}}}>详情</Link> */}
                <Link to={{pathname:'/details', state:{text:'hello'}}}>详情</Link>
                <button onClick={this.handleClick}>前往详情页</button>
            </div>
        )
    }
}
export default Home;