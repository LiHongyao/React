import React from 'react';
import ReactDOM from 'react-dom';


/*
let name = 'henry', isLogin = true;
ReactDOM.render(
    <div>
        {name} - { isLogin ? "已登录" : "未登录"}
    </div>,
    document.getElementById('root')
);
*/

// 嵌套
/*
let element = (
    <div>
        <p className="name">Henry</p>
        <p className="job">Web front-end engineer</p>
    </div>
);
ReactDOM.render(
    element,
    document.getElementById('root')
)*/


// 转换
/*
ReactDOM.render(
    React.createElement(
        'h3',
        {
            className: 'title'
        },
        'Hello, React!'
    ),
    document.getElementById('root')
)
*/

function tick() {
    const element = (
        <h1>北京时间：{new Date().toLocaleTimeString()}</h1>
    );
    ReactDOM.render(
      element,
      document.getElementById('root')
    );
}

setInterval(tick, 1000);