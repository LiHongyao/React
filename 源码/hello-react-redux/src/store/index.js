// => ./src/store/index.js

// 引入redux提供的createStore方法来创建仓库
import { createStore } from 'redux';
// 引入所有用到的reducer
import reducers from './reducers';
// 生成store
const store = createStore(reducers);
// 导出store
export default store;
