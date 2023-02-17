import React from 'react';

interface IProps {
  defaultCount: number;
}
interface IState {
  count: number;
}
class LifeCircles extends React.Component<IProps, IState> {
  // ---- 事件方法

  onIncrease() {
    this.setState((state, props) => ({
      count: state.count + 1,
    }));
  }
  onReduce() {
    this.setState((state, props) => ({
      count: state.count - 1,
    }));
  }

  /**
   * 构造函数
   * 只做两件事，除此之外无需实现构造函数
   * - 初始化 State
   * - 绑定事件
   */
  constructor(props: IProps) {
    super(props);
    // -- 初始化state
    this.state = { count: props.defaultCount };
    // -- 绑定事件
    this.onIncrease = this.onIncrease.bind(this);
    this.onReduce = this.onReduce.bind(this);

    console.log('__constructor__');
  }

  /**
   * 当 state 需要从 props 初始化时使用，返回对象来更新状态
   */
  static getDerivedStateFromProps(props: IProps, state: IState) {
    console.log('__getDerivedStateFromProps__');
    return null;
  }

  /**
   * 组件挂载
   * 如果在控制台输出两次，只需要在 index.tsx 中禁用严格模式即可，即删除 <React.StrictMode />
   */
  componentDidMount(): void {
    console.log('__componentDidMount__');
  }
  /**
   * 是否允许组件更新，此方法仅作为 **性能优化** 存在（不常用）
   * - false：不会触发更新
   * - true：调用render函数，触发更新
   */
  shouldComponentUpdate(
    nextProps: Readonly<IProps>,
    nextState: Readonly<IState>,
    nextContext: any
  ): boolean {
    console.log('__shouldComponentUpdate__');
    return true;
  }

  /**
   * 在最近一次渲染输出（提交到 DOM 节点）之前调用。它使得组件能在发生更改之前从 DOM 中捕获一些信息（例如，滚动位置）
   * 此生命周期方法的任何返回值将作为参数传递给 componentDidUpdate()。
   * 此用法并不常见，但它可能出现在 UI 处理中，如需要以特殊方式处理滚动位置的聊天线程等。
   */
  getSnapshotBeforeUpdate(
    prevProps: Readonly<IProps>,
    prevState: Readonly<IState>
  ) {
    console.log('__getSnapshotBeforeUpdate__');
    return null;
  }

  /**
   * 已更新
   */
  componentDidUpdate(
    prevProps: Readonly<IProps>,
    prevState: Readonly<IState>,
    snapshot?: any
  ): void {
    console.log('__componentDidUpdate__');
  }

  /**
   * 当组件从 DOM 中移除时会调用如下方法
   * 使用场景：资源释放（清除定时器/取消网络请求/移除订阅等）（常用）
   */
  componentWillUnmount(): void {
    console.log('__componentWillUnmount__');
  }

  /**
   * 渲染函数（纯函数）
   * 该方法是组件中唯一必须实现的方法
   * 注意：如果 shouldComponentUpdate() 返回 false，则不会调用 render()。
   */
  render(): React.ReactNode {
    console.log('__render__');
    return (
      <div>
        <p>CURRENT COUNT：{this.state.count}</p>
        <button type='button' onClick={this.onIncrease}>
          INCREASE
        </button>
        &nbsp;
        <button type='button' onClick={this.onReduce}>
          REDUCE
        </button>
      </div>
    );
  }
}

export default LifeCircles;
