import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Link,
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const Layouts = () => (
  <div className='layouts'>
    <ul>
      <li>
        <Link to={'/'}>Index</Link>
      </li>
      <li>
        <Link to={'/about'}>About</Link>
      </li>
      <li>
        <Link to={'/infos/123'}>Infos</Link>
      </li>
      <li>
        <Link to={'/error'}>Error</Link>
      </li>
    </ul>
    <Outlet />
  </div>
);
const ErrorPage = () => (
  <div id='error-page' style={{ textAlign: 'center', paddingTop: 100 }}>
    <h1>Oops!</h1>
    <p>Sorry, an unexpected error has occurred.</p>
  </div>
);
const Index = () => <div>This is 「Index」 Page.</div>;
const About = () => <div>This is 「About」 Page.</div>;
const Infos = () => <div>This is 「Infos」 Page.</div>;

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layouts />} errorElement={<ErrorPage />}>
      <Route index element={<Index />} />
      <Route path='/about' element={<About />} />
      <Route path='/infos/:id' element={<Infos />} />
    </Route>
  )
);

root.render(
  <React.StrictMode>
    <React.Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </React.Suspense>
  </React.StrictMode>
);
