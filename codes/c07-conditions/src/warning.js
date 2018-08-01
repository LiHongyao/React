import React, {Component} from 'react' 

class WarningBox extends Component {
    render() {
        if(!this.props.show) {
            return null;
        }
        return (<p>Warning!</p>)
    }
}
export default WarningBox;