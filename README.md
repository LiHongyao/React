https://doc.react-china.org/

# # 概述

React 是 Facebook 在2013年推出的一个用来构建UI（用户界面）的 JavaScript 库。

React主要用于构建UI，很多人认为 React 是 MVC 中的 V（视图）。

React 起源于 Facebook 的内部项目，用来架设 Instagram 的网站，并于 2013 年 5 月开源。

React 拥有较高的性能，代码逻辑非常简单，越来越多的人已开始关注和使用它。

# # 特点

- **声明式设计** −React采用声明范式，可以轻松描述应用。
- **高效** −React通过对DOM的模拟，最大限度地减少与DOM的交互。
- **灵活** −React可以与已知的库或框架很好地配合。
- **JSX** − JSX 是 JavaScript 语法的扩展。React 开发不一定使用 JSX ，但我们建议使用它。
- **组件** − 通过 React 构建组件，使得代码更加容易得到复用，能够很好的应用在大项目的开发中。
- **单向响应的数据流** − React 实现了单向响应的数据流，从而减少了重复代码，这也是它为什么比传统数据绑定更简单。

# # 引入

引入三个库： react.min.js 、react-dom.min.js 和 babel.min.js：

- **react.min.js** - React 的核心库
- **react-dom.min.js** - 提供与 DOM 相关的功能
- **babel.min.js** - Babel 可以将 ES6 代码转为 ES5 代码，这样我们就能在目前不支持 ES6 浏览器上执行 React 代码。Babel 内嵌了对 JSX 的支持。通过将 Babel 和 babel-sublime 包（package）一同使用可以让源码的语法渲染上升到一个全新的水平。

## 1. 直接下载

点击前往下载：https://github.com/facebook/react/releases

## 2. CDN 引入

```html
<!DOCTYPE html>
<html lang="zh-Hans">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="https://unpkg.com/react@16/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/babel-standalone@6.15.0/babel.min.js"></script>
    <title>Hello, World!</title>
</head>
<body>
    <div id="app"></div>
    <!-- 注意script标签要加type="text/babel"，不然无法识别jsx语法 -->
    <script type="text/babel">
        //我们的react
    </script>
</body>
</html>
```

## 3. npm 

```shell
$ npm i -S react
```

## 4. 使用 create-react-app 快速构建 React 开发环境

create-react-app 是来自于 Facebook，通过该命令我们无需配置就能快速构建 React 开发环境。

create-react-app 自动创建的项目是基于 Webpack + ES6 。

执行以下命令创建项目：

```shell
# 全局安装create-react-app，如果不想全局安装，则不要-g。可能会很慢，可以使用cnpm来安装
$ npm i -g create-react-app
# 创建项目，my-app是项目名
$ create-react-app my-app
$ cd my-app/
# 启动项目
$ npm start
```

## 5. CodePen

https://codepen.io/gaearon/pen/ZpvBNJ





