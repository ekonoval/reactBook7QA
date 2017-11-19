'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Logo from './components/Logo';
import ExcelOld from './components/ExcelOld';

var headers = localStorage.getItem('headers');
var data = localStorage.getItem('data');

if (!headers) {
  headers = ['Title', 'Year', 'Rating', 'Comments'];
  data = [['Test', '2015', '3', 'meh']];
}

// var headers = ['Title', 'Year', 'Rating', 'Comments'];
// var initialData = [['Test', '2015', '3', 'meh']];

ReactDOM.render(
  <div>
    <h1>
      <Logo /> Welcome to The App!
      <ExcelOld headers={headers} initialData={data} />
    </h1>
  </div>,
  document.getElementById('pad')
);