/*
 * @Author: Lee
 * @Date: 2022-04-25 14:06:44
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-25 14:38:41
 */
import {
  Route,
  Routes,
  useSearchParams,
  useNavigate,
  useParams,
  useLocation,
} from 'react-router-dom';
export default function App() {
  return (
    <div>
      <h1>Search Params Example</h1>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/details' element={<Details />} />
      </Routes>
    </div>
  );
}

// -- 页面组件
const Home = () => {
  const navigate = useNavigate();
  const onButtonTap = () => {
    // -- 跳转时传递query参数
    navigate('/details', {
      state: { name: 'Li-HONGYAO', job: '前端工程师' },
    });
  };
  return (
    <>
      <div>This is the Home page.</div>
      <button type='button' onClick={onButtonTap}>
        GO Details
      </button>
    </>
  );
};

const Details = () => {
  // -- 获取query参数

  const navigate = useNavigate();
  const onButtonTap = () => {
    navigate(-1);
  };
  return (
    <>
      <div>This is the Details page.</div>
      <button type='button' onClick={onButtonTap}>
        GO Back
      </button>
    </>
  );
};
