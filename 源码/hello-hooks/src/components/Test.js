import React, { useState, useEffect, useContext } from 'react'
import AppContext from '../context';

const Test = () => {
    // => define states
    const [name, setName] = useState("保密");
    const [email, setEmail] = useState("保密");
    const [age, setAge] = useState(0);
    // => effect
    /*
    componentDidMount() {
        // 1. 修改标题
        // 2. 前后端交互
        // 3. 设置订阅/处理一些其他的业务逻辑
    }*/
    useEffect(() => {
        // 修改标题
        document.title = 'Hello-Hooks';
    }, []);
    useEffect(() => {
        // 请求ajax数据
    }, []);
    useEffect(() => { // mount/update/unmount
        console.log(name);
    }, [name]);
    useEffect(() => {
        console.log(age);
    }, [age]);
    // => context
    let { state, dispatch } = useContext(AppContext);
    let { message, count } = state;
    // => Events
    const handleInput = (event) => {
        event.persist();
        const { id, value } = event.target;
        switch (id) {
            // => update states
            case 'name': setName(value); break;
            case 'email': setEmail(value); break;
            case 'age': setAge(value); break;
            default: throw new Error()
        }
    }
    return (
        <React.Fragment>
            <input id='name' type='text' placeholder='姓名' onInput={handleInput} /><br />
            <input id='age' type='number' placeholder='年龄' onInput={handleInput} /><br />
            <input id='email' type='email' placeholder='邮箱' onInput={handleInput} /><br />
            <p>用户信息：{name} -  {age} - {email}</p>
            <p>AppContext：{message} - {count}</p>
        </React.Fragment>
    )
}
export default Test;