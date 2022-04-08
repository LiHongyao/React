官网地址：<https://zh-hans.reactjs.org/>

# 一、概述

React 是 Facebook 在2013年推出的一个用来构建UI（用户界面）的 JavaScript 库，他们认为MVC无法满足他们的扩展需求。

React主要用于构建UI，很多人认为 React 是 MVC 中的 V（视图）。

React 起源于 Facebook 的内部项目，用来架设 Instagram 的网站，并于 2013 年 5 月开源。

React 拥有较高的性能，代码逻辑非常简单，越来越多的人已开始关注和使用它。

# 二、优势

- 实现对虚拟DOM的操作，使得它速度快，提高了Web性能。

- 组件化，模块化。react里每一个模块都是一个组件，组件化开发，可维护性高。

- 单向数据流，比较有序，便于管理，它随着React视图库的开发而被Facebook概念化。

- 跨浏览器兼容：虚拟DOM帮助我们解决了跨浏览器问题，它为我们提供了标准化的API，甚至在IE8中都是没问题的。

# 三、不足

- react中只是MVC模式的View部分，要依赖引入很多其他模块开发。

- 当父组件进行重新渲染操作时，即使子组件的props或state没有做出任何改变，也会同样进行重新渲染。

# 四、特点

- 声明式

  React 使创建交互式 UI 变得轻而易举。为你应用的每一个状态设计简洁的视图，当数据变动时 React 能高效更新并渲染合适的组件。

  以声明式编写 UI，可以让你的代码更加可靠，且方便调试。

- 组件化

  构建管理自身状态的封装组件，然后对其组合以构成复杂的 UI。

  由于组件逻辑使用 JavaScript 编写而非模板，因此你可以轻松地在应用中传递数据，并保持状态与 DOM 分离。

- 一次学习，跨平台编写

  无论你现在使用什么技术栈，在无需重写现有代码的前提下，通过引入 React 来开发新功能。

  React 还可以使用 Node 进行服务器渲染，或使用 [React Native](https://reactnative.dev/) 开发原生移动应用。

# 五、构建项目

## 1. 直接下载

[点击前往下载 >>](https://github.com/facebook/react/releases)

## 2. npm 

```shell
$ npm install react
```

## 3. CRA（官方脚手架）*

```shell
$ npx create-react-app project-name [--template typescript] 
$ cd hello-react & npm install
$ npm start
```

> Tips：
>
> - `project-name`：项目名称
>
> - `--template typescript `：安装TS版本项目模板；

## 4. Vite

```shell
$ npm create vite@latest project-name -- --template react
```

> Tips：参考 <https://cn.vitejs.dev/guide/#scaffolding-your-first-vite-project>

# 六、目录结构

```ini
hello-react
.
├── node_modules
├── public
├── src
│   ├── app.js           # 根组件
│   ├── index.css        # 全局样式
│	└── index.js         # 入口文件
├── .gitignore           # git 忽略文件
├── package-lock.json
├── package.json
└── README.md
```

> Tips：脚手架构建项目之后，删除冗余文件，保留如上目录结构。

# 七、初体验

修改代码文件

> src/index.js

```tsx
// -- 引入核心依赖
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// -- 引入全局样式
import './index.css';

// -- 引入根组件
import App from './App';

// -- 渲染根视图
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

> src/app.js

```tsx
// -- 函数组件
const App = () => {
  return (
    <div className='App'>
      <p>Hello, React.js!</p>
    </div>
  );
};

// -- 导出组件
export default App;
```

> Tips：此时页面显示 → `Hello, React.js！`

