// libraries
import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

// components
import App from './components/App';

// styles
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';

ReactDom.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
