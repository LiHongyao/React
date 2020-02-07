import React, { useState } from 'react';
// components
import { Child } from './components/child/child';
import { List } from './components/list/list';
import { LoginPage } from './components/useReducerHook/useReducerHook';
// router
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
// pages 
import { Home } from './pages/home/home';
import { Search } from './pages/search/search';
import { ShoppingCart } from './pages/shopping-cart/shopping-car';
import { Mine } from './pages/mine/mine';

import C from './components/hoc/hoc';

import Context from './context'
const isLogin = false;



function App() {
  const [data, setData] = useState("");
  const reciveData = (data) => {
    setData(data);
  }
  return (
    <Context.Provider value={{
      num: 10,
      add: function() {
          this.num++;
      }
  }}>
      <Router>
        <div className="App">
          <header className="App-header">
            <ul className="list">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/search">Search</Link></li>
              <li><Link to="/shopping-cart">ShoppingCart</Link></li>
              <li><Link to="/mine">Mine</Link></li>
            </ul>
          </header>
          <main>
            <Switch>
              {/* 判断是否登陆 */}
              <Route path="/" render={() => (
                !isLogin ? (<Redirect to="/login-page" />) : (<Home />)
              )} exact />
              <Route path="/search" component={Search} />
              <Route path="/shopping-cart" component={ShoppingCart} />
              <Route path="/mine" component={Mine} />
              <Route path="/login-page" component={LoginPage}></Route>
            </Switch>
            <hr />
            <p>{data}</p>
            <Child message="我是从父组件传递过来的数据!" number={100} reciveData={reciveData} />
            <List>
              <p>姜子牙</p>
              <p>哪吒</p>
            </List>

            <C />
          </main>
        </div>
      </Router>
      </Context.Provider> 
  );
}
export default App;
