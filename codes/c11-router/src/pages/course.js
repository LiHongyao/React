import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';

class Course extends Component {
    render() {
        let match = this.props.match;
        return (
            <div>
                <ul>
                    <li><Link to={`${match.url}/html`}>HTML</Link></li>
                    <li><Link to={`${match.url}/css`}>CSS</Link></li>
                    <li><Link to={`${match.url}/javascript`}>JavaScript</Link></li>
                </ul>
                <Route path={`${match.url}/html`} render={ () => { return <div>HTML 是超文本标记语言</div> } } />
                <Route path={`${match.url}/css`} render={ () => { return <div>CSS 样式渲染</div> } } />
                <Route path={`${match.url}/javascript`} render={ () => { return <div>JavaScript 交互行为</div> } } />
            </div>
        )
    }
}
export default Course;