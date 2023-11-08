# 一、概述

[React >>](https://zh-hans.reactjs.org/) 是 Facebook 在2013年推出的一个用于构建 Web 和原生交互界面的库。

# 二、优势

- **组件化开发**：React 基于组件化开发模式，将用户界面划分为独立的组件。这使得开发人员可以独立地编写、测试和维护每个组件，提高了代码的可复用性和可维护性。

- **虚拟 DOM**：React 使用虚拟 DOM（Virtual DOM）来管理和更新用户界面。虚拟 DOM 是一个轻量级的副本，与实际 DOM 元素对应。React 通过比较虚拟 DOM 的差异，最小化了实际 DOM 操作的次数，提高了性能和响应速度。
- **单向数据流**：React 推崇单向数据流（One-way data binding），使得数据的流动更加可控和可预测。数据从父组件向子组件传递，子组件无法直接修改父组件的数据，减少了出现 bug 的可能性。
- **强大的生态系统**：React 拥有一个庞大而活跃的开发社区，提供了许多扩展和工具，使开发变得更加便捷。例如，React Router 用于处理应用程序的路由，Redux 用于管理状态，React Native 可以用于构建移动应用等。
- **高性能**：React 通过使用虚拟 DOM 和优化算法，提供了出色的性能。通过只更新需要变化的部分，减少了对实际 DOM 的操作，从而提高了应用程序的渲染速度和效率。
- **易于学习和使用**：React 的学习曲线相对较平缓，尤其对于熟悉 JavaScript 的开发人员来说。它提供了清晰的文档和丰富的教程资源，使初学者能够快速上手。
- **跨平台支持**：React 不仅可以用于构建 Web 应用程序，还可以与其他平台结合使用。例如，React Native 可以用于构建原生移动应用，React 360 可以用于构建虚拟现实（VR）应用。

# 三、构建项目

参考 [启动一个新的 React 项目 >>](https://zh-hans.react.dev/learn/start-a-new-react-project)

## 1. 直接下载

[点击前往下载 >>](https://github.com/facebook/react/releases)

## 2. npm 

```shell
$ npm install react
```

## 3. CRA（官方脚手架）

[CRA >>](https://create-react-app.dev/)

```shell
$ npx create-react-app <project-name> --template typescript
$ cd react-learning & npm start
```

在安装过程中，如果出现如下提示：

*You are running create-react-app 4.0.3, which is behind the latest release (5.0.1).*

*We no longer support global installation of Create React App.*

在控制台执行如下指令，再重复刚刚的步骤：

```shell
$ npx clear-npx-cache
```

## 4. Vite

```shell
$ npm create vite@latest <project-name> -- --template react-ts
```

> Tips：参考 <https://cn.vitejs.dev/guide/#scaffolding-your-first-vite-project>

## 5. Next.js（*推荐*）

**[Next.js](https://nextjs.org/) 是一个全栈式的 React 框架**。它用途广泛，可以让你创建任意规模的 React 应用——可以是静态博客，也可以是复杂的动态应用。要创建一个新的 Next.js 项目，请在你的终端运行：

```shell
$ npx create-next-app
```

如果你是 Next.js 的新手，请查看 [Next.js 教程](https://nextjs.org/learn/foundations/about-nextjs)。

# 五、初体验

本教程主要以CRA的形式创建React项目：

```shell
$ npx create-react-app react-learns --template typescript
$ cd react-learns && code . && npm start
```

文件解读：

> src/index.tsx

```tsx
// -- 引入相关依赖
import React from 'react';
import ReactDOM from 'react-dom/client';
// -- 引入全局样式
import './index.css';
// -- 引入根组件
import App from './App';

// -- 创建根节点
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
// -- 渲染根节点
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

> src/App.tsx

```tsx
import React from 'react';

function App() {
  return <div className='App'>Hello，React.js!</div>;
}

export default App;
```

> Tips：此时页面显示 → `Hello, React.js！`

