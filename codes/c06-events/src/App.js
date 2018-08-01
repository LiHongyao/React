import React, {Component} from 'react'
import Toggle from './Toggle'
import Test from './login-register'

class App extends Component {

    clickBtn() {
        console.log(this);
    }

    render() {
        return (
           <div className='content'>
                <Toggle />
                <Test />
                <button onClick={(e) => this.clickBtn(e) }>Click Me</button>
           </div>
        )
    }
}
export default App;

