import React, {Component} from 'react';

class WebName extends Component {
    render() {
        return (
            <span>李鸿耀博客：</span>
        );
    }
}

class WebLink extends Component {
    render() {
        return (
            <a href="https://github.com/LiHongyao/">https://github.com/LiHongyao/</a>
        );
    }
}
class WebShow extends Component {
    render() {
        return (
            <div className="webshow">
                <WebName />
                <WebLink />
            </div>
        );
    }
}

export default WebShow;