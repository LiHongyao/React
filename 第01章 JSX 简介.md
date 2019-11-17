<https://react.docschina.org/>

# 一、概述

JSX 不是一门编程语言，是一种 JavaScript 的语法扩展（语法糖）。

- JSX 标签就是 HTML 标签，只不过在js中书写这些标签的时候无需使用双引号括起来。
- JSX 语法能够让我们更直观的看到组件的DOM结构，不能在浏览器上直接运行，最终会转换成js代码在浏览器中运行。

# 二、为什么使用JSX

React 认为渲染逻辑本质上与其他 UI 逻辑内在耦合，比如，在 UI 中需要绑定处理事件、在某些时刻状态发生变化时需要通知到 UI，以及需要在 UI 中展示准备好的数据。

React 并没有采用将标记与逻辑进行分离到不同文件这种人为地分离方式，而是通过将二者共同存放在称之为“组件”的松散耦合单元之中，来实现[*关注点分离*](https://en.wikipedia.org/wiki/Separation_of_concerns)。

React [不强制要求](https://react.docschina.org/docs/react-without-jsx.html)使用 JSX，但是大多数人发现，在 JavaScript 代码中将 JSX 和 UI 放在一起时，会在视觉上有辅助作用。它还可以使 React 显示更多有用的错误和警告消息。

# 三、JSX 表达式

你可以任意地在 JSX 当中使用 JavaScript 表达式，在 JSX 当中的表达式要包含在大括号`{}`里：

```react
let name = '木子李', isLogin = true;
ReactDOM.render(
    <div class="box">
        {name} - { isLogin ? "已登录" : "未登录"}
    </div>,
    document.getElementById('root')
);
```

> 提示：react 组件内部只能有一个根标签。

JSX 本身也是一个表达式，在编译之后，JSX 表达式会被转为普通 JavaScript 函数调用，并且对其取值后得到 JavaScript 对象。也就是说，你可以在 `if` 语句和 `for` 循环的代码块中使用 JSX，将 JSX 赋值给变量，把 JSX 当作参数传入，以及从函数中返回 JSX：

```typescript
function getElement(name) {
  if (name) {
    return <p>Hello, {name}!</p>
  }
  return <p>Hello</p>
}
```

# 四、JSX 属性

你可以使用引号来定义以字符串为值的属性：

```jsx
let element = <div className="box"></div>
```

也可以使用大括号来定义以 JavaScript 表达式为值的属性：

```jsx
let element = <img src={imgUrl} />
```

切记你使用了大括号包裹的 JavaScript 表达式时就不要再到外面套引号了。JSX 会将引号当中的内容识别为字符串而不是表达式。

> 注意：因为 JSX 的特性更接近 JavaScript 而不是 HTML , 所以 React DOM 使用 `camelCase` 小驼峰命名 来定义属性的名称，而不是使用 HTML 的属性名称。

# 五、JSX 嵌套

```react
let element = (
    <div>
        <p className="name">姓名：木子李</p>
        <p className="tel">电话：17398888669</p>
    </div>
);
ReactDOM.render(
    element,
    document.getElementById('root')
)
```

# 六、JSX 防注入攻击

你可以放心地在 JSX 当中使用用户输入：

```jsx
const title = response.potentiallyMaliciousInput;
// 直接使用是安全的：
const element = <h1>{title}</h1>;
```

React DOM 在渲染之前默认会 [过滤](http://stackoverflow.com/questions/7381974/which-characters-need-to-be-escaped-on-html) 所有传入的值。它可以确保你的应用不会被注入攻击。所有的内容在渲染之前都被转换成了字符串。这样可以有效地防止 [XSS(跨站脚本)](https://en.wikipedia.org/wiki/Cross-site_scripting) 攻击。

# 七、JSX 表示对象

Babel 转译器会把 JSX 转换成一个名为 `React.createElement()` 的方法调用。

下面两种代码的作用是完全相同的：

```react
let element = (
  <h3 className="title">Hello, React!</h3>
)
```

```js
let element = React.createElement(
    'h3',
    {
      className: 'title'
    },
    'Hello, React!'
)
```

`React.createElement()` 这个方法首先会进行一些避免bug的检查，之后会返回一个类似下面例子的对象：

```js
// 注意: 以下示例是简化过的（不代表在 React 源码中是这样）
let element = {
  type: 'h3',
  props: {
    className: 'greeting',
    children: 'Hello, world'
  }
};
```

这样的对象被称为 “React 元素”。它代表所有你在屏幕上看到的东西。React 通过读取这些对象来构建 DOM 并保持数据内容一致













