# # 概念

## 1. 数据流向

数据的改变发生通常是通过用户交互行为或者浏览器行为（如路由跳转等）触发的，当此类行为会改变数据的时候可以通过 `dispatch` 发起一个 action，如果是同步行为会直接通过 `Reducers` 改变 `State` ，如果是异步行为（副作用）会先触发 `Effects` 然后流向 `Reducers` 最终改变 `State`。

![](./IMGS/dva_data_reflow.png)

## 2. Models

```js
// dva模型
import { Effect, Reducer, Subscription } from 'umi';
export interface GoodsState {
  list: []
}
export interface GoodsModelType {
  namespace: 'goods';
  state: GoodsState;
  effects: {
    fetch: Effect;
  };
  reducers: {
    updateList: Reducer<GoodsState>
  };
  subscriptions: {
    setup: Subscription
  };
}
  
const GoodsModel: GoodsModelType = {
	namespace: '',
	state: {
		list: []
	},
	effects: {
		*fetch({ type, payload}, { put, call, select }) {
			const data = yield Api.goods.list();
			yield put({
				type: 'add',
				payload: data
			})
		}
	},
  reducers: {
    *updateList({ state = GoodsModel.state, { payload }}) {
      return {
        ...state,
        list: payload
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/goods') {
          setTimeout(() => {
            dispatch({
              type: 'fetch'
            })
          }, 500);
        }
      })
    }
  }
}
export default GoodsModel;
```



### 2.1. State

`type State = any`

数据状态，操作时当成不可变数据对待，保持每次操作之后的数据都是全新的，没有引用关系。

### 2.2. Action

`type AsyncAction = any`

普通JavaScript对象，唯一改变state的方式，Action格式如下：

```javascript
{
	type: 'ADD',
  ...
}
```

### 2.3. Dispatch

`type dispatch = (a: Action) => Action`

触发action函数，connect Model的组件可以通过 props 获取到dispatch，进而调用model中的reducer后者effects。常见形式如下：

```js
dispatch({
  type: 'user/add', // 如果在 model 外调用，需要添加 namespace
  payload: {}, // 需要传递的信息
});
```

### 2.4. Reducer

`type Reducer<S, A> = (state: S, action: A) => S`

Reducer 函数接收原状态及action，根据action中的type类型作相应的数据处理并返回新的state。

> 提示：reducer为纯函数，切勿执行副作用操作。

### 2.5. Effect

effects 执行副作用，最常见的就是异步操作（ajax）。dva 为了控制副作用的操作，底层引入了[redux-sagas](http://superraytin.github.io/redux-saga-in-chinese)做异步流程控制，由于采用了[generator的相关概念](http://www.ruanyifeng.com/blog/2015/04/generator.html)，所以将异步转成同步写法，从而将effects转为纯函数。

### 2.6. Subscription

Subscription 语义是订阅，用于订阅一个数据源，然后根据条件 dispatch 需要的 action。数据源可以是当前的时间、服务器的 websocket 连接、keyboard 输入、geolocation 变化、history 路由变化等等。







