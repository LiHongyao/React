import React, { useReducer } from 'react';
// 定义初始化状态
const initialState = {
    isLogin: false
};
const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case "CHANGE_LOGIN_STATE": 
            return { isLogin: action.isLogin }
        default: 
            return state;
    }
}
export const LoginPage = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    console.log(state.isLogin);
    return (<div className="page login">
        <form name="myForm">
            <input placeholder="账号"></input>
            <br/>
            <input placeholder="密码"></input>
        </form>
        <p>当前登陆状态：{state.isLogin.toString()}</p>
        <button type="button" onClick={() => dispatch({type: "CHANGE_LOGIN_STATE", isLogin: true})}>登陆</button>
        <button type="button" onClick={() => dispatch({type: "CHANGE_LOGIN_STATE", isLogin: false})}>注销</button>
    </div>)
}   