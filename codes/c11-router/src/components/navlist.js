import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class NavList extends Component {
    render() {
        return (
            <div className='menuBar'>
                <ul>
                    <li><Link to='/'>主页</Link></li>
                    <li><Link to='/news'>新闻</Link></li>
                    <li><Link to='/about/5651'>关于</Link></li>
                </ul>
            </div>
        )
    }
}
export default NavList;