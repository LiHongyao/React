# 一、概述

Refs 提供了一种方式，允许我们访问 DOM 节点或在 `render` 方法中创建的 React 元素。

在典型的 React 数据流中，[props](https://zh-hans.reactjs.org/docs/components-and-props.html) 是父组件与子组件交互的唯一方式。要修改一个子组件，你需要使用新的 props 来重新渲染它。但是，在某些情况下，你需要在典型数据流之外强制修改子组件。被修改的子组件可能是一个 React 组件的实例，也可能是一个 DOM 元素。对于这两种情况，React 都提供了解决办法。

# 二、何时使用 Refs？

下面是几个适合使用 refs 的情况：

- 管理焦点，文本选择或媒体播放。
- 触发强制动画。
- 集成第三方 DOM 库。

避免使用 refs 来做任何可以通过声明式实现来完成的事情。

举个例子，避免在 `Dialog` 组件里暴露 `open()` 和 `close()` 方法，最好传递 `isOpen` 属性。

# 三、代码示例

Refs 是使用 `React.createRef()` 创建的，并通过 `ref` 属性附加到 React 元素。在构造组件时，通常将 Refs 分配给实例属性，以便可以在整个组件中引用它们。当 ref 被传递给 `render` 中的元素时，对该节点的引用可以在 ref 的 `current` 属性中被访问。

```tsx
import React, { RefObject } from 'react';

interface IProps {}
interface IState {}
class RefsExample extends React.Component<IProps, IState> {
  inputRef: RefObject<HTMLInputElement>;

  constructor(props: IProps) {
    super(props);
    // -- 创建refs
    this.inputRef = React.createRef();
  }

  onTap = () => {
    // -- 访问refs
    const input = this.inputRef.current;
    console.log(input?.value);
  };

  render(): React.ReactNode {
    return (
      <>
        {/* 分发refs */}
        <input ref={this.inputRef} />
        <button onClick={this.onTap}>SEND MSG</button>
      </>
    );
  }
}

export default RefsExample;
```

Refs 的值根据节点的类型而有所不同：

- 当 `ref` 属性用于 HTML 元素时，构造函数中使用 `React.createRef()` 创建的 `ref` 接收底层 DOM 元素作为其 `current` 属性。
- 当 `ref` 属性用于自定义 class 组件时，`ref` 对象接收组件的挂载实例作为其 `current` 属性。
- **你不能在函数组件上使用 `ref` 属性**，因为他们没有实例。

## 为 DOM 元素添加 refs

```tsx
import React, { RefObject } from 'react';
interface IProps {}
interface IState {}

class CustomTextInput extends React.Component<IProps, IState> {
  textInput: RefObject<HTMLInputElement>;

  constructor(props: IProps) {
    super(props);
    this.textInput = React.createRef();
  }
  focusTextInput = () => {
    this.textInput.current?.focus();
  };
  render(): React.ReactNode {
    return (
      <>
        <input type='text' ref={this.textInput} />
        <input
          type='button'
          value='Focus the text input'
          onClick={this.focusTextInput}
        />
      </>
    );
  }
}
export default CustomTextInput;
```

React 会在组件挂载时给 `current` 属性传入 DOM 元素，并在组件卸载时传入 `null` 值。`ref` 会在 `componentDidMount` 或 `componentDidUpdate` 生命周期钩子触发前更新。

## 为 Class 组件添加 Refs

如果我们想包装上面的 `CustomTextInput`，来模拟它挂载之后立即被点击的操作，我们可以使用 ref 来获取这个自定义的 input 组件并手动调用它的 `focusTextInput` 方法：

```tsx
class AutoFocusTextInput extends React.Component<IProps, IState> {
  textInput: RefObject<CustomTextInput>;
  constructor(props: IProps) {
    super(props);
    this.textInput = React.createRef();
  }
  componentDidMount() {
    this.textInput.current?.focusTextInput();
  }

  render() {
    return <CustomTextInput ref={this.textInput} />;
  }
}
```

> 请注意，这仅在 `CustomTextInput` 声明为 class 时才有效：

## Refs 与函数组件

默认情况下，**你不能在函数组件上使用 `ref` 属性**，因为它们没有实例。

如果要在函数组件中使用 `ref`，你可以使用 [`forwardRef`](https://zh-hans.reactjs.org/docs/forwarding-refs.html)（可与 [`useImperativeHandle`](https://zh-hans.reactjs.org/docs/hooks-reference.html#useimperativehandle) 结合使用），或者可以将该组件转化为 class 组件。

```tsx
import React, { useRef } from 'react';

interface IProps {}
const CustomTextInput: React.FC<IProps> = (props) => {
  // -- refs
  const textInput = useRef<HTMLInputElement>(null);
  // -- methods
  const onTap = () => {
    textInput.current?.focus();
  };

  return (
    <>
      <input type='text' ref={textInput} />
      <input type='button' value='Focus the text input' onClick={onTap} />
    </>
  );
};

export default CustomTextInput;
```

# 四、Refs 转发

Ref 转发是一项将 ref 自动地通过组件传递到其一子组件的技巧。对于大多数应用中的组件来说，这通常不是必需的。但其对某些组件，尤其是可重用的组件库是很有用的。最常见的案例如下所述。

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