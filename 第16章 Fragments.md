# 一、概述

React Component 中，render 函数只能返回一个根元素，这样可能无法满足一些特殊的需求，比如定义组件 ListItems 显示列表项，在父组件的 < ul > 标签对内来调用ListItems组件，此时我们需要返回的就是n个 li 标签。不能再多个 li 标签上一级加一个容器标签表过，这样你的结构可能是 ul > div > li 这样的，这并不符合我们的需求设计，不过不用担心，React.Fragment 允许我们在一个组件中同时返回多个子元素。

# 二、示例

```react
render() {
    return (
        <React.Fragment>
            <li>A</li>
            <li>B</li>
            <li>C</li>
        </React.Fragment>
    )
}
```

