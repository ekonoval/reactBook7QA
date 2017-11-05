'use strict';
import React from 'react';
import ReactDOM from 'react-dom';

import Logo from './components/Logo';
import Button from './components/Button';
import SuggestRef from './components/SuggestRef';
import Suggest from './components/Suggest';

ReactDOM.render(
  <div style={{padding: '20px'}}>
    <h1>Component discoverer</h1>

    <h2>Logo</h2>
    <div style={{display: 'inline-block', background: 'purple'}}>
      <Logo/>
    </div>

    <h2>Buttons</h2>
    <div>
      Button with onClick:
      <Button onClick={() => alert('ouch')}>Click me</Button>
    </div>
    <div>
      A link:
      <Button href="http://reactjs.com">Follow me</Button>
    </div>
    <div>
      Custom class name:
      <Button className="custom">I do nothing</Button>
    </div>

    <h2>SuggestRef</h2>
    <SuggestRef id="customSuggestRefId" options={['eenie', 'meenie', 'miney', 'mo']}/>

    <h2>Suggest With State</h2>
    <Suggest id="suggestStateful" options={['eenie', 'meenie', 'miney', 'mo']}/>

{/*
    <h2>Rating</h2>
    <div>No initial value: <Rating /></div>
    <div>Initial value 4: <Rating defaultValue={4} /></div>
    <div>This one goes to 11: <Rating max={11} /></div>
    <div>Read-only: <Rating readonly={true} defaultValue={3} /></div>
*/}

    {/* more components go here... */}
  </div>,
  document.getElementById('pad')
);