# 一、概述

组件可以将UI切分成一些的独立的、可复用的部件，这样你就只需专注于构建每一个单独的部件。

组件从概念上看就像是函数，它可以接收任意的输入值（称之为“props”），并返回一个需要在页面上展示的React元素。

- React 中创建的组件类以大写字母开头，遵循驼峰命名法则。
- 每个组件内都必须实现自己的render方法。
- 组件只能包含一个顶层标签。

# 二、定义组件

## 1. 函数组件

```react
// => 普通函数
function App() {
    return (
        <div className='App'>
            <h1>Hello, App！</h1>
        </div>
    );
};

// => 箭头函数
const App = () => (
        <div className='App'>
            <h1>Hello, App！</h1>
        </div>
    );    
}
```

## 2. 类组件

```react
import React from "react";

class App extends React.Component {
  // 视图渲染
  render() {
    return (<div className="app">
      <h1>Hello, App!</h1>
    </div>)
  }
}
// 导出组件
export default App;
```

上面两个组件在React中是相同的。

# 三、组件渲染

```react
import App from './App';
ReactDOM.render(
    <App />,
    document.getElementById('root')
);
```

# 四、组件样式

组件样式：内联样式、对象样式、选择器样式

我们来看有示例：

```css
/*app.css*/
@charset 'utf-8';
.title {
    color: green;
    letter-spacing: 2px;;
}
```

```react
/*app.js*/
import React from "react";
// 引入外联样式
import "./App.css";
class App extends React.Component {
  render() {
    let styleObj = { color: "blue", letterSpacing: "2px" };

    return (<div className="app">
      {/* 内联样式 */}
      <h1 style={{color:"red", letterSpacing:"2px"}}>Hello, World!</h1>
      {/* 对象样式 */}
      <h1 style={styleObj}>Hello, World!</h1>
      {/* 外联样式 */}
      <h1 className="title">Hello, World!</h1>
    </div>)
  }
}
export default App;
```

> 注意：内联样式绑定的是一个对象，所以样式与样式之间使用逗号`,`隔开。

# 五、组件嵌套

\# react 允许组件嵌套

# 六、父传子：Props

## 1. 简单例子

props 对象中的属性与组件的属性是一一对应的，不要直接去修改props中的属性值。

```js
import React from "react";
class HelloText extends React.Component {
    render() {
        return <h1>Hello, {this.props.name}</h1>;
    }
}

export default HelloText;
```

```typescript
import React from 'react';
import HelloText from "./components/HelloText"

function App() {
  return (<div className="app">
    <HelloText name="木子李"></HelloText>
  </div>)
}

export default App;
```

## 2. 插槽

*this.props.children*：表示组件的所有子节点，类似于Vue中的插槽。

示例需求：定义一个列表组件，列表项中显示的内容，以及列表项的数量都由外部决定。

```react
import React from "react";
class List extends React.Component {
    render() {
        return (<ul className="list">
            {
                /* 列表项数量以及内容不确定，在创建模板时才能确定
                    利用this.props.children从父组件获取需要展示的列表项内容
                    获取到列表项内容后，需要遍历children，逐项进行设置
                    使用React.Children.map() 方法
                    返回值：数组对象，这里数组中的元素是<li> */
                React.Children.map(this.props.children, child => {
                    return <li>{child}</li>
                })
            }
        </ul>)
    }
}
export default List;
```

```html
<List>
  <p>姜子牙</p>
  <p>哪吒</p>
</List>
```

## 3. [属性验证](https://www.npmjs.com/package/prop-types)

> 注意： React.PropTypes 自 React v15.5 起已弃用。请使用 prop-types 库代替。

**\> 安装：**

```shell
# NPM
$ npm install prop-types
# YARN
$ yarn add prop-types
```

 **\> 引入：**

```js
import propTypes from 'prop-types';
```

**\> 使用：**

```react
import React from "react";
import PropTypes from "prop-types";
class Child extends React.Component {
    render() {
        return (<div className="child"></div>)
    }
}
// 属性验证
Child.propTypes = {
  // => messages属性类型为字符串类型
	message: PropTypes.string,
  // => id属性类型为字符串类型或者数值类型
	id: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
  // => number属性类型为数值类型并且是必须的
	number: PropTypes.number.isRequired,
  // => type 属性的值为数值元素中的任意一个
	type: PropTypes.oneOf(["手机号码", "用户名", "邮箱"])
}
export default Child;
```

## 4. 属性默认值

你可以通过配置 `defaultProps` 为 props定义默认值：

```react
// 类型检测
Child.propTypes = {
  message: PropTypes.string
}
// 设置默认值
Child.defaultProps = {
	message: "Hello, PropTypes!"
}
```

# 七、子传父：method

原理：父组件在调用子组件的时候，将方法作为子组件的属性传递，在子组件中调用这个方法并将传递的数据作为函数参数从而实现子传父。

```react
// 子组件
import React from "react";
class Child extends React.Component {
    constructor(props) {
        super(props);
        this.handleBtnClick = this.handleBtnClick.bind(this);
    }
    
    render() {
        return (<div className="child">
            <button onClick={this.handleBtnClick}>发送数据</button>
        </div>)
    }
    // => events
    handleBtnClick(event) {
        this.props.change("Hello");
    }
}

export default Child;
```

```react
// 父组件
import React from "react";
import Child from "./components/child/child";

class App extends React.Component {
  // => methods
  change(arg) {
    console.log(arg);
  }
  // => render
  render() {
    return (<div className="app">
      <Child change={this.change}></Child>
    </div>)
  }
}
export default App;
```























