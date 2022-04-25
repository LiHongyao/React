/*
 * @Author: Lee
 * @Date: 2022-04-25 13:49:07
 * @LastEditors: Lee
 * @LastEditTime: 2022-04-25 14:17:20
 */
import { Link, Outlet, useRoutes } from 'react-router-dom';

export default function App() {
  // -- 定义路由
  const routes = [
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <Java /> },
        {
          path: '/web',
          element: <Web />,
          children: [
            { index: true, element: <HTML /> },
            { path: '/web/css', element: <CSS /> },
            { path: '/web/js', element: <JavaScript /> },
          ],
        },
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
const Java = () => <div>This is the Java page.</div>;
const Web = () => (
  <div>
    <div>Please choose a web course:</div>
    {/* 子路由导航 */}
    <nav>
      <ul>
        <li>
          <Link to=''>HTML</Link>
        </li>
        <li>
          <Link to='css'>CSS</Link>
        </li>
        <li>
          <Link to='js'>JavaScript</Link>
        </li>
      </ul>
    </nav>
    {/* 渲染子路由 */}
    <Outlet />
  </div>
);
const HTML = () => <div>This is the HTML page.</div>;
const CSS = () => <div>This is the CSS page.</div>;
const JavaScript = () => <div>This is the JavaScript page.</div>;
const NoMatch = () => <div>404 Not Found</div>;

// -- 布局
const Layout = () => (
  <>
    {/* 导航 */}
    <nav>
      <ul>
        <li>
          <Link to='/'>Java</Link>
        </li>
        <li>
          <Link to='/web'>Web</Link>
        </li>
      </ul>
    </nav>
    {/* 路由视图，类似于vue中的 router-view */}
    <Outlet />
  </>
);
