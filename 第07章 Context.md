[参考地址 >>](https://react.docschina.org/docs/context.html)

# 一、概述

Context 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法。

当你不想在组件树中通过逐层传递 `props` 或者 `state` 的方式来传递数据时，可以使用 `Context` 来实现**跨层级**的组件数据传递。

![](./IMGS/props-state-flow.png)

使用props或者state传递数据，数据自顶下流，使用 `Context`，可以跨越组件进行数据传递，如下所示：

![](./IMGS/props-state-context.png)



# 二、基础使用

首先定义一个 context.js 文件

```react
import React from 'react';
export const AppContext = React.createContext(null);
```

然后在App.js中引用

```react
import React, { useState } from 'react';
import { AppContext } from './context'
function App() {
  return (
    <AppContext.Provider value={{ name: 'Muzili', gender: 'male'}}>
       <div className="App">...</div>
    </AppContext.Provider> 
  );
}
export default App;
```

最后在child.js中

```react
import React from 'react';
import { AppContext } from '../../context';
class Child extends React.Component {
    static contextType = Context;
    render() {
        const { name, gender } = this.context;
        return (
            <div className="child">
                <p>{name} - {gender}</p>
            </div>

        )
    }
}
export default Child;
```

# 三、动态Context

./src/context.js

```js
import React from 'react';

// 定义数据模型
export const themes = {
    light: {
        color: '#f5f5f5',
        background: 'orange'
    },
    dark: {
        color: '#f5f5f5',
        background: '#333333'
    }
}
// 导出上下文
export const AppContext = React.createContext(themes.dark);
```

./src/components/child.js

```react
import React from 'react'
import { AppContext } from '../../context';

class Child extends React.Component {
    static contextType = AppContext;
    render() {
        let { color, background } = this.context;
        return (
            <button {...this.props} style={{ color, background }}>Click Me</button>
        )
    }
}

export default Child;
```

./src/components/node.js

```react
import React from 'react'
import Child from '../Child/Child'
class Node extends React.Component {
    render() {
        return (
            <Child onClick={this.props.changeTheme}/>
        )
    }
}
export default Node;
```

./src/app.js

```react
import React from 'react';
import Node from './components/Node/Node'
import { AppContext, themes } from './context';

class App extends React.Component { 
  constructor() {
    super();
    this.state = {
      theme: themes.light,
    };
  }
  // => methods
  // 切换主题
  toggleTheme(){
    // 异步
    this.setState(state => ({
      theme: state.theme === themes.light ? themes.dark : themes.light
    }));
  }
  render() {
    return (
      <AppContext.Provider value={this.state.theme}>
        <div className="App">
          <Node changeTheme={this.toggleTheme.bind(this)}/>
        </div>
      </AppContext.Provider >
    );
  }
}

export default App;
```









