# 一、概述

[React >>](https://zh-hans.reactjs.org/) 是 Facebook 在2013年推出的一个用于构建用户界面的 JavaScript 库。

# 二、优势

- 实现对虚拟DOM的操作，使得它速度快，提高了Web性能。

- 组件化，模块化。React 里每一个模块都是一个组件，组件化开发，可维护性高。

- 单向数据流，比较有序，便于管理，它随着 React 视图库的开发而被 Facebook 概念化。

- 跨浏览器兼容：虚拟DOM帮助我们解决了跨浏览器问题，它为我们提供了标准化的API，甚至在IE8中都是没问题的。

# 三、特点

- 声明式

  React 使创建交互式 UI 变得轻而易举。为你应用的每一个状态设计简洁的视图，当数据变动时 React 能高效更新并渲染合适的组件。

  以声明式编写 UI，可以让你的代码更加可靠，且方便调试。

- 组件化

  构建管理自身状态的封装组件，然后对其组合以构成复杂的 UI。

  由于组件逻辑使用 JavaScript 编写而非模板，因此你可以轻松地在应用中传递数据，并保持状态与 DOM 分离。

- 一次学习，跨平台编写

  无论你现在使用什么技术栈，在无需重写现有代码的前提下，通过引入 React 来开发新功能。

  React 还可以使用 Node 进行服务器渲染，或使用 [React Native](https://reactnative.dev/) 开发原生移动应用。

# 四、构建项目

## 1. 直接下载

[点击前往下载 >>](https://github.com/facebook/react/releases)

## 2. npm 

```shell
$ npm install react
```

## 3. CRA（官方脚手架）*

```shell
$ npx create-react-app@latest react-learning --template typescript
$ cd react-learning & npm start
```

> Tips：
>
> - `react-learning`：项目名称
> - `--template typescript `：安装TS版本项目模板

## 4. Vite *

```shell
$ npm create vite@latest react-learning -- --template react-ts
```

> Tips：参考 <https://cn.vitejs.dev/guide/#scaffolding-your-first-vite-project>

# 五、初体验

修改代码文件

> src/index.tsx

```tsx
// -- 引入相关依赖
import React from 'react';
import ReactDOM from 'react-dom/client';
// -- 引入全局样式
import './index.css';
// -- 引入根组件
import App from './App';

// -- 创建渲染
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

> src/App.tsx

```tsx
import React from 'react';

const App: React.FC = () => {
  return <div className='App'>Hello, React.js!</div>;
};

export default App;
```

> Tips：此时页面显示 → `Hello, React.js！`

