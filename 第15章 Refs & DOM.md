# 一、概述

Refs 提供了一种方式，允许我们访问 DOM 节点或在 `render` 方法中创建的 React 元素。

在典型的 React 数据流中，[props](https://zh-hans.reactjs.org/docs/components-and-props.html) 是父组件与子组件交互的唯一方式。要修改一个子组件，你需要使用新的 props 来重新渲染它。但是，在某些情况下，你需要在典型数据流之外强制修改子组件。被修改的子组件可能是一个 React 组件的实例，也可能是一个 DOM 元素。对于这两种情况，React 都提供了解决办法。

# 二、合何时使用？

- 管理焦点，文本选择或媒体播放。
- 触发强制动画。
- 集成第三方 DOM 库。

避免使用 refs 来做任何可以通过声明式实现来完成的事情。

举个例子，避免在 `Dialog` 组件里暴露 `open()` 和 `close()` 方法，最好传递 `isOpen` 属性。

# 三、代码示例

```jsx
import { Component, createRef } from 'react';

export default class Example extends Component {
  constructor(props) {
    super(props);
    // -- 创建refs
    this.vRef = createRef();
  }
  componentDidMount() {
    // -- 访问refs
    const node = this.vRef.current;
    console.log(node);
  }
  render() {
    // -- 分发refs
    return <div ref={this.vRef}>Hello, Refs!</div>;
  }
}
```

Refs 是使用 `React.createRef()` 创建的，并通过 `ref` 属性附加到 React 元素。在构造组件时，通常将 Refs 分配给实例属性，以便可以在整个组件中引用它们。当 ref 被传递给 `render` 中的元素时，对该节点的引用可以在 ref 的 `current` 属性中被访问。

> **Tips**：**你不能在函数组件上使用 `ref` 属性**，因为它们没有实例。

# 四、Refs 转发

Ref 转发是一项将 ref 自动地通过组件传递到其一子组件的技巧。

```jsx
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className='FancyButton'>
    {props.children}
  </button>
));

// -- 你可以直接获取 DOM button 的 ref：
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;
```

这样，使用 `FancyButton` 的组件可以获取底层 DOM 节点 `button` 的 ref ，并在必要时访问，就像其直接使用 DOM `button` 一样。

以下是对上述示例发生情况的逐步解释：

1）我们通过调用 `React.createRef` 创建了一个 [React ref](https://zh-hans.reactjs.org/docs/refs-and-the-dom.html) 并将其赋值给 `ref` 变量。

2）我们通过指定 `ref` 为 JSX 属性，将其向下传递给 `<FancyButton ref={ref}>`。

3）React 传递 `ref` 给 `forwardRef` 内函数 `(props, ref) => ...`，作为其第二个参数。

4）我们向下转发该 `ref` 参数到 `<button ref={ref}>`，将其指定为 JSX 属性。

5）当 ref 挂载完成，`ref.current` 将指向 `<button>` DOM 节点。

> 注意：
>
> - 第二个参数 `ref` 只在使用 `React.forwardRef` 定义组件时存在。常规函数和 class 组件不接收 `ref` 参数，且 props 中也不存在 `ref`。
> - Ref 转发不仅限于 DOM 组件，你也可以转发 refs 到 class 组件实例中。