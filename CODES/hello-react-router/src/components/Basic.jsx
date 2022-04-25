import { Routes, Route, Link, Outlet } from 'react-router-dom';

export default function App() {
  return (
    <div>
      <h1>Welcome to React Router!</h1>
      {/* 生成路由 */}
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='about' element={<About />} index />
          <Route path='news' element={<News />} />
          <Route path='*' element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

// -- 页面组件
const Home = () => <div>This is the Home page.</div>;
const About = () => <div>This is the About page.</div>;
const News = () => <div>This is the News page.</div>;
const NoMatch = () => <div>404 Not Found</div>;

// -- 布局
const Layout = () => (
  <>
    {/* 导航 */}
    <nav>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
        <li>
          <Link to='/news'>News</Link>
        </li>
      </ul>
    </nav>
    {/* 路由视图，类似于vue中的 router-view */}
    <Outlet />
  </>
);
