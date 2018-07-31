import ReactDOM from 'react-dom';
import React from 'react';
import WebShow from './WebShow'
import './index.css';



function SayHello(props) {
    return (
        <div className='container'>
            <p>Hello, {props.name}</p>
        </div>
    );
};

/*
class SayHello extends React.Component {
    render() {
        return (
            <div className='container'>
                <h1>Hello, {this.props.name}</h1>
            </div>
        )
    }
}*/


/*
let styleObj = {
    color: 'red',
    textDecoration: 'underline'
};
class TestBox extends React.Component {
    render() {
        return (
            // 内联样式
            <div style={{background:'yellow', border: '1px solid #ccc'}}>
                <h3 style={styleObj}>{this.props.title}</h3>
                <p className='pStyle'>{this.props.des}</p>
            </div>
        )
    }
}

ReactDOM.render(
    <div>
        <SayHello name='Henry' />
        <TestBox title='成都' des='历史文化名城，一座你来了就不想走的城市。' />
    </div>,
    document.getElementById('root')
);*/


ReactDOM.render (
    <WebShow />,
    document.getElementById('root')
)