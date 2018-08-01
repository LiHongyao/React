import React from 'react';
import ReactDOM from 'react-dom';

class NumberList extends React.Component {
    render() {
        let listItems = this.props.numbers.map(num =>
            <li key={num.toString()}>
                {num}
            </li>
        );
        return (
            <ul>{listItems}</ul>
        )
    }
}

ReactDOM.render(
    <NumberList numbers={[1, 2, 3, 4]}/>,
    document.getElementById('root')
)





