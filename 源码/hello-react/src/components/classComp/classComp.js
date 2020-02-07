import React from 'react';
import Context from '../../context';

export default class ClassComp extends React.Component {
    static contextType = Context;
    render() {
        console.log(this.context);
        return (
            <div>
                I'm a class component!
                <button onClick={() => {
                    this.context.add();
                    this.forceUpdate();
                }}>{this.context.num}</button>
            </div>

        )

    }
}

