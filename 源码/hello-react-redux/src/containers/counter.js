// => ./src/containers/counter.js
// => 导入connect容器组件生成方法
import { connect } from 'react-redux';
// => 导入actions
import { inCrease, deCrease} from '../store/actions';
// => 导入展示组件
import Counter from '../components/counter'

// => 定义state & disptach 的映射，也就是所谓的容器组件。
const mapStateToProps = state => ({
    message: state.message,
    number: state.number
});
const mapDispatchToProps = dispatch => ({
    inCrease: (n) => dispatch(inCrease(n)),
    deCrease: (n) => dispatch(deCrease(n))
});

// => 生成并导出容器组件
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Counter);


