
import React  from 'react';
import ReactDOM from 'react-dom';
import {
  browserHistory,
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import App from './App'
import Home from './pages/home'
import News from './pages/news'
import Course from './pages/course'
import About from './pages/about'
import Details from './pages/details'

ReactDOM.render(
  (<Router history={browserHistory}>
    <App>
        <Route exact path="/" component={Home} />
        <Route path="/news" component={News} />
        <Route path="/course" component={Course} />
        <Route path="/about" component={About} />
        <Route path="/details" component={Details} />
    </App>
  </Router>),
  document.getElementById('root')
)


