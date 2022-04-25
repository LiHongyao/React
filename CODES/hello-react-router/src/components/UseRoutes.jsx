/*
 * @Author: Lee
 * @Date: 2022-04-25 13:49:07
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-25 14:24:29
 */
import { Link, Outlet, useRoutes } from 'react-router-dom';

export default function App() {
  // -- 定义路由
  const routes = [
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: '/about', element: <About /> },
        { path: '/news', element: <News /> },
        { path: '/*', element: <NoMatch /> },
      ],
    },
  ];
  // -- 生成路由元素
  const element = useRoutes(routes);

  return (
    <div>
      <h1>Welcome to React Router!</h1>
      {/* 生成路由 */}
      {element}
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
