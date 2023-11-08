// 👉 封装一个获取DOM元素的函数
const $ = (sel) => document.querySelector(sel);

// 👉 Actions creators
const increment = () => ({ type: 'counter/increment' });
const decrement = () => ({ type: 'counter/decrement' });
const incrementByAmount = (amount) => ({
  type: 'counter/incrementByAmount',
  payload: amount,
});
const toggleStatus = () => ({ type: 'status/toggleStatus' });

// 👉 Reduers
const counterReducer = (state = { count: 6 }, action) => {
  switch (action.type) {
    case 'counter/increment':
      return { ...state, count: state.count + 1 };
    case 'counter/decrement':
      return { ...state, count: state.count - 1 };
    case 'counter/incrementByAmount':
      return { ...state, count: state.count + action.payload };
    default:
      return state;
  }
};
const statusReducer = (state = { loading: false }, action) => {
  switch (action.type) {
    case 'status/toggleStatus':
      return { ...state, loading: !state.loading };
    default:
      return state;
  }
};

// 👉 Middlewares - 中间件
// -- 触发流程：dispatch → 中间件 → reducers
// -- 中间件使得我们可以在Redux中进行副作用操作
// -- 通常你不必单独为某一个功能构建中间件，而是创建一个统一的异步中间件来处理项目中的异步操作
// -- 使用时你需要先申请中间件增强器，然后在创建store的时候传入，如下所示：
// -- 1. const middlewareEnhancer = Redux.applyMiddleware(xxxMiddleware)
// -- 2. const store = Redux.createStore(reducer, middlewareEnhancer)
const asyncFunctionMiddleware = (storeApi) => (next) => (action) => {
  if (typeof action === 'function') {
    // → 如果传入的action是一个函数
    // → 调用该函数并传入 dispatch 和 getState 作为参数
    return action(storeApi.dispatch, storeApi.getState);
  } else {
    // → 否则，它就是一个普通 action，那就继续执行
    return next(action);
  }
};

// 👉 Create store
// → 注册中间件
const middlewareEnhancer = Redux.applyMiddleware(asyncFunctionMiddleware);
// → 合并reducers
const reducer = Redux.combineReducers({
  counter: counterReducer,
  status: statusReducer,
});
const store = Redux.createStore(reducer, middlewareEnhancer);

// 👉 Selectors
const useSelector = (fn) => {
  return fn(store.getState());
};

//  👉 CHUNKs - 异步函数
const incrementAsync = (amount) => async (dispatch, getState) => {
  const isLoading = getState().status.loading;
  if (isLoading) {
    return console.log('当前正在执行异步操作，请稍后再试...');
  }
  dispatch(toggleStatus());
  await new Promise((resolve) => {
    console.log('Loading...');
    setTimeout(() => {
      resolve();
    }, 1000);
  });
  dispatch(toggleStatus());
  dispatch(incrementByAmount(amount));
  console.log('Completed!');
};

// 👉 Render functions
const render = () => {
  const count = useSelector((state) => state.counter.count);
  $('#value').textContent = count;
};
// → 订阅Store更新
store.subscribe(render);

// 👉 Events - Dispatchs
$('#increment').onclick = () => store.dispatch(increment());
$('#decrement').onclick = () => store.dispatch(decrement());
$('#addAmount').onclick = () => {
  const value = $('#textbox').value;
  store.dispatch(incrementByAmount(Number(value) || 0));
};
$('#asyncButton').onclick = () => {
  const value = $('#textbox').value;
  store.dispatch(incrementAsync(Number(value) || 0));
};

// 👉 Enter Actions...
$('#textbox').value = 2;
render();
