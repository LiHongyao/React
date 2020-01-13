https://doc.react-china.org/

# 一、概述

React 是 Facebook 在2013年推出的一个用来构建UI（用户界面）的 JavaScript 库。

React主要用于构建UI，很多人认为 React 是 MVC 中的 V（视图）。

React 起源于 Facebook 的内部项目，用来架设 Instagram 的网站，并于 2013 年 5 月开源。

React 拥有较高的性能，代码逻辑非常简单，越来越多的人已开始关注和使用它。

# 二、优势

1. 实现对虚拟DOM的操作，使得它速度快，提高了Web性能。
2. 组件化，模块化。react里每一个模块都是一个组件，组件化开发，可维护性高。
3. 单向数据流，比较有序，便于管理，它随着React视图库的开发而被Facebook概念化。
4. 跨浏览器兼容：虚拟DOM帮助我们解决了跨浏览器问题，它为我们提供了标准化的API，甚至在IE8中都是没问题的。

# 三、不足

1. react中只是MVC模式的View部分，要依赖引入很多其他模块开发。、
2. 当父组件进行重新渲染操作时，即使子组件的props或state没有做出任何改变，也会同样进行重新渲染。

# 四、特点

1. 声明式设计：React采用声明范式，可以轻松描述应用。
2. 高效：React通过对DOM的模拟，最大限度地减少与DOM的交互。
3. 灵活：React可以与已知的库或框架很好地配合。

# 五、引入

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
    <!-- 在React开发中，使用JSX，跟JavaScript不兼容，在使用JSX的地方，要设置type：text/babel -->
    <!-- babel 是一个转换编译器，ES6转成可以再浏览器中运行的代码-->
    <script type="text/babel">
        // 我们的react
    </script>
</body>
</html>
```

## 3. npm 

```shell
$ npm install react
```

## 4. react 脚手架

create-react-app 是来自于 Facebook，通过该命令我们无需配置就能快速构建 React 开发环境。

create-react-app 自动创建的项目是基于 Webpack + ES6 。

stips 01：执行以下命令创建项目：

```shell
# 全局安装create-react-app
$ npm install -g create-react-app
# 查看版本，如果打印版本号，表示安装成功
$ create-react-app --version
# 创建项目，my-app是项目名
$ create-react-app hello-react [--typescript]
$ cd hello-react/
# 启动项目
$ npm start
```

> 提示：“Windows” 如果提示不是内部命令，去添加环境变量即可。

## 5. next

参考：https://nextjs.org/

## 6. CodePen

https://codepen.io/gaearon/pen/ZpvBNJ





