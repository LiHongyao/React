import React, {Component} from 'react'

class Details extends Component {
    render() {
        console.log(this);
        return (
            <h1>
                我是详情页
                {/* <span>{this.props.match.params.text}</span> */}
                {/* <span>{this.props.location.query.text}</span> */}
                <span>{this.props.location.state.text}</span>
            </h1>
        )
    }
}
export default Details;