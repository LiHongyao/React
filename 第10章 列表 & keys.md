https://doc.react-china.org/docs/lists-and-keys.html

# 一、列表渲染

你可以通过使用 ` {}` 在JSX内构建一个元素集合。

```react
import React from 'react'
const List = (props) => {
    let Lis = props.items.map((item,index) => {
        return <li key={index}>{item}</li>
    })
    return (<ul>{Lis}</ul>)
}
export default List;
```

# 二、Keys

Keys可以在DOM中的某些元素被增加或删除的时候帮助React识别哪些元素发生了变化。因此你应当给数组中的每一个元素赋予一个确定的独一无二的标识。

- 元素的key只有在它和它的兄弟节点对比时才有意义，因此在 `map()` 方法中的元素（或者说重复渲染的元素）需要设置 key 属性。
- 元素的key在他的兄弟元素之间应该唯一。
- 在jsx中嵌入map()。























