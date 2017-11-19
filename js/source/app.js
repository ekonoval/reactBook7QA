'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Logo from './components/Logo';
import ExcelOld from './components/ExcelOld';

import Excel from './complexComponents/Excel';
import schema from './schema';

// var headers = localStorage.getItem('headers');
// var data = localStorage.getItem('data');
//
// if (!headers) {
//   headers = ['Title', 'Year', 'Rating', 'Comments'];
//   data = [['Test', '2015', '3', 'meh']];
// }

let data = {};
schema.forEach((item) => data[item.id] = item.sample);
data = [data];

ReactDOM.render(
  <div>
    <h1>
      <Logo /> Welcome to The App!
      {/*<ExcelOld headers={headers} initialData={data} />*/}

      <Excel
        schema={schema}
        initialData={data}
      />

    </h1>
  </div>,
  document.getElementById('pad')
);