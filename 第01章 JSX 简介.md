# 一、概述

> @See https://zh-hans.react.dev/learn/writing-markup-with-jsx

**JSX** 是 JavaScript 语法扩展，可以让你在 JavaScript 文件中书写类似 HTML 的标签。

```jsx
const element = <h1>Hello, world!</h1>;
```

- JSX 标签就是 HTML 标签，只不过在js中书写这些标签的时候无需使用双引号括起来。
- JSX 语法能够让我们更直观的看到组件的DOM结构，不能在浏览器上直接运行，最终会转换成js代码在浏览器中运行。

JSX规则：

- 只能返回一个根元素
- 标签必须闭合
- 使用驼峰式命名法给 <del>**所有**</del> 大部分属性命名！

# 二、为什么使用？

网页是构建在 HTML、CSS 和 JavaScript 之上的。多年以来，web 开发者都是将网页内容存放在 HTML 中，样式放在 CSS 中，而逻辑则放在 JavaScript 中 —— 通常是在不同的文件中！页面的内容通过标签语言描述并存放在 HTML 文件中，而逻辑则单独存放在 JavaScript 文件中。

但随着 Web 的交互性越来越强，逻辑越来越决定页面中的内容。JavaScript 负责 HTML 的内容！这也是为什么 **在 React 中，渲染逻辑和标签共同存在于同一个地方——组件。**

比如将一个按钮的渲染逻辑和标签放在一起可以确保它们在每次编辑时都能保持互相同步。反之，彼此无关的细节是互相隔离的，例如按钮的标签和侧边栏的标签。这样我们在修改其中任意一个组件时会更安全。

# 三、JSX 表达式

JSX 允许你在 js 中编写类似 HTML 的标签，从而使渲染的逻辑和内容可以写在一起。有时候，你可能想要在标签中添加一些 js 逻辑或者引用动态的属性。这种情况下，你可以在 JSX 的大括号内来编写 js。

```react
import React from "react";

const JsxComp: React.FC = () => {
  const name = "Gregorio Y. Zara";
  const loginState = true;
  const wrapCls = "wrap";

  const getTime = () => {
    return new Date().toLocaleString();
  };

  return (
    <div className={wrapCls}>
      {/* 插值 */}
      <h1 style={{ color: "#FFA500" }}>{name}'s To Do List</h1>
      {/* 表达式 */}
      <p>status: {loginState ? "✅" : "❌"}</p>
      {/* 调用方法 */}
      <p>Time: {getTime()}</p>
    </div>
  );
};

export default JsxComp;
```

JSX 本身也是一个表达式，在编译之后，JSX 表达式会被转为普通 JavaScript 函数调用，并且对其取值后得到 JavaScript 对象。

也就是说，你可以在 `if` 语句和 `for` 循环的代码块中使用 JSX，将 JSX 赋值给变量，把 JSX 当作参数传入，以及从函数中返回 JSX：

```jsx
const renderTips = (name) => {
    if (name) {
        return <p>Hello, {name}！</p>;
    }
    return <p>Hello, Girls！</p>;
};
```

# 四、JSX 属性

你可以使用引号来定义以字符串为值的属性：

```jsx
const element = <a href="https://gitee.com/lihongyao"> gitee </a>;
```

也可以使用大括号来定义以 `JavaScript` 表达式为值的属性：

```jsx
const element = <img src={user.avatarUrl}></img>;
```

在属性中嵌入 JavaScript 表达式时，不要在大括号外面加上引号。

你应该仅使用引号（对于字符串值）或大括号（对于表达式）中的一个，对于同一属性不能同时使用这两种符号。

> 注意：因为 JSX 语法上更接近 JavaScript 而不是 HTML，所以 React DOM 使用 `camelCase`（小驼峰命名）来定义属性的名称，而不使用 HTML 属性名称的命名约定。
>
> 例如，JSX 里的 class 变成了 `className`，而 `tabindex` 则变为 `tabIndex`。

# 五、JSX 嵌套

JSX 标签里能够包含很多子元素

```react
const element = (
  <div>
    <p className='name'>Name：Li-HONGYAO</p>
    <p className='tel'>Phone：17398888669</p>
  </div>
);
```

假如一个标签里面没有内容，你可以使用 `/>` 来闭合标签，就像 XML 语法一样：

```jsx
const element = <img src={user.avatarUrl} />;
```

# 六、JSX 防注入攻击

你可以放心地在 JSX 当中使用用户输入：

```jsx
const title = response.potentiallyMaliciousInput;
// 直接使用是安全的：
const element = <h1>{title}</h1>;
```

React DOM 在渲染所有输入内容之前，默认会进行 [转义](https://stackoverflow.com/questions/7381974/which-characters-need-to-be-escaped-on-html)。它可以确保在你的应用中，永远不会注入那些并非自己明确编写的内容。所有的内容在渲染之前都被转换成了字符串。这样可以有效地防止 [XSS（cross-site-scripting, 跨站脚本）](https://en.wikipedia.org/wiki/Cross-site_scripting)攻击。

# 七、JSX 表示对象

Babel 会把 JSX 转译成一个名为 `React.createElement()` 函数调用。

以下两种示例代码完全等效：

```react
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
```

```js
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```

`React.createElement()` 会预先执行一些检查，以帮助你编写无错代码，但实际上它创建了一个这样的对象：

```js
// 注意：这是简化过的结构
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};
```

这些对象被称为 “React 元素”。它们描述了你希望在屏幕上看到的内容。React 通过读取这些对象，然后使用它们来构建 DOM 以及保持随时更新。













