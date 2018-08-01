https://doc.react-china.org/docs/lists-and-keys.html

# # 列表渲染

你可以通过使用{}在JSX内构建一个元素集合。

```react
import React from 'react';
import ReactDOM from 'react-dom';

class NumberList extends React.Component {
    render() {
        // 通过map方法遍历结合创建节点
        let listItems = this.props.numbers.map(num =>
            // 绑定key                                   
            <li key={num.toString()}>
                {num}
            </li>
        );
        return (
            <ul>{listItems}</ul>
        )
    }
}

ReactDOM.render(
    <NumberList numbers={[1, 2, 3, 4]}/>,
    document.getElementById('root')
)
```

# # Keys

Keys可以在DOM中的某些元素被增加或删除的时候帮助React识别哪些元素发生了变化。因此你应当给数组中的每一个元素赋予一个确定的标识。 

```react
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li key={number.toString()}>
    {number}
  </li>
);
```

一个元素的key最好是这个元素在列表中拥有的一个独一无二的字符串。通常，我们使用来自数据的id作为元素的key：

```react
const todoItems = todos.map((todo) =>
  <li key={todo.id}>
    {todo.text}
  </li>
);
```

当元素没有确定的id时，你可以使用他的序列号索引index作为key

```react
const todoItems = todos.map((todo, index) =>
  // Only do this if items have no stable IDs
  <li key={index}>
    {todo.text}
  </li>
);
```

## 1. 用keys提取组件

元素的key只有在它和它的兄弟节点对比时才有意义。

比方说，如果你提取出一个`ListItem`组件，你应该把key保存在数组中的这个`<ListItem />`元素上，而不是放在`ListItem`组件中的`<li>`元素上。

**\> key 的错误使用方式**

```react
function ListItem(props) {
    const value = props.value;
    return (
        // 错啦！你不需要在这里指定key:
        <li key={value.toString()}>
            {value}
        </li>
    );
}

function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) =>
        // 错啦！元素的key应该在这里指定：
        <ListItem value={number} />
    );
    return (
        <ul>
       		 {listItems}
        </ul>
    );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
    <NumberList numbers={numbers} />,
    document.getElementById('root')
);
```

**\> key 的正确使用方式**

```react
function ListItem(props) {
    // 对啦！这里不需要指定key:
    return <li>{props.value}</li>;
}

function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) =>
        // 又对啦！key应该在数组的上下文中被指定
        <ListItem key={number.toString()} value={number} />
    );
    return (
        <ul>
            {listItems}
        </ul>
    );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
    <NumberList numbers={numbers} />,
    document.getElementById('root')
);
```

当你在`map()`方法的内部调用元素时，你最好随时记得为每一个元素加上一个独一无二的`key`。

## 2. 元素的key在他的兄弟元素之间应该唯一

数组元素中使用的key在其兄弟之间应该是独一无二的。然而，它们不需要是全局唯一的。当我们生成两个不同的数组时，我们可以使用相同的键。

```react
function Blog(props) {
    const sidebar = (
        <ul>
            {props.posts.map((post) =>
                <li key={post.id}> {post.title}</li>
            )}
        </ul>
    );
    const content = props.posts.map((post) =>
        <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
        </div>
    );
    return (
        <div>
            {sidebar}
            <hr />
            {content}
        </div>
    );
}

const posts = [
    {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
    {id: 2, title: 'Installation', content: 'You can install React from npm.'}
];
ReactDOM.render(
    <Blog posts={posts} />,
    document.getElementById('root')
);
```

key会作为给React的提示，但不会传递给你的组件。如果您的组件中需要使用和`key`相同的值，请将其作为属性传递：

```react
const content = posts.map((post) =>
  <Post
    key={post.id}
    id={post.id}
    title={post.title} />
);
```

上面例子中，`Post `组件可以读出`props.id`，但是不能读出`props.key`

## 3. 在jsx中嵌入map()

在上面的例子中，我们声明了一个单独的`listItems`变量并将其包含在JSX中

```react
function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) =>
      <ListItem key={number.toString()} value={number} />
    );
    return (
      <ul>
        {listItems}
      </ul>
    );
}
```

JSX允许在大括号中[嵌入任何表达式](https://doc.react-china.org/docs/introduction-jsx.html%EF%BC%83JSX%E5%B5%8C%E5%A5%97)，所以我们可以在`map()`中这样使用：

```react
function NumberList(props) {
    const numbers = props.numbers;
    return (
      <ul>
        {numbers.map((number) =>
          <ListItem key={number.toString()} value={number} />)}
      </ul>
    );
}
```

这么做有时可以使你的代码更清晰，但有时这种风格也会被滥用。就像在JavaScript中一样，何时需要为了可读性提取出一个变量，这完全取决于你。但请记住，如果一个`map()`嵌套了太多层级，那可能就是你[提取出组件](https://doc.react-china.org/docs/components-and-props.html#%E6%8F%90%E5%8F%96%E7%BB%84%E4%BB%B6)的一个好时机。

























