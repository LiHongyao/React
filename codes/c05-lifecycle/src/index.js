import React from 'react';
import ReactDOM from 'react-dom';
import InfoBox from './info-box'
import './index.css';


ReactDOM.render(
    <InfoBox />,
    document.getElementById('root')
)

ReactDOM.render(
    <InfoBox name='Petter'/>,
    document.getElementById('root')
)

ReactDOM.unmountComponentAtNode(document.getElementById('root'))