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

// like [{"name":"$2 chuck","year":2015,"grape":"Merlot","rating":3,"comments":"Nice for the price"}, ...]
let data = {};
schema.forEach((item) => data[item.id] = item.sample);
data = [data, JSON.parse(JSON.stringify(data))];

data[1]['year'] = 1999;
data[1]['name'] = "cloned";

// console.log(schema);console.log(data);

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