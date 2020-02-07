import React from 'react';

export const List = (props) => {
    return (<ul>
        {React.Children.map(props.children, child => {
            return <li>{child}</li>
        })}
    </ul>);
}