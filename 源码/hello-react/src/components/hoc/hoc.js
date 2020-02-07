import React from 'react';

// 参数首字母必须大写，必须要有返回值，在下面使用
const Hoc = (Component) => {
    // 类名可以省略，省略的话标签名就是以temp或者其他的代替，必须要有返回值
    return class _ extends React.Component { 
        banner = () => { // 这里是实现某个功能的函数代码
            return 'Muzili'
        }
        render() {
            // 将参数当做一个组件返回出去
            return (
                <Component banner={this.banner}></Component>
            )
        }
    }
}
class A extends React.Component {
    render() {
        return (
            <div>
                <p> A组件 </p>
                {this.props.banner() } 
                {/* 在下面使用了高阶组件后，这里就可以直接使用里面的方法了 */}
            </div>
        )
    }
}

class B extends React.Component {
    render() {
        return (
            <div>
                <p> B组件 </p>
                {this.props.banner()}
            </div>
        )
    }
}

// 将组件名当参数传进去，这样这个组件就有高阶组件内的方法了
const HocA = Hoc(A);
const HocB = Hoc(B);


class C extends React.Component {
    render() {
        return (
            <div>
                <p> C组件 </p>
                <HocA></HocA>
                {/* 这里使用的高阶组件 */}
                <HocB></HocB>
            </div>
        )
    }
}
export default C;

