// => 导入store
const { store } = require("./store");
// => 导入actions
const {
    CHANGE_NAME,
    CHANGE_PICTURE,
    SHOW_DIALOG,
    CLOSE_DIALOG
} = require("./store/actions");

// 打印初始状态
console.log("初始化状态：",store.getState());

// 注册监听，打印日志 => 注意 subscribe() 返回一个函数用来注销监听器
const unsubscribe = store.subscribe(() => console.log("数据已更新：", store.getState()))

// 发起一系列 action
store.dispatch(CHANGE_NAME("lihy"));
store.dispatch(CHANGE_PICTURE("b.jpg"));
store.dispatch(SHOW_DIALOG());
store.dispatch(CLOSE_DIALOG());


// 停止监听 state 更新
unsubscribe();