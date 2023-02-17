# 一、概述

```jsx
const element = <h1>Hello, world!</h1>;
```

这个有趣的标签语法既不是字符串也不是 HTML。它被称为 JSX，是一个 JavaScript 的语法扩展。

- JSX 标签就是 HTML 标签，只不过在js中书写这些标签的时候无需使用双引号括起来。
- JSX 语法能够让我们更直观的看到组件的DOM结构，不能在浏览器上直接运行，最终会转换成js代码在浏览器中运行。

# 二、为什么使用JSX

React 认为渲染逻辑本质上与其他 UI 逻辑内在耦合，比如，在 UI 中需要绑定处理事件、在某些时刻状态发生变化时需要通知到 UI，以及需要在 UI 中展示准备好的数据。

React 并没有采用将 **标记与逻辑分离到不同文件** 这种人为的分离方式，而是通过将二者共同存放在称之为 “**组件**” 的松散耦合单元之中，来实现 关注点分离。

React 不强制要求使用 JSX，但是大多数人发现，在 JavaScript 代码中将 JSX 和 UI 放在一起时，会在视觉上有辅助作用。它还可以使 React 显示更多有用的错误和警告消息。

# 三、JSX 表达式

你可以任意地在 JSX 当中使用 JavaScript 表达式，在 JSX 当中的表达式要包含在大括号 `{}` 里：

```react
const App: React.FC = () => {
  // -- constants
  const gitee = 'https://gitee.com/lihongyao';
  const user = { firstName: 'Li', lastName: 'HONGYAO' };
  const loginState = true;

  // -- methods
  const getFullName = (data: typeof user) => {
    return `${data.firstName}-${data.lastName}!`;
  };

  return (
    <div className='App'>
      <p>Hello, React.js!</p>
      <p>Hello, {getFullName(user)}</p>
      <p>登录状态：{loginState ? '「在线」' : '已下线 」'}</p>
    </div>
  );
};

export default App;
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













