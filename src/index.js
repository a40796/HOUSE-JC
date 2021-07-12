import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import './styles/app.css'

let root =document.getElementById('root')
ReactDOM.render(
    <BrowserRouter>
      <App/>
   </BrowserRouter>,
    root
);


